import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "@vollowx/seele/core/decorators.js";

import { settings } from "../lib/settings.js";
import { formatClockTime } from "../lib/format.js";
import { timeSync } from "../lib/time-sync.js";
import {
  timezoneStore,
  allTimezones,
  systemTimezone,
  tzOffset,
} from "../lib/timezones.js";

import "iconify-icon";
import "@vollowx/seele/m3/list/list.js";
import "@vollowx/seele/m3/list/list-item.js";
import "@vollowx/seele/m3/button/icon-button.js";
import "@vollowx/seele/m3/button-group/standard-button-group.js";

@customElement("timezone-list", false)
export class TimezoneList extends LitElement {
  static styles = css`
    :host {
      display: contents;
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
  `;

  @property({ type: Number })
  now = Date.now();

  render() {
    if (this.now == null) return html``;
    const correct = this.now + timeSync.offsetMs;
    const selected = timezoneStore.list;
    const tzs = allTimezones();
    const byId = new Map(tzs.map((t) => [t.id, t]));
    const sys = systemTimezone();

    return html`
      <md-list>
        ${selected.map((id, i) => {
          const tz = byId.get(id);
          if (!tz) return null;
          const offset = tzOffset(id);
          const date = new Date(correct);
          const { time, ampm } = formatClockTime(date, settings.use24h, offset);
          const last = selected.length - 1;
          return html`
            <md-list-item class="${id === sys ? "current" : ""}">
              <span slot="headline">${tz.label}</span>
              <span slot="supporting-text">${this.#offsetLabel(offset)}</span>
              <span class="end-slot" slot="end">
                <span class="clock-time">
                  ${time}${ampm ? html` ${ampm}` : ""}
                </span>
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
    `;
  }

  #offsetLabel(minutes: number): string {
    if (minutes === 0) return "UTC";
    const sign = minutes > 0 ? "+" : "-";
    const h = Math.abs(Math.floor(minutes / 60));
    const m = Math.abs(minutes % 60);
    return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
  }

  readonly #onChange = (): void => this.requestUpdate();

  connectedCallback(): void {
    super.connectedCallback();
    settings.addEventListener("change", this.#onChange);
    timeSync.addEventListener("change", this.#onChange);
    timezoneStore.addEventListener("change", this.#onChange);
  }

  disconnectedCallback(): void {
    settings.removeEventListener("change", this.#onChange);
    timeSync.removeEventListener("change", this.#onChange);
    timezoneStore.removeEventListener("change", this.#onChange);
    super.disconnectedCallback();
  }
}
