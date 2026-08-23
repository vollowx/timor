import { LitElement, html, css } from "lit";

import { settings } from "../lib/settings.js";
import { listOffsets, type OffsetOption } from "../lib/offsets.js";
import { formatOffset } from "../lib/format.js";

import "@vollowx/seele/m3/switch/switch.js";
import "@vollowx/seele/m3/select/outlined-select.js";
import "@vollowx/seele/m3/select/option.js";

export class SettingsView extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex: 1;
    }

    .settings {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin: 24px;
    }

    h2 {
      margin: 0;
      margin-block-end: 32px;
      font: var(--md-sys-typography-headline-medium);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 48px;
      font: var(--md-sys-typography-label-large);
    }

    md-outlined-select {
      width: 300px;
    }
  `;

  render() {
    return html`
      <section class="settings">
        <h2>Settings</h2>

        <label class="row">
          <span>24-hour clock</span>
          <md-switch
            aria-label="24-hour clock"
            .checked=${settings.use24h}
            @change=${this.#on24h}
          ></md-switch>
        </label>

        <label class="row">
          <span>Dark mode</span>
          <md-switch
            aria-label="Dark mode"
            .checked=${settings.theme === "dark"}
            @change=${this.#onTheme}
          ></md-switch>
        </label>

        <label class="row">
          <span>Offset</span>
          <md-outlined-select
            label="Offset"
            .value=${String(settings.offsetMinutes)}
            @input=${this.#onOffset}
          >
            ${this.#options().map(
              (o) =>
                html`<md-option
                  value=${o.value}
                  ?selected=${o.value === settings.offsetMinutes}
                  >${o.label}</md-option
                >`,
            )}
          </md-outlined-select>
        </label>
      </section>
    `;
  }

  readonly #offsets = listOffsets();
  readonly #onChange = (): void => this.requestUpdate();

  connectedCallback(): void {
    super.connectedCallback();
    settings.addEventListener("change", this.#onChange);
  }

  disconnectedCallback(): void {
    settings.removeEventListener("change", this.#onChange);
    super.disconnectedCallback();
  }

  #on24h(e: CustomEvent<boolean>): void {
    settings.setUse24h(e.detail);
  }

  #onTheme(e: CustomEvent<boolean>): void {
    settings.setTheme(e.detail ? "dark" : "light");
  }

  #onOffset(e: Event): void {
    const value = Number((e.target as HTMLInputElement).value);
    if (Number.isFinite(value)) settings.setOffsetMinutes(value);
  }

  #options(): OffsetOption[] {
    const offsets = this.#offsets;
    const current = settings.offsetMinutes;
    // Safety net: always offer the current offset even if it falls between
    // the half-hour steps (e.g. UTC+05:45).
    if (!offsets.some((o) => o.value === current)) {
      return [{ value: current, label: formatOffset(current) }, ...offsets];
    }
    return offsets;
  }
}

customElements.define("settings-view", SettingsView);
