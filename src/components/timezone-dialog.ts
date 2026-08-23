import { LitElement, html, css } from "lit";
import { ref, createRef } from "lit/directives/ref.js";
import { timezoneStore, allTimezones, tzOffset } from "../lib/timezones.js";

import "@vollowx/seele/m3/dialog/dialog.js";
import "@vollowx/seele/m3/text-field/outlined-text-field.js";
import "@vollowx/seele/m3/button/common-button.js";
import "@vollowx/seele/m3/list/list.js";
import "@vollowx/seele/m3/list/list-item.js";

export class TimezoneDialog extends LitElement {
  static styles = css`
    :host {
      z-index: 20;
    }
    md-dialog::part(dialog) {
      width: 560px;
    }
    md-outlined-text-field {
      width: 100%;
      margin-block-end: 8px;
    }
    md-list {
      height: 360px;
      width: 100%;
      padding: 0;
      box-sizing: border-box;
    }
  `;

  static properties = {
    query: { type: String, state: true },
  };

  declare query: string;

  #dialog = createRef<HTMLElement & { show(): void; close(): void }>();

  constructor() {
    super();
    this.query = "";
  }

  render() {
    const q = this.query.toLowerCase().trim();
    const filtered = q
      ? allTimezones().filter(
          (t) =>
            t.label.toLowerCase().includes(q) || t.id.toLowerCase().includes(q),
        )
      : allTimezones();

    return html`
      <md-dialog ${ref(this.#dialog)}>
        <span slot="headline">Add location</span>

        <div>
          <md-outlined-text-field
            slot="headline"
            label="Search locations"
            .value=${this.query}
            @input=${(e: InputEvent) => {
              this.query = (e.target as HTMLInputElement).value;
            }}
          ></md-outlined-text-field>

          <md-list>
            ${filtered.slice(0, 100).map(
              (tz) => html`
                <md-list-item @click=${() => this.#select(tz.id)}>
                  <span slot="headline">${tz.label}</span>
                  <span slot="supporting-text"
                    >${this.#offsetLabel(tzOffset(tz.id))}</span
                  >
                  <span slot="end">${tz.id}</span>
                </md-list-item>
              `,
            )}
          </md-list>
        </div>

        <div slot="actions">
          <md-button variant="text" @click=${this.#cancel}>Cancel</md-button>
        </div>
      </md-dialog>
    `;
  }

  show(): void {
    this.#dialog.value?.show();
  }

  #select(id: string): void {
    timezoneStore.add(id);
    this.#dialog.value?.close();
    this.query = "";
  }

  #cancel = (): void => {
    this.#dialog.value?.close();
    this.query = "";
  };

  #offsetLabel(minutes: number): string {
    if (minutes === 0) return "UTC";
    const sign = minutes > 0 ? "+" : "-";
    const h = Math.abs(Math.floor(minutes / 60));
    const m = Math.abs(minutes % 60);
    return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
  }
}

customElements.define("timezone-dialog", TimezoneDialog);
