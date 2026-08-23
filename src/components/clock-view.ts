import { LitElement, html, css } from "lit";

import { settings } from "../lib/settings.js";
import { formatClockTime, formatClockOffset } from "../lib/format.js";
import { timeSync } from "../lib/time-sync.js";

import "@vollowx/seele/m3/loading-indicator/loading-indicator.js";
import "./giant-time.js";

export class ClockView extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background: var(--md-sys-color-primary-container);
      overflow: hidden;
    }

    giant-time {
      width: 100%;
      height: 100%;
      color: var(--md-sys-color-on-primary-container);
    }

    .info {
      position: absolute;
      right: 16px;
      bottom: 16px;
      padding: 12px;
      border-radius: 16px;
      background-color: var(--md-sys-color-surface);
    }

    .sync {
      font: var(--md-sys-typography-body-medium);
      color: var(--md-sys-color-on-surface-variant);
      animation: sync-in var(--md-sys-motion-spatial-default-duration)
        var(--md-sys-motion-spatial-default);
    }

    .sync.error {
      color: var(--md-sys-color-error);
    }

    md-loading {
      animation: sync-in var(--md-sys-motion-spatial-default-duration)
        var(--md-sys-motion-spatial-default);
    }

    @keyframes sync-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
  `;

  static properties = {
    now: { type: Number, state: true },
  };

  declare now: number;

  render() {
    const date = new Date(this.now + timeSync.offsetMs);
    const { time, ampm } = formatClockTime(
      date,
      settings.use24h,
      settings.offsetMinutes,
    );

    return html`
      <giant-time
        value=${time}
        ampm=${ampm || ""}
        rotation="15"
      ></giant-time>

      <div class="info">${this.renderSync()}</div>
    `;
  }

  renderSync() {
    switch (timeSync.status) {
      case "synced": {
        return html`
          <div class="sync">${formatClockOffset(timeSync.fastByMs)}</div>
        `;
      }
      case "error":
        return html`
          <div class="sync error">device time (sync unavailable)</div>
        `;
      default:
        return html`
          <md-loading aria-label="Syncing accurate time"></md-loading>
        `;
    }
  }

  #interval: number | undefined;
  readonly #onChange = (): void => this.requestUpdate();

  constructor() {
    super();
    this.now = Date.now();
  }

  connectedCallback(): void {
    super.connectedCallback();
    settings.addEventListener("change", this.#onChange);
    timeSync.addEventListener("change", this.#onChange);
    this.#interval = window.setInterval(() => {
      this.now = Date.now();
    }, 250);
  }

  disconnectedCallback(): void {
    settings.removeEventListener("change", this.#onChange);
    timeSync.removeEventListener("change", this.#onChange);
    if (this.#interval !== undefined) window.clearInterval(this.#interval);
    super.disconnectedCallback();
  }
}

customElements.define("clock-view", ClockView);