import { createKonamiMatcher } from "../../core/utils";

export interface Glitch404Options {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title */
  eyebrow?: string;
  /** Big secondary line under the 404 */
  headline?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Channel id displayed in the broadcast HUD (default: "04") */
  channelId?: string;
  /** Whether to show the corner "NO SIGNAL" callout (default: true) */
  showNoSignal?: boolean;
}

const DEFAULT_OPTIONS: Required<Glitch404Options> = {
  title: "404",
  eyebrow: "Transmission interrupted",
  headline: "Page corrupted",
  subtitle: "The signal carrying this page has been lost in transit. Retune.",
  buttonText: "Retune",
  onButtonClick: () => {
    window.location.href = "/";
  },
  channelId: "04",
  showNoSignal: true,
};

const MELTDOWN_WORD = "GLITCH";

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

function randomTimecode(): string {
  if (Math.random() < 0.18) return "88:88:88";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(Math.floor(Math.random() * 24))}:${pad(
    Math.floor(Math.random() * 60)
  )}:${pad(Math.floor(Math.random() * 60))}`;
}

/**
 * Glitch404 — Vanilla JS implementation.
 *
 * @example
 * ```js
 * import { createGlitch404 } from '@kripa006/404-ui/vanilla';
 *
 * const instance = createGlitch404(document.getElementById('app'));
 * // ...later:
 * instance.destroy();
 * ```
 */
export function createGlitch404(
  container: HTMLElement,
  options: Glitch404Options = {}
): { destroy: () => void } {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const wrapper = document.createElement("div");
  wrapper.className = "glitch-404-container";
  wrapper.setAttribute("role", "main");
  wrapper.setAttribute("aria-label", "404 Error Page — Glitch");
  wrapper.dataset.meltdown = "false";
  wrapper.dataset.channel = "main";

  // Background layers
  const staticLayer = createDiv("glitch-404-static", true);
  wrapper.appendChild(staticLayer);
  wrapper.appendChild(createDiv("glitch-404-scanlines", true));
  wrapper.appendChild(createDiv("glitch-404-syncbar", true));
  wrapper.appendChild(createDiv("glitch-404-vignette", true));

  // Top HUD
  const hud = createDiv("glitch-404-hud", true);
  const rec = createSpan("glitch-404-rec");
  rec.appendChild(createSpan("glitch-404-rec-dot"));
  rec.appendChild(document.createTextNode("REC"));
  hud.appendChild(rec);

  const chMeta = createSpan("glitch-404-hud-meta--hide-sm");
  chMeta.appendChild(createSpan("glitch-404-hud-key", "CH"));
  chMeta.appendChild(document.createTextNode(" "));
  const chVal = createSpan("glitch-404-hud-val", config.channelId);
  chMeta.appendChild(chVal);
  hud.appendChild(chMeta);

  const feedMeta = createSpan("glitch-404-hud-meta--hide-sm");
  feedMeta.appendChild(createSpan("glitch-404-hud-key", "FEED"));
  feedMeta.appendChild(document.createTextNode(" "));
  const feedVal = createSpan("glitch-404-hud-val", "PUBLIC-1");
  feedMeta.appendChild(feedVal);
  hud.appendChild(feedMeta);

  hud.appendChild(createSpan("glitch-404-hud-spacer"));

  const txMeta = document.createElement("span");
  txMeta.appendChild(createSpan("glitch-404-hud-key", "TX"));
  txMeta.appendChild(document.createTextNode(" "));
  txMeta.appendChild(createSpan("glitch-404-hud-val", "OFFLINE"));
  hud.appendChild(txMeta);

  const timecodeEl = createSpan("glitch-404-timecode", "88:88:88");
  hud.appendChild(timecodeEl);
  wrapper.appendChild(hud);

  // No-signal callout
  if (config.showNoSignal) {
    const noSignal = createDiv("glitch-404-nosignal", true);
    noSignal.textContent = "NO SIGNAL";
    wrapper.appendChild(noSignal);
  }

  // Center stage
  const stage = createDiv("glitch-404-stage");

  const eyebrow = createSpan("glitch-404-eyebrow", config.eyebrow);
  stage.appendChild(eyebrow);

  const titleWrap = createDiv("glitch-404-title-wrap");
  const titleEl = document.createElement("h1");
  titleEl.className = "glitch-404-title";
  titleEl.dataset.text = config.title;
  titleEl.textContent = config.title;
  titleWrap.appendChild(titleEl);

  const sliceA = createSpan(
    "glitch-404-title-slice glitch-404-title-slice--a",
    config.title
  );
  sliceA.setAttribute("aria-hidden", "true");
  titleWrap.appendChild(sliceA);
  const sliceB = createSpan(
    "glitch-404-title-slice glitch-404-title-slice--b",
    config.title
  );
  sliceB.setAttribute("aria-hidden", "true");
  titleWrap.appendChild(sliceB);
  stage.appendChild(titleWrap);

  const headline = document.createElement("p");
  headline.className = "glitch-404-headline";
  headline.textContent = config.headline;
  stage.appendChild(headline);

  const subtitle = document.createElement("p");
  subtitle.className = "glitch-404-subtitle";
  subtitle.appendChild(document.createTextNode(config.subtitle));
  const cursor = createSpan("glitch-404-cursor");
  cursor.setAttribute("aria-hidden", "true");
  subtitle.appendChild(cursor);
  stage.appendChild(subtitle);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "glitch-404-button";
  button.setAttribute("aria-label", config.buttonText);
  const arrow = createSpan("glitch-404-button-arrow", "▶");
  arrow.setAttribute("aria-hidden", "true");
  button.appendChild(arrow);
  button.appendChild(document.createTextNode(config.buttonText));
  button.addEventListener("click", config.onButtonClick);
  stage.appendChild(button);

  wrapper.appendChild(stage);

  // Bottom telemetry
  const footer = createDiv("glitch-404-footer", true);
  footer.appendChild(createSpan("glitch-404-footer-warn", "ERR · 0x404"));
  footer.appendChild(createSpan(undefined, "·"));
  footer.appendChild(createSpan(undefined, "frame drop 88%"));
  footer.appendChild(createSpan("glitch-404-hud-spacer"));
  const hint = createSpan("glitch-404-hud-meta--hide-sm");
  hint.appendChild(document.createTextNode("try ⇧ · type "));
  hint.appendChild(createSpan("glitch-404-subtitle-mark", "GLITCH"));
  footer.appendChild(hint);
  wrapper.appendChild(footer);

  container.appendChild(wrapper);

  // Timecode flicker
  const timecodeInterval = window.setInterval(() => {
    timecodeEl.textContent = randomTimecode();
  }, 720);

  // Hold-to-intensify static
  const onPointerDown = () => {
    staticLayer.style.opacity = "1";
  };
  const onPointerUp = () => {
    staticLayer.style.opacity = "";
  };
  wrapper.addEventListener("mousedown", onPointerDown);
  wrapper.addEventListener("mouseup", onPointerUp);
  wrapper.addEventListener("mouseleave", onPointerUp);
  wrapper.addEventListener("touchstart", onPointerDown, { passive: true });
  wrapper.addEventListener("touchend", onPointerUp);

  // Easter eggs
  let buffer = "";
  let meltdownTimeout: number | null = null;
  let channelTimeout: number | null = null;
  const konami = createKonamiMatcher();
  const onKey = (e: KeyboardEvent) => {
    if (e.key.length === 1) {
      buffer = (buffer + e.key.toUpperCase()).slice(-MELTDOWN_WORD.length);
      if (buffer === MELTDOWN_WORD) {
        buffer = "";
        wrapper.dataset.meltdown = "true";
        if (meltdownTimeout) window.clearTimeout(meltdownTimeout);
        meltdownTimeout = window.setTimeout(() => {
          wrapper.dataset.meltdown = "false";
        }, 1600);
      }
    }
    if (konami(e.key)) {
      wrapper.dataset.channel = "alt";
      feedVal.textContent = "AUX-7";
      if (channelTimeout) window.clearTimeout(channelTimeout);
      channelTimeout = window.setTimeout(() => {
        wrapper.dataset.channel = "main";
        feedVal.textContent = "PUBLIC-1";
      }, 5000);
    }
  };
  window.addEventListener("keydown", onKey);

  return {
    destroy: () => {
      window.clearInterval(timecodeInterval);
      window.removeEventListener("keydown", onKey);
      if (meltdownTimeout) window.clearTimeout(meltdownTimeout);
      if (channelTimeout) window.clearTimeout(channelTimeout);
      wrapper.removeEventListener("mousedown", onPointerDown);
      wrapper.removeEventListener("mouseup", onPointerUp);
      wrapper.removeEventListener("mouseleave", onPointerUp);
      wrapper.removeEventListener("touchstart", onPointerDown);
      wrapper.removeEventListener("touchend", onPointerUp);
      button.removeEventListener("click", config.onButtonClick);
      if (wrapper.parentNode === container) {
        container.removeChild(wrapper);
      }
    },
  };
}

/**
 * Web Component wrapper: <glitch-404 title="404" subtitle="..."></glitch-404>
 *
 * `HTMLElement` is undefined in Node; using a dummy fallback keeps the bare
 * `import` SSR-safe. Only browsers ever instantiate the class via
 * `customElements.define` below.
 */
const SafeHTMLElement: typeof HTMLElement =
  typeof HTMLElement !== "undefined"
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

export class Glitch404Element extends SafeHTMLElement {
  private _cleanup: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return [
      "title",
      "eyebrow",
      "headline",
      "subtitle",
      "button-text",
      "channel-id",
      "show-no-signal",
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

    const options: Glitch404Options = {
      title: this.getAttribute("title") ?? undefined,
      eyebrow: this.getAttribute("eyebrow") ?? undefined,
      headline: this.getAttribute("headline") ?? undefined,
      subtitle: this.getAttribute("subtitle") ?? undefined,
      buttonText: this.getAttribute("button-text") ?? undefined,
      channelId: this.getAttribute("channel-id") ?? undefined,
      showNoSignal: this.hasAttribute("show-no-signal")
        ? this.getAttribute("show-no-signal") !== "false"
        : undefined,
      onButtonClick: () => {
        this.dispatchEvent(new CustomEvent("button-click", { bubbles: true }));
      },
    };

    const instance = createGlitch404(this, options);
    this._cleanup = instance.destroy;
  }
}

if (typeof window !== "undefined" && !customElements.get("glitch-404")) {
  customElements.define("glitch-404", Glitch404Element);
}

export default createGlitch404;
