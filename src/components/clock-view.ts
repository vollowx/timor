import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import { settings } from "../lib/settings.js";
import { formatClockOffset } from "../lib/format.js";
import { timeSync } from "../lib/time-sync.js";
import { timezoneStore } from "../lib/timezones.js";

import "iconify-icon";
import "@vollowx/seele/m3/loading-indicator/loading-indicator.js";
import "@vollowx/seele/m3/fab/fab.js";

import "./world-map.js";
import "./timezone-list.js";
import "./timezone-dialog.js";
import type { M3Dialog } from "@vollowx/seele/m3/dialog/dialog.js";

@customElement("clock-view")
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
      padding: 48px 24px 24px;
      max-height: 70%;
    }

    md-fab {
      position: absolute;
      inset-block-end: 24px;
      inset-inline-end: 24px;
      z-index: 10;
    }

    .sync {
      box-sizing: border-box;
      padding-block-end: 8px;
      padding-inline-start: 12px;
      border-radius: 12px;
      font: var(--md-sys-typography-body-small);
      color: var(--md-sys-color-on-surface-variant);
    }
    .error {
      color: var(--md-sys-color-error);
    }
  `;

  @property({ type: Number })
  now = Date.now();

  render() {
    return html`
      <world-map></world-map>

      <div class="list-area">
        <div class="sync">${this.renderSync()}</div>
        <timezone-list .now=${this.now}></timezone-list>
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

  #interval: number | undefined;
  readonly #onChange = (): void => this.requestUpdate();

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
    ) as M3Dialog;
    dialog?.show();
  }
}
