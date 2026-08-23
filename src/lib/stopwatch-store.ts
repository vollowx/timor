import { readJSON, writeJSON } from "./storage.js";

const STORAGE_KEY = "timor.stopwatch";

export interface Lap {
  n: number;
  split: number;
  total: number;
}

interface PersistedStopwatch {
  running: boolean;
  baseMs: number;
  startedAt: number;
  laps: Lap[];
  lastLapTotal: number;
}

export class StopwatchStore extends EventTarget {
  private running = false;
  private elapsedMs = 0;
  private laps: Lap[] = [];
  private baseMs = 0;
  private runningSince = 0;
  private startedAt = 0;
  private lastLapTotal = 0;
  private raf = 0;

  constructor() {
    super();
    this.restore();
  }

  get isRunning(): boolean {
    return this.running;
  }

  get elapsed(): number {
    return this.elapsedMs;
  }

  get lapList(): readonly Lap[] {
    return this.laps;
  }

  toggle(): void {
    if (this.running) {
      this.baseMs = this.elapsedMs;
      this.running = false;
      this.stopRaf();
    } else {
      this.runningSince = performance.now();
      this.startedAt = Date.now();
      this.running = true;
      this.raf = requestAnimationFrame(this.tick);
    }
    this.persist();
    this.#dispatchEvent();
  }

  lap(): void {
    if (!this.running) return;
    const total = this.elapsedMs;
    const split = total - this.lastLapTotal;
    this.lastLapTotal = total;
    this.laps = [{ n: this.laps.length + 1, split, total }, ...this.laps];
    this.persist();
    this.#dispatchEvent();
  }

  reset(): void {
    this.running = false;
    this.stopRaf();
    this.baseMs = 0;
    this.startedAt = 0;
    this.lastLapTotal = 0;
    this.elapsedMs = 0;
    this.laps = [];
    this.persist();
    this.#dispatchEvent();
  }

  private tick = (): void => {
    if (!this.running) return;
    this.elapsedMs = this.baseMs + (performance.now() - this.runningSince);
    this.raf = requestAnimationFrame(this.tick);
    this.#dispatchEvent();
  };

  private stopRaf(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private persist(): void {
    const data: PersistedStopwatch = {
      running: this.running,
      baseMs: this.baseMs,
      startedAt: this.startedAt,
      laps: this.laps,
      lastLapTotal: this.lastLapTotal,
    };
    writeJSON(STORAGE_KEY, data);
  }

  private restore(): void {
    const data = readJSON<Partial<PersistedStopwatch>>(STORAGE_KEY);
    if (!data || typeof data !== "object") return;

    const laps = Array.isArray(data.laps)
      ? (data.laps as Lap[]).filter(
          (l) =>
            l &&
            Number.isFinite(l.n) &&
            Number.isFinite(l.split) &&
            Number.isFinite(l.total),
        )
      : [];
    this.laps = laps;
    this.lastLapTotal = Number.isFinite(data.lastLapTotal)
      ? (data.lastLapTotal as number)
      : laps.length > 0
        ? laps[0].total
        : 0;

    const baseMs = Number.isFinite(data.baseMs)
      ? Math.max(0, data.baseMs as number)
      : 0;

    if (data.running) {
      const now = Date.now();
      const startedAt = Number.isFinite(data.startedAt)
        ? (data.startedAt as number)
        : now;
      const elapsed = Math.max(0, baseMs + (now - startedAt));
      this.baseMs = elapsed;
      this.elapsedMs = elapsed;
      this.running = true;
      this.startedAt = now;
      this.runningSince = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    } else {
      this.baseMs = baseMs;
      this.elapsedMs = baseMs;
      this.running = false;
    }
  }

  #dispatchEvent(): void {
    this.dispatchEvent(new Event("change"));
  }
}

export const stopwatchStore = new StopwatchStore();
