import { generateBubbles, createKonamiMatcher } from "../../core/utils";
import { JELLYFISH_SVG, SUBMARINE_SVG, ANGLER_SVG } from "../../core/assets";

export interface Ocean404Options {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title */
  eyebrow?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Number of rising bubbles (default: 28) */
  bubbleCount?: number;
  /** Whether to render the drifting jellyfish (default: true) */
  showJellyfish?: boolean;
}

const DEFAULT_OPTIONS: Required<Ocean404Options> = {
  title: "404",
  eyebrow: "Signal lost · 11,034m",
  subtitle: "You've drifted too deep. The surface is waiting.",
  buttonText: "Return to surface",
  onButtonClick: () => {
    window.location.href = "/";
  },
  bubbleCount: 28,
  showJellyfish: true,
};

function applyCssVars(el: HTMLElement, vars: Record<string, string>): void {
  Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
}

/**
 * Ocean404 — Vanilla JS implementation.
 *
 * @example
 * ```js
 * import { createOcean404 } from '@kripa006/404-ui/vanilla';
 *
 * const instance = createOcean404(document.getElementById('app'));
 * // ...later:
 * instance.destroy();
 * ```
 */
export function createOcean404(
  container: HTMLElement,
  options: Ocean404Options = {}
): { destroy: () => void } {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const wrapper = document.createElement("div");
  wrapper.className = "ocean-404-container";
  wrapper.setAttribute("role", "main");
  wrapper.setAttribute("aria-label", "404 Error Page — Ocean");

  const caustics = document.createElement("div");
  caustics.className = "ocean-404-caustics";
  caustics.setAttribute("aria-hidden", "true");
  wrapper.appendChild(caustics);

  const vignette = document.createElement("div");
  vignette.className = "ocean-404-vignette";
  vignette.setAttribute("aria-hidden", "true");
  wrapper.appendChild(vignette);

  // Depth HUD
  const depthEl = document.createElement("div");
  depthEl.className = "ocean-404-depth";
  depthEl.setAttribute("aria-hidden", "true");
  const depthValue = document.createElement("span");
  depthValue.className = "ocean-404-depth-value";
  depthValue.textContent = "00000m";
  depthEl.appendChild(document.createTextNode("Depth "));
  depthEl.appendChild(depthValue);
  wrapper.appendChild(depthEl);

  const coords = document.createElement("div");
  coords.className = "ocean-404-coords";
  coords.setAttribute("aria-hidden", "true");
  coords.textContent = "40°04′04″N · 179°59′59″W";
  wrapper.appendChild(coords);

  // Bubble field
  const bubbleField = document.createElement("div");
  bubbleField.className = "ocean-404-bubble-field";
  bubbleField.setAttribute("aria-hidden", "true");
  const bubbleListeners: Array<() => void> = [];
  generateBubbles(config.bubbleCount).forEach((b) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ocean-404-bubble";
    btn.setAttribute("aria-hidden", "true");
    btn.tabIndex = -1;
    btn.dataset.popped = "false";
    applyCssVars(btn, b.styles);
    const onClick = () => {
      if (btn.dataset.popped === "true") return;
      btn.dataset.popped = "true";
      window.setTimeout(() => {
        btn.dataset.popped = "false";
      }, 600);
    };
    btn.addEventListener("click", onClick);
    bubbleListeners.push(() => btn.removeEventListener("click", onClick));
    bubbleField.appendChild(btn);
  });
  wrapper.appendChild(bubbleField);

  // Jellyfish
  if (config.showJellyfish) {
    for (let i = 0; i < 2; i += 1) {
      const jelly = document.createElement("div");
      jelly.className = "ocean-404-jellyfish";
      jelly.setAttribute("aria-hidden", "true");
      const size = 80 + Math.random() * 80;
      applyCssVars(jelly, {
        "--jelly-size": `${size}px`,
        "--jelly-x": `${10 + Math.random() * 80}%`,
        "--jelly-y": `${15 + Math.random() * 60}%`,
        "--jelly-duration": `${4.5 + Math.random() * 3}s`,
        "--jelly-delay": `${Math.random() * 3}s`,
      });
      jelly.innerHTML = JELLYFISH_SVG;
      wrapper.appendChild(jelly);
    }
  }

  // Content
  const content = document.createElement("div");
  content.className = "ocean-404-content";

  const sonar = document.createElement("div");
  sonar.className = "ocean-404-sonar";
  sonar.setAttribute("aria-hidden", "true");

  const eyebrow = document.createElement("span");
  eyebrow.className = "ocean-404-eyebrow";
  eyebrow.textContent = config.eyebrow;

  const title = document.createElement("h1");
  title.className = "ocean-404-title";
  title.textContent = config.title;

  const subtitle = document.createElement("p");
  subtitle.className = "ocean-404-subtitle";
  subtitle.textContent = config.subtitle;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "ocean-404-button";
  button.setAttribute("aria-label", config.buttonText);
  button.innerHTML = `<span aria-hidden="true">↑</span>${config.buttonText}`;
  button.addEventListener("click", config.onButtonClick);

  content.appendChild(sonar);
  content.appendChild(eyebrow);
  content.appendChild(title);
  content.appendChild(subtitle);
  content.appendChild(button);
  wrapper.appendChild(content);

  container.appendChild(wrapper);

  // Depth counter
  let depth = 0;
  const depthInterval = window.setInterval(() => {
    depth = (depth + 1) % 11035;
    const display = depth > 11000 ? 11034 : depth;
    depthValue.textContent = `${display.toString().padStart(5, "0")}m`;
  }, 180);

  // Konami — summon a submarine
  const konamiMatch = createKonamiMatcher();
  function onKeydown(e: KeyboardEvent) {
    if (konamiMatch(e.key)) summonSubmarine();
  }
  function summonSubmarine() {
    const sub = document.createElement("div");
    sub.className = "ocean-404-submarine";
    sub.setAttribute("aria-hidden", "true");
    sub.innerHTML = SUBMARINE_SVG;
    wrapper.appendChild(sub);
    sub.addEventListener("animationend", () => sub.remove(), { once: true });
  }
  window.addEventListener("keydown", onKeydown);

  // Idle anglerfish
  let idleTimeout: number | null = null;
  function spawnAngler() {
    const angler = document.createElement("div");
    angler.className = "ocean-404-angler";
    angler.setAttribute("aria-hidden", "true");
    angler.innerHTML = ANGLER_SVG;
    wrapper.appendChild(angler);
    angler.addEventListener("animationend", () => angler.remove(), {
      once: true,
    });
  }
  function resetIdle() {
    if (idleTimeout) window.clearTimeout(idleTimeout);
    idleTimeout = window.setTimeout(spawnAngler, 18000);
  }
  const idleEvents: Array<keyof WindowEventMap> = [
    "mousemove",
    "keydown",
    "click",
    "touchstart",
    "scroll",
  ];
  idleEvents.forEach((ev) => window.addEventListener(ev, resetIdle));
  resetIdle();

  return {
    destroy: () => {
      window.clearInterval(depthInterval);
      window.removeEventListener("keydown", onKeydown);
      if (idleTimeout) window.clearTimeout(idleTimeout);
      idleEvents.forEach((ev) => window.removeEventListener(ev, resetIdle));
      bubbleListeners.forEach((off) => off());
      button.removeEventListener("click", config.onButtonClick);
      if (wrapper.parentNode === container) {
        container.removeChild(wrapper);
      }
    },
  };
}

