import { readJSON, writeJSON } from "./storage.js";

const KEY = "timor.timezones";

export interface TzInfo {
  id: string;
  label: string;
}

let _all: TzInfo[] | null = null;

export function allTimezones(): TzInfo[] {
  if (_all) return _all;
  try {
    _all = Intl.supportedValuesOf("timeZone").map((id) => {
      const parts = id.split("/");
      const city = parts[parts.length - 1].replace(/_/g, " ");
      const region = parts.length > 1 ? parts[0].replace(/_/g, " ") : "";
      const label = region && region !== city ? `${city}, ${region}` : city;
      return { id, label };
    });
  } catch {
    _all = [];
  }
  return _all;
}

export function tzOffset(id: string): number {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en", { timeZone: id, timeZoneName: "longOffset" });
  const off = fmt.formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = off.match(/GMT([+-]\d+):?(\d+)?/);
  return m ? parseInt(m[1]) * 60 + (m[1][0] === "-" ? -1 : 1) * (parseInt(m[2] ?? "0") || 0) : 0;
}

export function systemTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

class TimezoneStore extends EventTarget {
  #selected: string[];

  constructor() {
    super();
    const saved = readJSON<string[]>(KEY);
    this.#selected = Array.isArray(saved) ? [...new Set(saved)] : [systemTimezone()];
  }

  get list(): string[] {
    return this.#selected;
  }

  add(id: string): void {
    if (this.#selected.includes(id)) return;
    this.#selected = [...this.#selected, id];
    this.#save();
  }

  remove(id: string): void {
    if (this.#selected.length <= 1) return;
    this.#selected = this.#selected.filter((t) => t !== id);
    this.#save();
  }

  reorder(from: number, to: number): void {
    const list = [...this.#selected];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    this.#selected = list;
    this.#save();
  }

  #save(): void {
    writeJSON(KEY, this.#selected);
    this.dispatchEvent(new Event("change"));
  }
}

export const timezoneStore = new TimezoneStore();