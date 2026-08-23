import "@lit-labs/ssr/lib/render-with-global-dom-shim.js";
import { render } from "@lit-labs/ssr";
import { html } from "lit";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import "./components/app.js";

export function renderApp(): Promise<string> {
  return collectResult(render(html`<timor-app></timor-app>`));
}