/**
 * Web Component wrapper: <ocean-404 title="404" subtitle="..."></ocean-404>
 *
 * `HTMLElement` is undefined in Node; using a dummy fallback keeps the bare
 * `import` SSR-safe. Only browsers ever instantiate the class via
 * `customElements.define` below.
 */
const SafeHTMLElement: typeof HTMLElement =
  typeof HTMLElement !== "undefined"
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

export class Ocean404Element extends SafeHTMLElement {
  private _cleanup: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return [
      "title",
      "eyebrow",
      "subtitle",
      "button-text",
      "bubble-count",
      "show-jellyfish",
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

    const options: Ocean404Options = {
      title: this.getAttribute("title") ?? undefined,
      eyebrow: this.getAttribute("eyebrow") ?? undefined,
      subtitle: this.getAttribute("subtitle") ?? undefined,
      buttonText: this.getAttribute("button-text") ?? undefined,
      bubbleCount: this.hasAttribute("bubble-count")
        ? parseInt(this.getAttribute("bubble-count")!, 10)
        : undefined,
      showJellyfish: this.hasAttribute("show-jellyfish")
        ? this.getAttribute("show-jellyfish") !== "false"
        : undefined,
      onButtonClick: () => {
        this.dispatchEvent(new CustomEvent("button-click", { bubbles: true }));
      },
    };

    const instance = createOcean404(this, options);
    this._cleanup = instance.destroy;
  }
}

if (typeof window !== "undefined" && !customElements.get("ocean-404")) {
  customElements.define("ocean-404", Ocean404Element);
}

export default createOcean404;
