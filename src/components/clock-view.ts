import { LitElement, html, css, isServer } from "lit";
import { settings } from "../lib/settings.js";
import { formatClockTime, formatClockOffset } from "../lib/format.js";
import { timeSync } from "../lib/time-sync.js";
import {
  timezoneStore,
  allTimezones,
  tzOffset,
  systemTimezone,
} from "../lib/timezones.js";

import "@vollowx/seele/m3/loading-indicator/loading-indicator.js";
import "@vollowx/seele/m3/fab/fab.js";
import "@vollowx/seele/m3/button/icon-button.js";
import "@vollowx/seele/m3/button-group/standard-button-group.js";
import "@vollowx/seele/m3/list/list.js";
import "@vollowx/seele/m3/list/list-item.js";
import "iconify-icon";
import "./world-map.js";
import "./timezone-dialog.js";

export class ClockView extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
    }

    world-map {
      position: absolute;
      inset: 0;
    }

    .list-area {
      position: relative;
      margin-top: auto;
      display: flex;
      flex-direction: column;
      padding: 48px 24px 16px;
      max-height: 70%;
    }

    md-list {
      width: min(480px, 100%);
      max-height: 100%;
      overflow-y: auto;
      padding: 0;
    }

    md-list-item {
      background-color: var(--md-sys-color-surface-container);
    }

    md-list-item:first-child {
      border-radius: 12px 12px 4px 4px;
    }

    md-list-item:last-child {
      border-radius: 4px 4px 12px 12px;
    }

    md-list-item:first-child:last-child {
      border-radius: 12px;
    }

    md-list-item.current {
      background-color: var(--md-sys-color-surface-container-highest);
    }

    .clock-time {
      font: var(--md-sys-typography-title-large);
      font-variant-numeric: tabular-nums;
    }

    .remove-btn,
    .reorder-group {
      display: none;
    }

    md-list-item:hover .clock-time,
    md-list-item:focus-within .clock-time {
      display: none;
    }

    md-list-item:hover .remove-btn,
    md-list-item:focus-within .remove-btn,
    md-list-item:hover .reorder-group,
    md-list-item:focus-within .reorder-group {
      display: inline-flex;
    }

    md-fab {
      position: absolute;
      inset-block-end: 24px;
      inset-inline-end: 24px;
      z-index: 10;
    }

    .sync {
      box-sizing: border-box;
      padding: 4px 12px;
      border-radius: 12px;
      font: var(--md-sys-typography-body-small);
      color: var(--md-sys-color-on-surface-variant);
      z-index: 5;
    }

    .error {
      color: var(--md-sys-color-error);
    }
  `;

  static properties = {
    now: { type: Number, state: true },
  };

  declare now: number;

  render() {
    if (isServer) {
      return html`<world-map></world-map>`;
    }
    const correct = this.now + timeSync.offsetMs;
    const tzs = allTimezones();
    const byId = new Map(tzs.map((t) => [t.id, t]));
    const selected = timezoneStore.list;
    const sys = systemTimezone();

    return html`
      <world-map></world-map>

      <div class="list-area">
        <div class="sync">${this.renderSync()}</div>

        <md-list>
          ${selected.map((id, i) => {
            const tz = byId.get(id);
            if (!tz) return null;
            const offset = tzOffset(id);
            const date = new Date(correct);
            const { time, ampm } = formatClockTime(
              date,
              settings.use24h,
              offset,
            );
            const last = selected.length - 1;
            return html`
              <md-list-item class="${id === sys ? "current" : ""}">
                <span slot="headline">${tz.label}</span>
                <span slot="supporting-text">${this.#offsetLabel(offset)}</span>
                <span class="end-slot" slot="end">
                  <span class="clock-time"
                    >${time}${ampm ? html` ${ampm}` : ""}</span
                  >
                  ${selected.length > 1
                    ? html`
                        <md-button-group class="reorder-group" size="s">
                          <md-icon-button
                            width="narrow"
                            ?disabled=${i === 0}
                            @click=${(e: Event) => {
                              e.stopPropagation();
                              timezoneStore.reorder(i, i - 1);
                            }}
                          >
                            <iconify-icon
                              icon="material-symbols:arrow-upward"
                            ></iconify-icon>
                          </md-icon-button>
                          <md-icon-button
                            width="narrow"
                            ?disabled=${i === last}
                            @click=${(e: Event) => {
                              e.stopPropagation();
                              timezoneStore.reorder(i, i + 1);
                            }}
                          >
                            <iconify-icon
                              icon="material-symbols:arrow-downward"
                            ></iconify-icon>
                          </md-icon-button>
                          <md-icon-button
                            class="remove-btn"
                            width="narrow"
                            @click=${(e: Event) => {
                              e.stopPropagation();
                              timezoneStore.remove(id);
                            }}
                          >
                            <iconify-icon
                              icon="material-symbols:close"
                            ></iconify-icon>
                          </md-icon-button>
                        </md-button-group>
                      `
                    : null}
                </span>
              </md-list-item>
            `;
          })}
        </md-list>
      </div>

      <md-fab @click=${this.#openDialog}>
        <iconify-icon icon="material-symbols:add"></iconify-icon>
        <span slot="label">Add location</span>
      </md-fab>

      <timezone-dialog></timezone-dialog>
    `;
  }

  renderSync() {
    switch (timeSync.status) {
      case "synced":
        return html`synced. ${formatClockOffset(timeSync.fastByMs)}`;
      case "error":
        return html`<span class="error">sync unavailable</span>`;
      default:
        return html`<md-loading
          aria-label="Syncing accurate time"
        ></md-loading>`;
    }
  }

  #offsetLabel(minutes: number): string {
    if (minutes === 0) return "UTC";
    const sign = minutes > 0 ? "+" : "-";
    const h = Math.abs(Math.floor(minutes / 60));
    const m = Math.abs(minutes % 60);
    return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
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
    timezoneStore.addEventListener("change", this.#onChange);
    this.#interval = window.setInterval(() => {
      this.now = Date.now();
    }, 250);
  }

  disconnectedCallback(): void {
    settings.removeEventListener("change", this.#onChange);
    timeSync.removeEventListener("change", this.#onChange);
    timezoneStore.removeEventListener("change", this.#onChange);
    if (this.#interval !== undefined) window.clearInterval(this.#interval);
    super.disconnectedCallback();
  }

  #openDialog(): void {
    const dialog = this.shadowRoot?.querySelector(
      "timezone-dialog",
    ) as HTMLElement & { show(): void };
    dialog?.show();
  }
}

customElements.define("clock-view", ClockView);
