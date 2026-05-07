import { ORBIT_SVG, ROCKET_SVG } from "../../core/assets";

export interface Space404Options {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title */
  eyebrow?: string;
  /** Headline shown below the title */
  headline?: string;
  /** Longer subtitle / copy */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Mission identifier shown in the status bar */
  missionId?: string;
  /** Whether to render the orbital diagnostic */
  showOrbit?: boolean;
}

const DEFAULT_OPTIONS: Required<Space404Options> = {
  title: "404",
  eyebrow: "SIGNAL LOST · UPLINK DEGRADED",
  headline: "OFF-NOMINAL TRAJECTORY DETECTED",
  subtitle:
    "The page you requested has drifted outside the nominal envelope. Re-establishing uplink with base.",
  buttonText: "RE-VECTOR TO BASE",
  onButtonClick: () => {
    window.location.href = "/";
  },
  missionId: "APOLLO · LM-404",
  showOrbit: true,
};

const TRANSMISSION_LINES = [
  "SIGNAL LOST // COORDINATES UNKNOWN // REQUESTING RE-VECTOR",
  "TELEMETRY DRIFT DETECTED // TRAJECTORY DEVIATION Δ 0.404 RAD",
  "ATTEMPTING UPLINK // CHECK HANDOVER TO RECOVERY",
  "REROUTING THROUGH DEEP SPACE NETWORK // PLEASE STAND BY",
];

const IDLE_LOG = "> PRIVATE LOG: see you on the pad.";

/**
 * Space404 — Vanilla JS implementation.
 *
 * @example
 * ```js
 * import { createSpace404 } from '@kripa006/404-ui/vanilla';
 *
 * const instance = createSpace404(document.getElementById('app'));
 * instance.destroy();
 * ```
 */
