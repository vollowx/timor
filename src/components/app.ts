import { LitElement, html, css } from "lit";

import { settings } from "../lib/settings.js";
import { timeSync } from "../lib/time-sync.js";
import { timerStore } from "../lib/timer-store.js";

import "iconify-icon";
import "@vollowx/seele/m3/navigation/navigation-rail.js";
import "@vollowx/seele/m3/navigation/navigation-rail-item.js";
import "@vollowx/seele/m3/fab/fab.js";

import "./clock-view.js";
import "./stopwatch-view.js";
import "./timer-view.js";
import "./settings-view.js";

const NAV_ITEMS = [
  {
    page: "clock",
    label: "Clock",
    icon: "material-symbols:schedule-outline",
    activeIcon: "material-symbols:schedule",
  },
  {
    page: "stopwatch",
    label: "Stopwatch",
    icon: "material-symbols:timer-outline",
    activeIcon: "material-symbols:timer",
  },
  {
    page: "timer",
    label: "Timer",
    icon: "material-symbols:alarm-outline",
    activeIcon: "material-symbols:alarm",
  },
];

const PAGES: Record<string, () => unknown> = {
  stopwatch: () => html`<stopwatch-view></stopwatch-view>`,
  timer: () => html`<timer-view></timer-view>`,
  settings: () => html`<settings-view></settings-view>`,
};

export class TimorApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100dvh;
    }

    .layout {
      display: flex;
      height: 100dvh;
    }

    main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      background-color: var(--md-sys-color-surface-container);
    }

    .page {
      flex: 1;
      display: flex;
      background-color: var(--md-sys-color-background);
      border-radius: 28px;
      margin-block: 16px;
      margin-inline-end: 16px;
      overflow: hidden;
    }

    ::view-transition-old(*) {
      animation: vt-out 500ms linear forwards;
    }

    ::view-transition-new(*) {
      animation: vt-in 500ms linear;
    }

    @keyframes vt-out {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      5% {
        opacity: 1;
        transform: translateY(-0.7px);
      }
      10% {
        opacity: 1;
        transform: translateY(-2.9px);
      }
      15% {
        opacity: 1;
        transform: translateY(-8.4px);
      }
      20% {
        opacity: 0;
        transform: translateY(-19.3px);
      }
      100% {
        opacity: 0;
        transform: translateY(-30px);
      }
    }

    @keyframes vt-in {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      5% {
        opacity: 0;
        transform: translateY(29.3px);
      }
      10% {
        opacity: 0;
        transform: translateY(27.1px);
      }
      15% {
        opacity: 0;
        transform: translateY(21.6px);
      }
      20% {
        opacity: 0.837;
        transform: translateY(10.7px);
      }
      25% {
        opacity: 1;
        transform: translateY(6.7px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  static properties = {
    page: { type: String, state: true },
  };

  declare page: string;

  render() {
    return html`
      <div class="layout">
        <md-nav-rail @click=${this.#onNavClick}>
          <md-fab
            slot="fab"
            aria-label="Add timer"
            color="primary-container"
            @click=${this.#onFabClick}
          >
            <iconify-icon icon="material-symbols:add"></iconify-icon>
          </md-fab>

          ${NAV_ITEMS.map(
            (item) => html`
              <md-nav-rail-item
                label=${item.label}
                data-page=${item.page}
                ?active=${this.page === item.page}
              >
                <iconify-icon icon=${item.icon}></iconify-icon>
                <iconify-icon
                  slot="active"
                  icon=${item.activeIcon}
                ></iconify-icon>
              </md-nav-rail-item>
            `,
          )}

          <md-nav-rail-item
            label="Settings"
            data-page="settings"
            ?active=${this.page === "settings"}
            end
          >
            <iconify-icon
              icon="material-symbols:settings-outline"
            ></iconify-icon>
            <iconify-icon
              slot="active"
              icon="material-symbols:settings"
            ></iconify-icon>
          </md-nav-rail-item>
        </md-nav-rail>

        <main>
          <div class="page">${this.renderPage(this.page)}</div>
        </main>
      </div>
    `;
  }

  renderPage(page: string) {
    return (PAGES[page] ?? (() => html`<clock-view></clock-view>`))();
  }

  constructor() {
    super();
    this.page = "clock";
  }

  connectedCallback(): void {
    super.connectedCallback();
    settings.addEventListener("change", this.#onSettingsChange);
    timerStore.addEventListener("change", this.#onTimerChange);
    this.#applyTheme();
    timeSync.start();
    this.#updateTitle();
  }

  disconnectedCallback(): void {
    settings.removeEventListener("change", this.#onSettingsChange);
    timerStore.removeEventListener("change", this.#onTimerChange);
    timeSync.stop();
    super.disconnectedCallback();
  }

  readonly #onSettingsChange = (): void => {
    this.#applyTheme();
    this.requestUpdate();
  };

  readonly #onTimerChange = (): void => this.#updateTitle();

  #updateTitle(): void {
    const suffix = timerStore.titleSuffix;
    document.title = suffix ? `${suffix} - Timor` : "Timor";
  }

  #applyTheme(): void {
    const theme = settings.theme;
    document.documentElement.dataset.mdColorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", theme === "dark" ? "#11140e" : "#f8faf0");
  }

  #onNavClick(e: Event): void {
    const item = (e.target as HTMLElement).closest(
      "md-nav-rail-item",
    ) as HTMLElement | null;
    const page = item?.dataset.page;
    if (page) void this.#switchPage(page);
  }

  #onFabClick(): void {
    void this.#switchPage("timer").then(() => {
      const view = this.shadowRoot?.querySelector("timer-view") as {
        openSetup: () => void;
      } | null;
      view?.openSetup();
    });
  }

  async #switchPage(page: string): Promise<void> {
    if (page === this.page) return;
    const el = this.shadowRoot?.querySelector(".page") as HTMLElement & {
      startViewTransition?: (cb: () => Promise<void>) => { ready: Promise<void> };
    };
    if (!el?.startViewTransition) {
      this.page = page;
      return;
    }
    try {
      const t = el.startViewTransition(async () => {
        this.page = page;
        await this.updateComplete;
      });
      await t.ready;
    } catch {}
  }
}

customElements.define("timor-app", TimorApp);
