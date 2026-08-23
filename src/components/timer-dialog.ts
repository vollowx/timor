import { LitElement, html, css } from "lit";
import { ref, createRef } from "lit/directives/ref.js";
import { customElement } from "@vollowx/seele/core/decorators.js";
import { timerStore } from "../lib/timer-store.js";

import "@vollowx/seele/m3/dialog/dialog.js";
import "@vollowx/seele/m3/text-field/outlined-text-field.js";
import "@vollowx/seele/m3/button/common-button.js";

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

@customElement("timer-dialog", false)
export class TimerDialog extends LitElement {
  static styles = css`
    :host {
      z-index: 20;
    }
    md-dialog::part(dialog) {
      width: 320px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .duration {
      display: flex;
      gap: 8px;
    }
    .duration md-outlined-text-field {
      min-width: unset;
    }
    .presets {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `;

  #dialog = createRef<HTMLElement & { show(): void; close(): void }>();

  render() {
    return html`
      <md-dialog ${ref(this.#dialog)}>
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
                <md-button variant="tonal" @click=${() => this.#add(p.ms)}>
                  ${p.label}
                </md-button>
              `,
            )}
          </div>
        </div>

        <div slot="actions">
          <md-button variant="text" @click=${this.#cancel}>Cancel</md-button>
          <md-button variant="text" @click=${this.#onStartClick}>
            Start
          </md-button>
        </div>
      </md-dialog>
    `;
  }

  async show(): Promise<void> {
    await this.updateComplete;
    this.#field("hours").value = "";
    this.#field("minutes").value = "";
    this.#field("seconds").value = "";
    this.#dialog.value?.show();
  }

  #field(id: string) {
    return this.shadowRoot!.getElementById(id) as HTMLInputElement;
  }

  #cancel = (): void => {
    this.#dialog.value?.close();
  };

  #add(ms: number): void {
    timerStore.addTimer(ms, "");
    this.#cancel();
    this.dispatchEvent(
      new Event("timer-added", { bubbles: true, composed: true }),
    );
  }

  #parseDuration(): number {
    const hours = parseInt(this.#field("hours").value, 10) || 0;
    const minutes = parseInt(this.#field("minutes").value, 10) || 0;
    const seconds = parseInt(this.#field("seconds").value, 10) || 0;
    return (
      Math.max(0, hours) * 3_600_000 +
      Math.max(0, minutes) * 60_000 +
      Math.max(0, seconds) * 1000
    );
  }

  #onStartClick = (): void => {
    this.#add(this.#parseDuration());
  };
}
