import {
  generateFireflies,
  generateLeaves,
  createKonamiMatcher,
} from "../../core/utils";
import { COMPASS_SVG, LEAF_SVG, FOX_SVG, MOTH_SVG } from "../../core/assets";

export interface Forest404Options {
  title?: string;
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  coordinates?: string;
  fireflyCount?: number;
  leafCount?: number;
  showTreeline?: boolean;
  showNote?: string | boolean;
}

const BLOOM_WORD = "MOSS";
const DEFAULT_NOTE =
  "“The map said this trail looped — it doesn't. Mark waypoint 404 and turn back before dusk.”\n— Field journal, 1958";

const DEFAULT_OPTIONS: Required<Omit<Forest404Options, "showNote">> & {
  showNote: string | boolean;
} = {
  title: "404",
  eyebrow: "Trail uncharted",
  headline: "The path forks here.",
  subtitle:
    "You've wandered off the map. The grove is quiet, the moss is patient — find your bearings and head back.",
  buttonText: "Find your bearings",
  onButtonClick: () => {
    window.location.href = "/";
  },
  coordinates: "47°23′N · 122°02′W",
  fireflyCount: 22,
  leafCount: 14,
  showTreeline: true,
  showNote: true,
};

function createDiv(className: string, ariaHidden = false): HTMLDivElement {
  const el = document.createElement("div");
  el.className = className;
  if (ariaHidden) el.setAttribute("aria-hidden", "true");
  return el;
}

