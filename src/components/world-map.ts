import { LitElement, html, css } from "lit";
import { customElement } from "@vollowx/seele/core/decorators.js";

import { timeSync } from "../lib/time-sync.js";
import geo from "../assets/world-map-shape.js";

const DOT_SIZE = 8;
const DOT_GAP = 12;
const TWILIGHT = 6;

function subsolarPoint(utc: Date): { lat: number; lon: number } {
  const day =
    (utc.getTime() - Date.UTC(utc.getUTCFullYear(), 0, 0)) / 86_400_000;
  const decl = -23.44 * Math.cos((360 / 365) * (day + 10) * (Math.PI / 180));
  const hours =
    utc.getUTCHours() + utc.getUTCMinutes() / 60 + utc.getUTCSeconds() / 3600;
  const lon = (12 - hours) * 15;
  return { lat: decl, lon };
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function cosAngularDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const a = toRad(lat1),
    b = toRad(lat2),
    d = toRad(lon1 - lon2);
  return Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(d);
}

@customElement("world-map", false)
export class WorldMap extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
    }
  `;

  #landMask: ImageData | null = null;
  #raf = 0;
  #ro: ResizeObserver | undefined;

  render() {
    return html`<canvas></canvas>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#ro = new ResizeObserver(() => {
      this.#buildLandMask();
      this.#tick();
    });
    this.#ro.observe(this);
    timeSync.addEventListener("change", this.#tick);
  }

  disconnectedCallback(): void {
    this.#ro?.disconnect();
    timeSync.removeEventListener("change", this.#tick);
    cancelAnimationFrame(this.#raf);
    super.disconnectedCallback();
  }

  async firstUpdated(): Promise<void> {
    this.#buildLandMask();
    this.#tick();
  }

  #buildLandMask(): void {
    const maxCols = Math.floor(this.clientWidth / DOT_GAP);
    const maxRows = Math.floor(this.clientHeight / DOT_GAP);
    const cols = Math.min(maxCols, 2 * maxRows);
    const rows = Math.floor(cols / 2);
    if (cols <= 0 || rows <= 0) return;

    const off = new OffscreenCanvas(cols, rows);
    const ctx = off.getContext("2d")!;

    for (const feat of geo.features) {
      const coords = feat.geometry.coordinates[0] as unknown as [
        number,
        number,
      ][];
      ctx.beginPath();
      for (let i = 0; i < coords.length; i++) {
        const x = ((coords[i][0] + 180) / 360) * cols;
        const y = ((90 - coords[i][1]) / 180) * rows;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }
    this.#landMask = ctx.getImageData(0, 0, cols, rows);
  }

  #tick = (): void => {
    this.#raf = requestAnimationFrame(() => this.#draw());
  };

  #draw(): void {
    if (!this.#landMask) return;
    const canvas = this.shadowRoot!.querySelector(
      "canvas",
    ) as HTMLCanvasElement;
    const w = this.clientWidth;
    canvas.width = w * devicePixelRatio;
    canvas.height = this.clientHeight * devicePixelRatio;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const cols = this.#landMask.width;
    const rows = this.#landMask.height;
    const sun = subsolarPoint(new Date(timeSync.actualNow()));

    const style = getComputedStyle(this);
    const color =
      style.getPropertyValue("--md-sys-color-on-primary-container").trim() ||
      "#fff";
    const r = DOT_SIZE / 2;
    const step = DOT_GAP;
    const mapW = cols * step;
    const ox = (w - mapW) / 2 + step / 2;
    const oy = step / 2;

    ctx.fillStyle = color;
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const alpha = this.#landMask.data[(cy * cols + cx) * 4 + 3];
        if (alpha < 128) continue;

        const lon = (cx / cols) * 360 - 180;
        const lat = 90 - (cy / rows) * 180;
        const cosDist = cosAngularDistance(lat, lon, sun.lat, sun.lon);
        const twilight =
          cosDist > 0
            ? 1
            : 1 - Math.min(1, Math.abs(cosDist) / Math.sin(toRad(TWILIGHT)));

        ctx.globalAlpha = 0.06 + twilight * 0.18;
        ctx.beginPath();
        ctx.arc(ox + cx * step, oy + cy * step, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
}
