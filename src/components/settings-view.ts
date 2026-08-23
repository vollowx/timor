import { LitElement, html, css } from "lit";
import { customElement } from "@vollowx/seele/core/decorators.js";

import { settings } from "../lib/settings.js";

import "@vollowx/seele/m3/switch/switch.js";
import "@vollowx/seele/m3/radio/radio.js";

@customElement("settings-view")
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

    label {
      -webkit-tap-highlight-color: transparent;
    }

    label:has(md-radio) {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-inline-start: 8px;
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

        <div class="row">
          <span>Theme</span>
          <span @change=${this.#onTheme}>
            <label>
              <md-radio
                name="theme"
                value="auto"
                ?checked=${settings.theme === "auto"}
              ></md-radio>
              Automatic
            </label>
            <label>
              <md-radio
                name="theme"
                value="light"
                ?checked=${settings.theme === "light"}
              ></md-radio>
              Light
            </label>
            <label>
              <md-radio
                name="theme"
                value="dark"
                ?checked=${settings.theme === "dark"}
              ></md-radio>
              Dark
            </label>
          </span>
        </div>
      </section>
    `;
  }

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

  #onTheme(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (value === "auto" || value === "light" || value === "dark") {
      settings.setTheme(value);
    }
  }
}
