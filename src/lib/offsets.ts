import { formatOffset } from "./format.js";

export interface OffsetOption {
  value: number;
  label: string;
}

export function listOffsets(): OffsetOption[] {
  const options: OffsetOption[] = [];
  for (let i = 0; i < 48; i++) {
    const value = -690 + i * 30; // -11:30 to +12:00 in 30-min steps
    options.push({ value, label: formatOffset(value) });
  }
  return options;
}