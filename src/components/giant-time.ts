import { LitElement, html, css, nothing } from "lit";

const FIT_PADDING = 32;

export class GiantTime extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .clock {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex-shrink: 0;
      font-weight: 700;
      font-variation-settings:
        "slnt" 0,
        "wdth" 100,
        "GRAD" 0,
        "ROND" 100;
      opacity: 0;
      transition: opacity var(--md-sys-motion-effects-default-duration)
        var(--md-sys-motion-effects-default);
    }

    .clock.ready {
      opacity: 1;
    }

    .row {
      display: flex;
      align-items: baseline;
    }

    .time {
      font-family: var(--md-ref-typeface-brand);
      font-variant-numeric: tabular-nums;
      line-height: 1;
      white-space: nowrap;
    }

    .ampm {
      font-size: 0.16em;
      letter-spacing: 0.02em;
      line-height: 1;
      margin-inline-start: 8px;
    }
  `;

  static properties = {
    value: { type: String },
    ampm: { type: String },
    rotation: { type: Number },
    fontSize: { type: Number, state: true },
  };

  declare value: string;
  declare ampm: string;
  declare rotation: number;
  declare fontSize: number;

  #ro: ResizeObserver | undefined;
  #ready = false;

  constructor() {
    super();
    this.value = "";
    this.ampm = "";
    this.rotation = 15;
    this.fontSize = 200;
  }

  render() {
    return html`
      <div
        class="clock${this.#ready ? " ready" : ""}"
        style="transform:rotate(-${this.rotation}deg)"
      >
        <div class="row" style="font-size:${this.fontSize}px">
          <span class="time">${this.value}</span>
          ${this.ampm ? html`<span class="ampm">${this.ampm}</span>` : nothing}
        </div>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#ro = new ResizeObserver(() => this.#fit());
    this.#ro.observe(this);
  }

  disconnectedCallback(): void {
    this.#ro?.disconnect();
    super.disconnectedCallback();
  }

  updated(): void {
    this.#fit();
  }

  #fit(): void {
    const clock = this.shadowRoot?.querySelector(
      ".clock",
    ) as HTMLElement | null;
    const time = this.shadowRoot?.querySelector(".time") as HTMLElement | null;
    if (!clock || !time) return;

    const w = clock.offsetWidth;
    const h = clock.offsetHeight;
    const current = parseFloat(getComputedStyle(time).fontSize);
    if (w <= 0 || h <= 0 || !Number.isFinite(current) || current <= 0) return;

    const cw = this.clientWidth - FIT_PADDING * 2;
    const ch = this.clientHeight - FIT_PADDING * 2;
    if (cw <= 0 || ch <= 0) return;

    const rad = (this.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const sW = cw / (w * cos + h * sin);
    const sH = ch / (w * sin + h * cos);
    const s = Math.min(sW, sH);
    if (s <= 0) return;

    const next = Math.round(current * s * 10) / 10;
    if (Math.abs(next - this.fontSize) > 1) {
      this.fontSize = next;
    }

    if (!this.#ready) {
      this.#ready = true;
      this.requestUpdate();
    }
  }
}

customElements.define("giant-time", GiantTime);
