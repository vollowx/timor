import { readJSON, writeJSON } from "./storage.js";

const KEY_24H = "timor.24h";
const KEY_OFFSET = "timor.offset";
const KEY_THEME = "timor.theme";

export type Theme = "light" | "dark";

export interface SettingsState {
  use24h: boolean;
  offsetMinutes: number;
  theme: Theme;
}

function systemOffsetMinutes(): number {
  return -new Date().getTimezoneOffset();
}

function systemTheme(): Theme {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function readState(): SettingsState {
  const stored24h = readJSON<boolean>(KEY_24H);
  const storedOffset = readJSON<number>(KEY_OFFSET);
  let storedTheme = readJSON<string>(KEY_THEME);
  if (storedTheme === null) {
    try {
      const raw = localStorage?.getItem(KEY_THEME);
      if (raw === "light" || raw === "dark") storedTheme = raw;
    } catch {}
  }

  return {
    use24h: stored24h !== null ? stored24h : true,
    offsetMinutes:
      storedOffset !== null && Number.isFinite(storedOffset)
        ? storedOffset
        : systemOffsetMinutes(),
    theme:
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : systemTheme(),
  };
}

class SettingsStore extends EventTarget {
  private state: SettingsState = readState();

  get use24h(): boolean {
    return this.state.use24h;
  }
  get offsetMinutes(): number {
    return this.state.offsetMinutes;
  }
  get theme(): Theme {
    return this.state.theme;
  }

  setUse24h(value: boolean): void {
    if (this.state.use24h === value) return;
    this.state = { ...this.state, use24h: value };
    writeJSON(KEY_24H, value);
    this.emit();
  }

  setOffsetMinutes(value: number): void {
    if (!Number.isFinite(value) || this.state.offsetMinutes === value) return;
    this.state = { ...this.state, offsetMinutes: value };
    writeJSON(KEY_OFFSET, value);
    this.emit();
  }

  setTheme(value: Theme): void {
    if (this.state.theme === value) return;
    this.state = { ...this.state, theme: value };
    writeJSON(KEY_THEME, value);
    this.emit();
  }

  private emit(): void {
    this.dispatchEvent(new Event("change"));
  }
}

export const settings = new SettingsStore();