export function createSpace404(
  container: HTMLElement,
  options: Space404Options = {}
): { destroy: () => void } {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const wrapper = document.createElement("div");
  wrapper.className = "space-404-container";
  wrapper.dataset.intensify = "false";
  wrapper.setAttribute("role", "main");
  wrapper.setAttribute("aria-label", "404 Error Page — Mission Control");

  const scanlines = document.createElement("div");
  scanlines.className = "space-404-scanlines";
  scanlines.setAttribute("aria-hidden", "true");
  wrapper.appendChild(scanlines);

  // Status bar
  const statusbar = document.createElement("div");
  statusbar.className = "space-404-statusbar";
  statusbar.innerHTML = `
    <span class="space-404-led" aria-hidden="true"></span>
    <span class="space-404-statusbar-label"></span>
    <span class="space-404-spacer"></span>
    <span>FLT 04:0404</span>
    <span class="space-404-spacer"></span>
    <span class="space-404-warn">⚠ LINK FAULT</span>
  `;
  (
    statusbar.querySelector(".space-404-statusbar-label") as HTMLElement
  ).textContent = config.missionId;
  wrapper.appendChild(statusbar);

  // Stage
  const stage = document.createElement("div");
  stage.className = "space-404-stage";

  // Left rail
  const leftRail = document.createElement("aside");
  leftRail.className = "space-404-rail space-404-rail--left";
  leftRail.setAttribute("aria-hidden", "true");
  leftRail.innerHTML = `
    <div class="space-404-rail-heading">TRAJECTORY</div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">ALT</span><span class="space-404-rail-val" data-key="alt">--</span></div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">VEL</span><span class="space-404-rail-val" data-key="vel">--</span></div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">BRG</span><span class="space-404-rail-val" data-key="brg">--</span></div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">SIG</span><span class="space-404-rail-val" data-key="sig">--</span></div>
    <div class="space-404-rail-heading" style="margin-top:1rem">CHECKLIST</div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">S-IVB BURN</span><span class="space-404-rail-val">OK</span></div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">TLI</span><span class="space-404-rail-val">OK</span></div>
    <div class="space-404-rail-row"><span class="space-404-rail-key">ROUTE</span><span class="space-404-rail-val" style="color:#ff3d3d">FAIL</span></div>
  `;
  stage.appendChild(leftRail);

  // Center
  const content = document.createElement("div");
  content.className = "space-404-content";

  const eyebrow = document.createElement("span");
  eyebrow.className = "space-404-eyebrow";
  eyebrow.textContent = config.eyebrow;

  const title = document.createElement("h1");
  title.className = "space-404-title";
  title.dataset.text = config.title;
  title.textContent = config.title;

  const headline = document.createElement("p");
  headline.className = "space-404-headline";
  headline.textContent = config.headline;

  let craftButton: HTMLButtonElement | null = null;
  let orbitContainer: HTMLDivElement | null = null;
  if (config.showOrbit) {
    orbitContainer = document.createElement("div");
    orbitContainer.className = "space-404-orbit";
    orbitContainer.setAttribute("aria-hidden", "true");
    orbitContainer.innerHTML = `<div style="position:relative">${ORBIT_SVG}</div>`;
    craftButton = document.createElement("button");
    craftButton.type = "button";
    craftButton.setAttribute("aria-label", "Ping off-nominal spacecraft");
    craftButton.title = "Ping spacecraft";
    craftButton.style.cssText =
      "position:absolute; left:calc(60/320 * 60%); top:calc(144/180 * 100%); width:28px; height:28px; transform:translate(-50%,-50%); background:transparent; border:0; padding:0; cursor:pointer";
    (orbitContainer.firstElementChild as HTMLElement).appendChild(craftButton);
  }

  const subtitle = document.createElement("p");
  subtitle.className = "space-404-subtitle";
  subtitle.textContent = config.subtitle;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "space-404-button";
  button.setAttribute("aria-label", config.buttonText);
  button.innerHTML = `<span class="space-404-button-bracket">[</span>${config.buttonText}<span class="space-404-button-bracket">]</span>`;
  button.addEventListener("click", config.onButtonClick);

  content.appendChild(eyebrow);
  content.appendChild(title);
  content.appendChild(headline);
  if (orbitContainer) content.appendChild(orbitContainer);
  content.appendChild(subtitle);
  content.appendChild(button);
  stage.appendChild(content);

  // Right rail
  const rightRail = document.createElement("aside");
  rightRail.className = "space-404-rail space-404-rail--right";
  rightRail.setAttribute("aria-hidden", "true");
  rightRail.innerHTML = `
    <div class="space-404-rail-heading">SYSTEMS</div>
    <div class="space-404-rail-row space-404-rail-row--right"><span class="space-404-rail-key">PWR</span><span class="space-404-rail-val">28.4 V</span></div>
    <div class="space-404-rail-row space-404-rail-row--right"><span class="space-404-rail-key">O₂</span><span class="space-404-rail-val">84.2%</span></div>
    <div class="space-404-rail-row space-404-rail-row--right"><span class="space-404-rail-key">CPU</span><span class="space-404-rail-val">AGC NOM</span></div>
    <div class="space-404-rail-row space-404-rail-row--right"><span class="space-404-rail-key">TEMP</span><span class="space-404-rail-val">-118°C</span></div>
    <div class="space-404-rail-heading" style="margin-top:1rem">TIPS</div>
    <div class="space-404-rail-row space-404-rail-row--right" style="opacity:0.7">
      <span class="space-404-rail-key" style="font-size:8px; letter-spacing:0.25em">HINT</span>
      <span class="space-404-rail-val" style="font-size:10px; text-transform:none; letter-spacing:0">try ⇧, or type APOLLO</span>
    </div>
  `;
  stage.appendChild(rightRail);

  wrapper.appendChild(stage);

  // Ticker
  const ticker = document.createElement("div");
  ticker.className = "space-404-ticker";
  ticker.setAttribute("aria-live", "polite");
  ticker.innerHTML = `
    <span class="space-404-ticker-prompt">&gt; TRANSMIT</span>
    <span class="space-404-ticker-text"><span data-role="line"></span><span data-role="idle"></span><span class="space-404-ticker-cursor" aria-hidden="true"></span></span>
  `;
  const tickerLine = ticker.querySelector<HTMLElement>('[data-role="line"]')!;
  const tickerIdle = ticker.querySelector<HTMLElement>('[data-role="idle"]')!;
  wrapper.appendChild(ticker);

  // Vignette
  const vignette = document.createElement("div");
  vignette.className = "space-404-vignette";
  vignette.setAttribute("aria-hidden", "true");
  wrapper.appendChild(vignette);

  container.appendChild(wrapper);

  // Telemetry ticker
  const telemetryValues = {
    alt: leftRail.querySelector<HTMLElement>('[data-key="alt"]')!,
    vel: leftRail.querySelector<HTMLElement>('[data-key="vel"]')!,
    brg: leftRail.querySelector<HTMLElement>('[data-key="brg"]')!,
    sig: leftRail.querySelector<HTMLElement>('[data-key="sig"]')!,
  };
  let t = 0;
  function updateTelemetry() {
    const jitter = (m: number) =>
      Math.round((Math.sin(t * 0.7) + Math.cos(t * 1.3)) * m);
    telemetryValues.alt.textContent = `${(94203 + jitter(8)).toLocaleString()} m`;
    telemetryValues.vel.textContent = `${(7784 + jitter(3)).toLocaleString()} m/s`;
    telemetryValues.brg.textContent = `${(((137 + jitter(2)) % 360) + (360 % 360)).toString().padStart(3, "0")}°`;
    telemetryValues.sig.textContent = `${-92 + jitter(1)} dBm`;
    t += 1;
  }
  updateTelemetry();
  const telemetryInterval = window.setInterval(updateTelemetry, 900);

  // Transmission typing
  let lineIndex = 0;
  let chars = 0;
  let tickerTimeout: number | null = null;
  function typeStep() {
    const line = TRANSMISSION_LINES[lineIndex % TRANSMISSION_LINES.length];
    if (chars < line.length) {
      chars += 1;
      tickerLine.textContent = line.slice(0, chars);
      tickerTimeout = window.setTimeout(typeStep, 28);
    } else {
      tickerTimeout = window.setTimeout(() => {
        chars = 0;
        lineIndex += 1;
        tickerLine.textContent = "";
        typeStep();
      }, 2400);
    }
  }
  typeStep();

  // Morse burst
  function flashMorse() {
    const morse = document.createElement("div");
    morse.className = "space-404-morse";
    morse.setAttribute("aria-hidden", "true");
    morse.textContent = "· · · — — — · · ·";
    wrapper.appendChild(morse);
    morse.addEventListener("animationend", () => morse.remove(), {
      once: true,
    });
  }
  if (craftButton) {
    craftButton.addEventListener("click", flashMorse);
  }

  // Rocket launch
  function launchRocket() {
    const rocket = document.createElement("div");
    rocket.className = "space-404-rocket";
    rocket.style.setProperty("--rocket-x", `${20 + Math.random() * 60}%`);
    rocket.setAttribute("aria-hidden", "true");
    rocket.innerHTML = ROCKET_SVG;
    wrapper.appendChild(rocket);
    rocket.addEventListener("animationend", () => rocket.remove(), {
      once: true,
    });
  }

  // Keyboard handlers
  let apolloBuffer = "";
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Shift") wrapper.dataset.intensify = "true";
    if (e.key.length === 1) {
      apolloBuffer = (apolloBuffer + e.key.toUpperCase()).slice(-6);
      if (apolloBuffer === "APOLLO") {
        apolloBuffer = "";
        launchRocket();
      }
    }
  }
  function onKeyUp(e: KeyboardEvent) {
    if (e.key === "Shift") wrapper.dataset.intensify = "false";
  }
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  // Idle private log
  let idleTimeout: number | null = null;
  function resetIdle() {
    tickerIdle.textContent = "";
    if (idleTimeout) window.clearTimeout(idleTimeout);
    idleTimeout = window.setTimeout(() => {
      tickerIdle.textContent = `  ${IDLE_LOG}`;
    }, 22000);
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
      window.clearInterval(telemetryInterval);
      if (tickerTimeout) window.clearTimeout(tickerTimeout);
      if (idleTimeout) window.clearTimeout(idleTimeout);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      idleEvents.forEach((ev) => window.removeEventListener(ev, resetIdle));
      if (craftButton) craftButton.removeEventListener("click", flashMorse);
      button.removeEventListener("click", config.onButtonClick);
      if (wrapper.parentNode === container) {
        container.removeChild(wrapper);
      }
    },
  };
}

