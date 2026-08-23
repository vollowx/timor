function pad(value: number, width = 2): string {
  return String(Math.floor(value)).padStart(width, "0");
}

function decomposeMs(ms: number): { h: number; m: number; s: number } {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };
}

export function formatOffset(minutes: number): string {
  if (minutes === 0) return 'UTC';
  const sign = minutes > 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${pad(m)}` : ''}`;
}

export function formatClockTime(
  date: Date,
  use24h: boolean,
  offsetMinutes: number,
): { time: string; ampm?: string } {
  const shifted = new Date(date.getTime() + offsetMinutes * 60_000);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  }).formatToParts(shifted);

  const get = (type: string): string =>
    parts.find((p) => p.type === type)?.value ?? '00';

  return {
    time: `${get('hour')}:${get('minute')}:${get('second')}`,
    ampm: use24h ? undefined : get('dayPeriod') || undefined,
  };
}

export function formatDuration(ms: number): string {
  const { h, m, s } = decomposeMs(ms);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function formatCountdown(ms: number): string {
  const { h, m, s } = decomposeMs(ms);
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function formatDurationLabel(ms: number): string {
  const { h, m, s } = decomposeMs(ms);
  const parts: string[] = [];
  if (h) parts.push(`${h} ${h === 1 ? "hour" : "hours"}`);
  if (m) parts.push(`${m} ${m === 1 ? "minute" : "minutes"}`);
  if (s) parts.push(`${s} ${s === 1 ? "second" : "seconds"}`);
  return parts.join(" ") || "0 seconds";
}

export function formatStopwatch(ms: number): string {
  const cs = Math.max(0, Math.floor((ms % 1000) / 10));
  return `${formatDuration(ms)}.${pad(cs)}`;
}

export function formatClockOffset(fastByMs: number): string {
  const abs = Math.abs(fastByMs);
  if (abs < 5) return "your clock is accurate";
  const seconds = (abs / 1000).toFixed(3);
  const direction = fastByMs > 0 ? "ahead" : "behind";
  return `your clock is ${seconds} s ${direction}`;
}
