import { formatCountdown } from "./format.js";
import { readJSON, writeJSON } from "./storage.js";

const STORAGE_KEY = "timor.timers";
const TICK_MS = 200;
const ALARM_TITLE_MS = 2500;

export interface TimerItem {
  id: number;
  label: string;
  durationMs: number;
  remainingMs: number;
  running: boolean;
  done: boolean;
  endAt: number;
}

export class TimerStore extends EventTarget {
  private timers: TimerItem[] = [];
  private nextId = 1;
  private interval: number | undefined;
  private audio: AudioContext | null = null;
  private alarmUntil = 0;
  private alarmTimer: number | undefined;

  constructor() {
    super();
    this.restore();
  }

  get list(): readonly TimerItem[] {
    return this.timers;
  }

  get titleSuffix(): string | undefined {
    if (Date.now() < this.alarmUntil) return "Time's up!";
    const running = this.timers.filter((t) => t.running);
    if (running.length === 0) return undefined;
    const nearest = Math.min(...running.map((t) => t.endAt - Date.now()));
    return formatCountdown(Math.max(0, nearest));
  }

  addTimer(ms: number, label: string): void {
    if (ms <= 0) return;
    this.ensureAudio();
    this.requestNotificationPermission();

    const timer: TimerItem = {
      id: this.nextId++,
      label: label || "Timer",
      durationMs: ms,
      remainingMs: ms,
      running: true,
      done: false,
      endAt: Date.now() + ms,
    };

    this.timers = [...this.timers, timer];
    this.persist();
    this.changed();
  }

  removeTimer(id: number): void {
    this.timers = this.timers.filter((t) => t.id !== id);
    this.persist();
    this.changed();
  }

  toggleTimer(id: number, running: boolean): void {
    const timer = this.timers.find((t) => t.id === id);
    if (!timer) return;

    if (running) {
      if (timer.done) {
        this.restartTimer(id);
        return;
      }
      this.ensureAudio();
      this.setTimer(id, {
        running: true,
        endAt: Date.now() + timer.remainingMs,
      });
    } else {
      this.setTimer(id, {
        running: false,
        remainingMs: Math.max(0, timer.endAt - Date.now()),
      });
    }
    this.changed();
  }

  restartTimer(id: number): void {
    const timer = this.timers.find((t) => t.id === id);
    if (!timer) return;
    this.ensureAudio();
    this.setTimer(id, {
      running: true,
      done: false,
      remainingMs: timer.durationMs,
      endAt: Date.now() + timer.durationMs,
    });
    this.changed();
  }

  addMinute(id: number): void {
    const timer = this.timers.find((t) => t.id === id);
    if (!timer) return;
    const add = 60_000;
    const patch: Partial<TimerItem> = {
      durationMs: timer.durationMs + add,
      remainingMs: timer.remainingMs + add,
    };
    if (timer.done) {
      patch.done = false;
      patch.running = true;
      patch.endAt = Date.now() + add;
    } else if (timer.running) {
      patch.endAt = timer.endAt + add;
    }
    this.setTimer(id, patch);
    this.changed();
  }

  private setTimer(id: number, patch: Partial<TimerItem>): void {
    this.timers = this.timers.map((t) =>
      t.id === id ? { ...t, ...patch } : t,
    );
    this.persist();
  }

  private tick = (): void => {
    const now = Date.now();
    let changed = false;
    const finished: TimerItem[] = [];

    const next = this.timers.map((t) => {
      if (!t.running) return t;
      const remaining = t.endAt - now;
      if (remaining <= 0) {
        changed = true;
        finished.push(t);
        return { ...t, running: false, done: true, remainingMs: 0 };
      }
      if (Math.abs(remaining - t.remainingMs) >= 1) changed = true;
      return { ...t, remainingMs: remaining };
    });

    if (changed) {
      this.timers = next;
      if (finished.length > 0) this.persist();
    }

    if (finished.length > 0) this.onFinish(finished);

    this.changed();
  };

  private onFinish(finished: TimerItem[]): void {
    this.alarmUntil = Date.now() + ALARM_TITLE_MS;
    this.alarm();
    const nav = navigator as Navigator & {
      vibrate?: (pattern: number | number[]) => boolean;
    };
    nav.vibrate?.([200, 100, 200]);
    for (const t of finished) this.notify(t.label);

    if (this.alarmTimer !== undefined) window.clearTimeout(this.alarmTimer);
    this.alarmTimer = window.setTimeout(() => {
      this.alarmUntil = 0;
      this.alarmTimer = undefined;
      this.emit();
    }, ALARM_TITLE_MS);
  }

  private sync(): void {
    const anyRunning = this.timers.some((t) => t.running);
    if (anyRunning && this.interval === undefined) {
      this.interval = window.setInterval(this.tick, TICK_MS);
    } else if (!anyRunning && this.interval !== undefined) {
      window.clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  private changed(): void {
    this.sync();
    this.emit();
  }

  private persist(): void {
    writeJSON(STORAGE_KEY, this.timers);
  }

  private restore(): void {
    const parsed = readJSON<unknown>(STORAGE_KEY);
    if (!Array.isArray(parsed)) return;

    const now = Date.now();
    this.timers = parsed
      .filter((t) => t && typeof t === "object")
      .map((t) => {
        const durationMs = Number.isFinite(t.durationMs)
          ? Math.max(0, t.durationMs as number)
          : 0;
        const endAt = Number.isFinite(t.endAt) ? (t.endAt as number) : 0;
        let running = t.running === true;
        let done = t.done === true;
        let remainingMs = Number.isFinite(t.remainingMs)
          ? Math.max(0, t.remainingMs as number)
          : 0;

        if (running) {
          remainingMs = endAt - now;
          if (remainingMs <= 0) {
            running = false;
            done = true;
            remainingMs = 0;
          }
        } else if (done) {
          remainingMs = 0;
        }

        return {
          id: Number.isFinite(t.id) ? (t.id as number) : 0,
          label: typeof t.label === "string" ? t.label : "Timer",
          durationMs,
          remainingMs,
          running,
          done,
          endAt,
        };
      });

    this.nextId = this.timers.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    this.sync();
  }

  private ensureAudio(): void {
    if (!this.audio) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctor) this.audio = new Ctor();
    }
    void this.audio?.resume();
  }

  private alarm(): void {
    const ctx = this.audio;
    if (!ctx) return;
    void ctx.resume();

    const beep = (time: number, freq: number, dur: number): void => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.4, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
    };

    const t0 = ctx.currentTime + 0.05;
    for (let i = 0; i < 4; i++) {
      const t = t0 + i * 0.4;
      beep(t, 880, 0.3);
      beep(t, 1174.66, 0.3);
    }
  }

  private requestNotificationPermission(): void {
    if ("Notification" in window && Notification.permission === "default") {
      void Notification.requestPermission();
    }
  }

  private notify(label: string): void {
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("Timor", { body: `${label} finished.` });
      } catch {
        /* ignore notification failures */
      }
    }
  }

  private emit(): void {
    this.dispatchEvent(new Event("change"));
  }
}

export const timerStore = new TimerStore();
