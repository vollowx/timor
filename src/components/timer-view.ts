import { LitElement, html, css } from "lit";

import { formatCountdown, formatDurationLabel } from "../lib/format.js";
import { timerStore, type TimerItem } from "../lib/timer-store.js";

import "iconify-icon";
import "@vollowx/seele/m3/button/common-button.js";
import "@vollowx/seele/m3/button/icon-button.js";
import "@vollowx/seele/m3/button/icon-button-toggle.js";
import "@vollowx/seele/m3/tooltip/tooltip.js";
import "./giant-time.js";

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
      margin: auto;
      color: var(--md-sys-color-on-surface-variant);
      font: var(--md-sys-typography-body-medium);
    }
  `;

  render() {
    return html`
      <div class="timer-page">
        ${timerStore.list.length === 0
          ? html`<p class="empty">
              No any timer.<br />
              Add one from the top-left button.
            </p>`
          : timerStore.list.map((t) => this.renderTimer(t))}
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
              @click=${this.#onAddClick}
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

  #onAddClick = (): void => {
    this.dispatchEvent(
      new Event("request-open-timer-dialog", { bubbles: true, composed: true }),
    );
  };
}

customElements.define("timer-view", TimerView);
