export type TimeSyncStatus = "idle" | "syncing" | "synced" | "error";

export interface TimeSyncSnapshot {
  status: TimeSyncStatus;
  offsetMs: number;
  fastByMs: number;
  syncedAt: number;
  error: string | null;
}

const SYNC_INTERVAL_MS = 60_000;
const SAMPLE_COUNT = 3;
const ENDPOINT = "https://timeapi.io/api/Time/current/zone?timeZone=UTC";

interface Sample {
  rtt: number;
  fastByMs: number;
}

class TimeSync extends EventTarget {
  private snapshot: TimeSyncSnapshot = {
    status: 'idle',
    offsetMs: 0,
    fastByMs: 0,
    syncedAt: 0,
    error: null,
  };

  private timer: number | undefined;
  private inFlight: Promise<void> | null = null;

  get status(): TimeSyncStatus {
    return this.snapshot.status;
  }

  get offsetMs(): number {
    return this.snapshot.offsetMs;
  }

  get fastByMs(): number {
    return this.snapshot.fastByMs;
  }

  get syncedAt(): number {
    return this.snapshot.syncedAt;
  }

  get error(): string | null {
    return this.snapshot.error;
  }

  start(): void {
    void this.sync();
    if (this.timer === undefined) {
      this.timer = window.setInterval(() => void this.sync(), SYNC_INTERVAL_MS);
    }
  }

  stop(): void {
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  /** Best-known actual time now, in ms since the Unix epoch. */
  actualNow(): number {
    return Date.now() + this.snapshot.offsetMs;
  }

  sync(): Promise<void> {
    if (this.inFlight) return this.inFlight;

    this.inFlight = this.measure()
      .then((samples) => {
        const best = samples.reduce((a, b) => (a.rtt < b.rtt ? a : b));
        const offsetMs = -best.fastByMs;
        this.setSnapshot({
          status: 'synced',
          offsetMs,
          fastByMs: best.fastByMs,
          syncedAt: Date.now() + offsetMs,
          error: null,
        });
      })
      .catch((err: unknown) => {
        this.setSnapshot({
          ...this.snapshot,
          status: 'error',
          error: err instanceof Error ? err.message : String(err),
        });
      })
      .finally(() => {
        this.inFlight = null;
      });

    return this.inFlight;
  }

  private async measure(): Promise<Sample[]> {
    this.setSnapshot({ ...this.snapshot, status: 'syncing', error: null });
    const samples: Sample[] = [];
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      try {
        samples.push(await this.sample());
      } catch {
        /* tolerate an individual sample failing */
      }
    }
    if (samples.length === 0) {
      throw new Error('all time sync samples failed');
    }
    return samples;
  }

  private async sample(): Promise<Sample> {
    const t0 = Date.now();
    const res = await fetch(ENDPOINT, { cache: "no-store" });
    if (!res.ok) throw new Error(`timeapi.io HTTP ${res.status}`);
    const json = (await res.json()) as Record<string, unknown>;
    const t1 = Date.now();

    const year = Number(json["year"]);
    const month = Number(json["month"]) - 1;
    const day = Number(json["day"]);
    const hour = Number(json["hour"]);
    const minute = Number(json["minute"]);
    const seconds = Number(json["seconds"]);
    const milliSeconds = Number(json["milliSeconds"] ?? 0);
    if (
      !Number.isFinite(year + month + day + hour + minute + seconds + milliSeconds)
    ) {
      throw new Error("unexpected timeapi.io payload");
    }
    const serverMs = Date.UTC(year, month, day, hour, minute, seconds, milliSeconds);
    const rtt = t1 - t0;
    const fastByMs = t0 - serverMs + rtt / 2;
    return { rtt, fastByMs };
  }

  private setSnapshot(next: TimeSyncSnapshot): void {
    this.snapshot = next;
    this.dispatchEvent(new Event('change'));
  }
}

export const timeSync = new TimeSync();