function createSpan(className?: string, text?: string): HTMLSpanElement {
  const el = document.createElement("span");
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function applyStyleVars(el: HTMLElement, styles: Record<string, string>): void {
  for (const [key, value] of Object.entries(styles)) {
    el.style.setProperty(key, value);
  }
}

/**
 * Forest404 — Vanilla JS implementation.
 *
 * @example
 * ```js
 * import { createForest404 } from '@kripa006/404-ui/vanilla';
 *
 * const instance = createForest404(document.getElementById('app'));
 * // ...later:
 * instance.destroy();
 * ```
 */
export function createForest404(
  container: HTMLElement,
  options: Forest404Options = {}
): { destroy: () => void } {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const wrapper = document.createElement("div");
  wrapper.className = "forest-404-container";
  wrapper.setAttribute("role", "main");
  wrapper.setAttribute("aria-label", "404 Error Page — Forest");
  wrapper.dataset.bloom = "false";

  if (config.showTreeline) {
    wrapper.appendChild(
      createDiv("forest-404-treeline forest-404-treeline--left", true)
    );
    wrapper.appendChild(
      createDiv("forest-404-treeline forest-404-treeline--right", true)
    );
  }

  wrapper.appendChild(createDiv("forest-404-fog", true));
  wrapper.appendChild(createDiv("forest-404-vignette", true));

  // Firefly field
  const fireflyField = createDiv("forest-404-firefly-field", true);
  const fireflies = generateFireflies(config.fireflyCount);
  const fireflyCleanups: Array<() => void> = [];
  fireflies.forEach((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "forest-404-firefly";
    btn.setAttribute("aria-hidden", "true");
    btn.tabIndex = -1;
    btn.dataset.burst = "false";
    applyStyleVars(btn, f.styles);
    const onClick = () => {
      if (btn.dataset.burst === "true") return;
      btn.dataset.burst = "true";
      window.setTimeout(() => {
        btn.dataset.burst = "false";
      }, 700);
    };
    btn.addEventListener("click", onClick);
    fireflyCleanups.push(() => btn.removeEventListener("click", onClick));
    fireflyField.appendChild(btn);
  });
  wrapper.appendChild(fireflyField);

  // Leaf field
  const leafField = createDiv("forest-404-leaf-field", true);
  const leaves = generateLeaves(config.leafCount);
  leaves.forEach((l) => {
    const span = document.createElement("span");
    span.className = "forest-404-leaf";
    applyStyleVars(span, l.styles);
    span.innerHTML = LEAF_SVG;
    leafField.appendChild(span);
  });
  wrapper.appendChild(leafField);

  // Trail HUD
  const statusbar = createDiv("forest-404-statusbar", true);
  statusbar.appendChild(
    createSpan("forest-404-trailmark", "Waypoint 404 · Lost")
  );

  const latMeta = createSpan("forest-404-status-meta--hide-sm");
  latMeta.appendChild(createSpan("forest-404-status-key", "Lat/Lon"));
  latMeta.appendChild(document.createTextNode(" "));
  latMeta.appendChild(createSpan("forest-404-status-val", config.coordinates));
  statusbar.appendChild(latMeta);

  statusbar.appendChild(createSpan("forest-404-status-spacer"));

  const altMeta = document.createElement("span");
  altMeta.appendChild(createSpan("forest-404-status-key", "Alt"));
  altMeta.appendChild(document.createTextNode(" "));
  const altVal = createSpan("forest-404-status-val", "312m");
  altMeta.appendChild(altVal);
  statusbar.appendChild(altMeta);

  const windMeta = createSpan("forest-404-status-meta--hide-sm");
  windMeta.appendChild(createSpan("forest-404-status-key", "Wind"));
  windMeta.appendChild(document.createTextNode(" "));
  windMeta.appendChild(createSpan("forest-404-status-val", "ESE 4kt"));
  statusbar.appendChild(windMeta);

  wrapper.appendChild(statusbar);

  // Marginalia note
  if (config.showNote !== false) {
    const note = document.createElement("aside");
    note.className = "forest-404-note";
    note.setAttribute("aria-hidden", "true");
    note.textContent =
      typeof config.showNote === "string" ? config.showNote : DEFAULT_NOTE;
    wrapper.appendChild(note);
  }

  // Center stage
  const stage = createDiv("forest-404-stage");

  const compass = createDiv("forest-404-compass", true);
  compass.innerHTML = COMPASS_SVG;
  stage.appendChild(compass);

  stage.appendChild(createSpan("forest-404-eyebrow", config.eyebrow));

  const titleWrap = createDiv("forest-404-title-wrap");
  const titleShadow = createSpan("forest-404-title-shadow", config.title);
  titleShadow.setAttribute("aria-hidden", "true");
  titleWrap.appendChild(titleShadow);
  const titleEl = document.createElement("h1");
  titleEl.className = "forest-404-title";
  titleEl.textContent = config.title;
  titleWrap.appendChild(titleEl);
  stage.appendChild(titleWrap);

  const headline = document.createElement("p");
  headline.className = "forest-404-headline";
  headline.textContent = config.headline;
  stage.appendChild(headline);

  const subtitle = document.createElement("p");
  subtitle.className = "forest-404-subtitle";
  subtitle.textContent = config.subtitle;
  stage.appendChild(subtitle);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "forest-404-button";
  button.setAttribute("aria-label", config.buttonText);
  const arrow = createSpan("forest-404-button-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  button.appendChild(arrow);
  button.appendChild(document.createTextNode(config.buttonText));
  button.addEventListener("click", config.onButtonClick);
  stage.appendChild(button);

  wrapper.appendChild(stage);

  // Footer
  const footer = createDiv("forest-404-footer", true);
  footer.appendChild(createSpan("forest-404-footer-warn", "SIGNAL · WEAK"));
  footer.appendChild(createSpan(undefined, "·"));
  footer.appendChild(createSpan(undefined, "Last fix 02:14 ago"));
  footer.appendChild(createSpan("forest-404-status-spacer"));
  footer.appendChild(
    createSpan("forest-404-status-meta--hide-sm", "try ↑↑↓↓ · type MOSS")
  );
  wrapper.appendChild(footer);

  container.appendChild(wrapper);

  // Easter eggs + altimeter drift
  let buffer = "";
  const konami = createKonamiMatcher();
  let bloomTimeout: number | null = null;
  let idleTimeout: number | null = null;
  let altInterval: number | null = null;

  const onKey = (e: KeyboardEvent) => {
    if (e.key.length === 1) {
      buffer = (buffer + e.key.toUpperCase()).slice(-BLOOM_WORD.length);
      if (buffer === BLOOM_WORD) {
        buffer = "";
        wrapper.dataset.bloom = "true";
        if (bloomTimeout) window.clearTimeout(bloomTimeout);
        bloomTimeout = window.setTimeout(() => {
          wrapper.dataset.bloom = "false";
        }, 5000);
      }
    }
    if (konami(e.key)) {
      const existing = wrapper.querySelector(".forest-404-fox");
      if (existing) existing.remove();
      const fox = createDiv("forest-404-fox", true);
      fox.innerHTML = FOX_SVG;
      wrapper.appendChild(fox);
      window.setTimeout(() => {
        if (fox.parentNode === wrapper) wrapper.removeChild(fox);
      }, 11500);
    }
  };
  window.addEventListener("keydown", onKey);

  const idleEvents: Array<keyof WindowEventMap> = [
    "mousemove",
    "keydown",
    "click",
    "touchstart",
    "scroll",
  ];
  const resetIdle = () => {
    if (idleTimeout) window.clearTimeout(idleTimeout);
    idleTimeout = window.setTimeout(() => {
      const moth = createDiv("forest-404-moth", true);
      moth.innerHTML = MOTH_SVG;
      wrapper.appendChild(moth);
      window.setTimeout(() => {
        if (moth.parentNode === wrapper) wrapper.removeChild(moth);
      }, 14500);
    }, 18000);
  };
  idleEvents.forEach((ev) => window.addEventListener(ev, resetIdle));
  resetIdle();

  let altitude = 312;
  altInterval = window.setInterval(() => {
    const drift = Math.random() < 0.5 ? -1 : 1;
    altitude += drift;
    if (altitude < 280) altitude = 281;
    if (altitude > 340) altitude = 339;
    altVal.textContent = `${altitude}m`;
  }, 1100);

  return {
    destroy: () => {
      window.removeEventListener("keydown", onKey);
      idleEvents.forEach((ev) => window.removeEventListener(ev, resetIdle));
      if (bloomTimeout) window.clearTimeout(bloomTimeout);
      if (idleTimeout) window.clearTimeout(idleTimeout);
      if (altInterval) window.clearInterval(altInterval);
      fireflyCleanups.forEach((fn) => fn());
      button.removeEventListener("click", config.onButtonClick);
      if (wrapper.parentNode === container) {
        container.removeChild(wrapper);
      }
    },
  };
}

/**
 * Web Component: <forest-404 title="404" subtitle="..."></forest-404>
 *
 * `HTMLElement` is undefined in Node; using a dummy fallback keeps the bare
 * `import` SSR-safe. Only browsers ever instantiate the class via
 * `customElements.define` below.
 */
const SafeHTMLElement: typeof HTMLElement =
  typeof HTMLElement !== "undefined"
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

export class Forest404Element extends SafeHTMLElement {
  private _cleanup: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return [
      "title",
      "eyebrow",
      "headline",
      "subtitle",
      "button-text",
      "coordinates",
      "firefly-count",
      "leaf-count",
      "show-treeline",
      "show-note",
    ];
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  private render(): void {
    if (this._cleanup) this._cleanup();

    const fireflyAttr = this.getAttribute("firefly-count");
    const leafAttr = this.getAttribute("leaf-count");
    const noteAttr = this.getAttribute("show-note");

    const options: Forest404Options = {
      title: this.getAttribute("title") ?? undefined,
      eyebrow: this.getAttribute("eyebrow") ?? undefined,
      headline: this.getAttribute("headline") ?? undefined,
      subtitle: this.getAttribute("subtitle") ?? undefined,
      buttonText: this.getAttribute("button-text") ?? undefined,
      coordinates: this.getAttribute("coordinates") ?? undefined,
      fireflyCount: fireflyAttr ? parseInt(fireflyAttr, 10) : undefined,
      leafCount: leafAttr ? parseInt(leafAttr, 10) : undefined,
      showTreeline: this.hasAttribute("show-treeline")
        ? this.getAttribute("show-treeline") !== "false"
        : undefined,
      showNote:
        noteAttr === null
          ? undefined
          : noteAttr === "false"
            ? false
            : noteAttr === "true"
              ? true
              : noteAttr,
      onButtonClick: () => {
        this.dispatchEvent(new CustomEvent("button-click", { bubbles: true }));
      },
    };

    const instance = createForest404(this, options);
    this._cleanup = instance.destroy;
  }
}

if (typeof window !== "undefined" && !customElements.get("forest-404")) {
  customElements.define("forest-404", Forest404Element);
}

export default createForest404;
