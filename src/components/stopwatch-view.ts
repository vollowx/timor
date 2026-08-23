import { LitElement, html, css } from "lit";

import { formatStopwatch, formatDuration } from "../lib/format.js";
import { stopwatchStore } from "../lib/stopwatch-store.js";

import "iconify-icon";
import "@vollowx/seele/m3/button-group/standard-button-group.js";
import "@vollowx/seele/m3/button/icon-button.js";
import "@vollowx/seele/m3/button/icon-button-toggle.js";
import "@vollowx/seele/m3/tooltip/tooltip.js";
import "@vollowx/seele/m3/list/list.js";
import "@vollowx/seele/m3/list/list-item.js";

export class StopwatchView extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .stopwatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 320px;
    }

    .display {
      font: var(--md-sys-typography-display-large);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.02em;
      padding-block-end: 24px;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .laps,
    .empty {
      width: 360px;
      height: 320px;
      overflow: auto;
    }

    .laps md-list-item {
      --md-list-item-label-text-color: var(--md-sys-color-on-surface);
    }

    .split {
      font-variant-numeric: tabular-nums;
      font-weight: 500;
    }

    .empty {
      color: var(--md-sys-color-on-surface-variant);
      font: var(--md-sys-typography-body-large);
    }
  `;

  render() {
    const running = stopwatchStore.isRunning;
    const laps = stopwatchStore.lapList;

    return html`
      <div class="stopwatch">
        <div class="display">${formatStopwatch(stopwatchStore.elapsed)}</div>

        <md-button-group class="controls">
          <md-icon-button
            id="lap"
            variant="tonal"
            size="l"
            width="narrow"
            ?disabled=${!running}
            @click=${() => stopwatchStore.lap()}
          >
            <iconify-icon icon="material-symbols:flag"></iconify-icon>
          </md-icon-button>

          <md-icon-button-toggle
            id="start-pause"
            variant="filled"
            size="l"
            width="wide"
            .checked=${!running}
            aria-label="Start or pause"
            @change=${() => stopwatchStore.toggle()}
          >
            <iconify-icon
              slot="checked"
              icon="material-symbols:play-arrow"
            ></iconify-icon>
            <iconify-icon icon="material-symbols:pause"></iconify-icon>
          </md-icon-button-toggle>

          <md-icon-button
            id="reset"
            variant="outlined"
            size="l"
            ?disabled=${!stopwatchStore.elapsed}
            @click=${() => stopwatchStore.reset()}
          >
            <iconify-icon icon="material-symbols:restart-alt"></iconify-icon>
          </md-icon-button>
        </md-button-group>

        <md-tooltip align="bottom" for="lap">Lap</md-tooltip>
        <md-tooltip align="bottom" for="start-pause">
          ${running ? "Pause" : stopwatchStore.elapsed ? "Resume" : "Start"}
        </md-tooltip>
        <md-tooltip align="bottom" for="reset">Reset</md-tooltip>
      </div>

      ${laps.length > 0
        ? html`
            <md-list class="laps">
              ${laps.map(
                (lap) => html`
                  <md-list-item>
                    <span slot="overline">Lap ${lap.n}</span>
                    <span slot="supporting-text">
                      Total ${formatDuration(lap.total)}
                    </span>
                    <span class="split" slot="end"
                      >${formatStopwatch(lap.split)}</span
                    >
                  </md-list-item>
                `,
              )}
            </md-list>
          `
        : html`<p class="empty">Laps will appear here.</p>`}
    `;
  }

  readonly #onChange = (): void => this.requestUpdate();

  connectedCallback(): void {
    super.connectedCallback();
    stopwatchStore.addEventListener("change", this.#onChange);
  }

  disconnectedCallback(): void {
    stopwatchStore.removeEventListener("change", this.#onChange);
    super.disconnectedCallback();
  }
}

customElements.define("stopwatch-view", StopwatchView);