/**
 * Web Component wrapper: <space-404 title="404" subtitle="..."></space-404>
 *
 * `HTMLElement` is undefined in Node; using a dummy fallback at module load
 * keeps the bare `import` SSR-safe. The class is only ever instantiated by
 * the browser via `customElements.define` below, so the fallback is never
 * exercised at runtime.
 */
const SafeHTMLElement: typeof HTMLElement =
  typeof HTMLElement !== "undefined"
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

export class Space404Element extends SafeHTMLElement {
  private _cleanup: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return [
      "title",
      "eyebrow",
      "headline",
      "subtitle",
      "button-text",
      "mission-id",
      "show-orbit",
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

    const options: Space404Options = {
      title: this.getAttribute("title") ?? undefined,
      eyebrow: this.getAttribute("eyebrow") ?? undefined,
      headline: this.getAttribute("headline") ?? undefined,
      subtitle: this.getAttribute("subtitle") ?? undefined,
      buttonText: this.getAttribute("button-text") ?? undefined,
      missionId: this.getAttribute("mission-id") ?? undefined,
      showOrbit: this.hasAttribute("show-orbit")
        ? this.getAttribute("show-orbit") !== "false"
        : undefined,
      onButtonClick: () => {
        this.dispatchEvent(new CustomEvent("button-click", { bubbles: true }));
      },
    };

    const instance = createSpace404(this, options);
    this._cleanup = instance.destroy;
  }
}

if (typeof window !== "undefined" && !customElements.get("space-404")) {
  customElements.define("space-404", Space404Element);
}

export default createSpace404;
