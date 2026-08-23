import { LitElement, html, css } from "lit";

import { formatCountdown, formatDurationLabel } from "../lib/format.js";
import { timerStore, type TimerItem } from "../lib/timer-store.js";

import type { M3Dialog } from "@vollowx/seele/m3/dialog/dialog.js";
import type { M3OutlinedTextField } from "@vollowx/seele/m3/text-field/outlined-text-field.js";
import "iconify-icon";
import "@vollowx/seele/m3/dialog/dialog.js";
import "@vollowx/seele/m3/text-field/outlined-text-field.js";
import "@vollowx/seele/m3/button/common-button.js";
import "@vollowx/seele/m3/button/icon-button.js";
import "@vollowx/seele/m3/button/icon-button-toggle.js";
import "@vollowx/seele/m3/tooltip/tooltip.js";
import "./giant-time.js";

interface Preset {
  label: string;
  ms: number;
}

const PRESETS: Preset[] = [
  { label: "1 min", ms: 60_000 },
  { label: "5 min", ms: 5 * 60_000 },
  { label: "10 min", ms: 10 * 60_000 },
  { label: "15 min", ms: 15 * 60_000 },
  { label: "30 min", ms: 30 * 60_000 },
  { label: "1 hour", ms: 60 * 60_000 },
];

export class TimerView extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
      box-sizing: border-box;
    }

    .timer-page {
      display: flex;
      flex-direction: column;
      gap: 32px;
      height: 100%;
    }

    .card {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 48px;
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      border-radius: 28px;
      min-height: 100%;
      scroll-snap-align: start;
    }

    .display {
      position: absolute;
      inset: -48px -48px 72px;
    }

    .display giant-time {
      width: 100%;
      height: 100%;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: end;
      gap: 16px;
      margin-top: auto;
      position: relative;
      z-index: 1;
    }

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .label {
      font: var(--md-sys-typography-display-small);
    }

    .left-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .right {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    .empty {
      margin: 0;
      color: var(--md-sys-color-on-surface-variant);
      font: var(--md-sys-typography-body-medium);
    }

    md-dialog::part(dialog) {
      width: 400px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-width: min(80vw, 360px);
    }

    .duration {
      display: flex;
      gap: 8px;

      md-outlined-text-field {
        min-width: unset;
      }
    }

    .presets {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `;

  render() {
    return html`
      <div class="timer-page">
        ${timerStore.list.length === 0
          ? html`<p class="empty">No any timer.</p>`
          : timerStore.list.map((t) => this.renderTimer(t))}

        <md-dialog>
          <span slot="headline">New timer</span>

          <div class="form">
            <div class="duration">
              <md-outlined-text-field
                id="hours"
                placeholder="hour"
                type="number"
                min="0"
              ></md-outlined-text-field>

              <md-outlined-text-field
                id="minutes"
                placeholder="min"
                type="number"
                min="0"
              ></md-outlined-text-field>

              <md-outlined-text-field
                id="seconds"
                placeholder="sec"
                type="number"
                min="0"
              ></md-outlined-text-field>
            </div>

            <div class="presets">
              ${PRESETS.map(
                (p) => html`
                  <md-button
                    size="s"
                    variant="tonal"
                    @click=${() => this.#addTimer(p.ms)}
                  >
                    ${p.label}
                  </md-button>
                `,
              )}
            </div>
          </div>

          <div slot="actions">
            <md-button variant="text" @click=${this.#closeSetup}>
              Cancel
            </md-button>
            <md-button variant="text" @click=${this.#startManual}>
              Start
            </md-button>
          </div>
        </md-dialog>
      </div>
    `;
  }

  renderTimer(t: TimerItem) {
    const toggleLabel = t.done ? "Restart" : t.running ? "Pause" : "Resume";
    const displayValue = t.done ? "done" : formatCountdown(t.remainingMs);

    return html`
      <article class="card">
        <div class="display">
          <giant-time value=${displayValue} rotation="15"></giant-time>
        </div>

        <div class="controls">
          <div class="left">
            <span class="label">${formatDurationLabel(t.durationMs)}</span>
            <div class="left-buttons">
              <md-button
                size="m"
                variant="filled"
                @click=${() => timerStore.addMinute(t.id)}
              >
                +1:00
              </md-button>

              <md-icon-button
                id="timer-delete-${t.id}"
                variant="filled"
                size="m"
                width="wide"
                aria-label="Delete"
                @click=${() => timerStore.removeTimer(t.id)}
              >
                <iconify-icon icon="material-symbols:delete"></iconify-icon>
              </md-icon-button>
              <md-tooltip for="timer-delete-${t.id}">Delete</md-tooltip>
            </div>
          </div>

          <div class="right">
            <md-icon-button-toggle
              id="timer-toggle-${t.id}"
              variant="tonal"
              size="xl"
              .checked=${!t.running}
              aria-label=${toggleLabel}
              @change=${(e: CustomEvent<boolean>) =>
                timerStore.toggleTimer(t.id, !e.detail)}
            >
              <iconify-icon icon="material-symbols:pause"></iconify-icon>
              <iconify-icon
                slot="checked"
                icon=${t.done
                  ? "material-symbols:restart-alt"
                  : "material-symbols:play-arrow"}
              ></iconify-icon>
            </md-icon-button-toggle>
            <md-tooltip for="timer-toggle-${t.id}">${toggleLabel}</md-tooltip>

            <md-icon-button
              id="timer-add-${t.id}"
              variant="tonal"
              size="xl"
              width="wide"
              aria-label="Add timer"
              @click=${this.openSetup}
            >
              <iconify-icon icon="material-symbols:add"></iconify-icon>
            </md-icon-button>
            <md-tooltip for="timer-add-${t.id}">Add timer</md-tooltip>
          </div>
        </div>
      </article>
    `;
  }

  readonly #onChange = (): void => this.requestUpdate();

  connectedCallback(): void {
    super.connectedCallback();
    timerStore.addEventListener("change", this.#onChange);
  }

  disconnectedCallback(): void {
    timerStore.removeEventListener("change", this.#onChange);
    super.disconnectedCallback();
  }

  openSetup(): void {
    void this.#openSetup();
  }

  #field(id: string) {
    return this.shadowRoot!.getElementById(id)! as any as M3OutlinedTextField;
  }

  async #openSetup(): Promise<void> {
    await this.updateComplete;
    const dialog = this.shadowRoot?.querySelector(
      "md-dialog",
    ) as M3Dialog | null;
    if (!dialog) return;
    await dialog.updateComplete;

    this.#field("hours").value = "";
    this.#field("minutes").value = "";
    this.#field("seconds").value = "";
    dialog.show();
  }

  #closeSetup(): void {
    this.shadowRoot?.querySelector("md-dialog")?.close();
  }

  #readDuration(): number {
    const hours = parseInt(this.#field("hours").value, 10) || 0;
    const minutes = parseInt(this.#field("minutes").value, 10) || 0;
    const seconds = parseInt(this.#field("seconds").value, 10) || 0;
    return (
      Math.max(0, hours) * 3_600_000 +
      Math.max(0, minutes) * 60_000 +
      Math.max(0, seconds) * 1000
    );
  }

  #addTimer(ms: number): void {
    timerStore.addTimer(ms, "");
    this.#closeSetup();
  }

  #startManual(): void {
    this.#addTimer(this.#readDuration());
  }
}

customElements.define("timer-view", TimerView);
