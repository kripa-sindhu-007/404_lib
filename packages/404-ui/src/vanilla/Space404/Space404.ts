import { generateStars } from "../../core/utils";

export interface Space404Options {
  /** Title text displayed prominently (default: "404") */
  title?: string;
  /** Subtitle text (default: "Lost in space...") */
  subtitle?: string;
  /** Button text for the action button */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Number of stars to generate (default: 100) */
  starCount?: number;
  /** Whether to show the floating rocket */
  showRocket?: boolean;
  /** Whether to show the background planet */
  showPlanet?: boolean;
}

const DEFAULT_OPTIONS: Required<Space404Options> = {
  title: "404",
  subtitle: "Lost in space...",
  buttonText: "Return Home",
  onButtonClick: () => {
    window.location.href = "/";
  },
  starCount: 100,
  showRocket: true,
  showPlanet: true,
};

/**
 * Space404 - Vanilla JS/Web Components implementation
 *
 * @example
 * ```js
 * import { createSpace404 } from '@404-ui/vanilla';
 *
 * const container = document.getElementById('app');
 * const space404 = createSpace404(container, {
 *   title: '404',
 *   subtitle: 'Page not found',
 *   onButtonClick: () => window.location.href = '/'
 * });
 *
 * // Clean up when done
 * space404.destroy();
 * ```
 */
export function createSpace404(
  container: HTMLElement,
  options: Space404Options = {}
): { destroy: () => void } {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const stars = generateStars(config.starCount);

  // Create the main container
  const wrapper = document.createElement("div");
  wrapper.className = "space-404-container";
  wrapper.setAttribute("role", "main");
  wrapper.setAttribute("aria-label", "404 Error Page");

  // Stars container
  const starsContainer = document.createElement("div");
  starsContainer.className = "absolute inset-0 overflow-hidden";
  starsContainer.setAttribute("aria-hidden", "true");

  stars.forEach((star) => {
    const starEl = document.createElement("div");
    starEl.className = "space-404-star";
    Object.entries(star.styles).forEach(([key, value]) => {
      starEl.style.setProperty(key, value);
    });
    starsContainer.appendChild(starEl);
  });

  wrapper.appendChild(starsContainer);

  // Background planet
  if (config.showPlanet) {
    const planet1 = document.createElement("div");
    planet1.className = "space-404-planet -left-24 -top-24";
    planet1.setAttribute("aria-hidden", "true");
    wrapper.appendChild(planet1);
  }

  // Rocket
  if (config.showRocket) {
    const rocket = document.createElement("div");
    rocket.className = "space-404-rocket right-10 top-1/4";
    rocket.setAttribute("aria-hidden", "true");
    rocket.textContent = "🚀";
    wrapper.appendChild(rocket);
  }

  // Content section
  const content = document.createElement("div");
  content.className = "space-404-content";

  const title = document.createElement("h1");
  title.className = "space-404-title";
  title.textContent = config.title;

  const subtitle = document.createElement("p");
  subtitle.className = "space-404-subtitle";
  subtitle.textContent = config.subtitle;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "space-404-button";
  button.textContent = config.buttonText;
  button.setAttribute("aria-label", config.buttonText);
  button.addEventListener("click", config.onButtonClick);

  content.appendChild(title);
  content.appendChild(subtitle);
  content.appendChild(button);
  wrapper.appendChild(content);

  // Secondary planet
  if (config.showPlanet) {
    const planet2 = document.createElement("div");
    planet2.className = "space-404-planet -bottom-32 -right-32 opacity-20";
    planet2.style.animationDelay = "2s";
    planet2.setAttribute("aria-hidden", "true");
    wrapper.appendChild(planet2);
  }

  // Mount to container
  container.appendChild(wrapper);

  // Return cleanup function
  return {
    destroy: () => {
      button.removeEventListener("click", config.onButtonClick);
      container.removeChild(wrapper);
    },
  };
}

/**
 * Web Component for Space404
 * Usage: <space-404 title="404" subtitle="Lost in space"></space-404>
 */
export class Space404Element extends HTMLElement {
  private _cleanup: (() => void) | null = null;

  static get observedAttributes(): string[] {
    return [
      "title",
      "subtitle",
      "button-text",
      "star-count",
      "show-rocket",
      "show-planet",
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
    if (this.isConnected) {
      this.render();
    }
  }

  private render(): void {
    // Clean up previous render
    if (this._cleanup) {
      this._cleanup();
    }

    const options: Space404Options = {
      title: this.getAttribute("title") ?? undefined,
      subtitle: this.getAttribute("subtitle") ?? undefined,
      buttonText: this.getAttribute("button-text") ?? undefined,
      starCount: this.hasAttribute("star-count")
        ? parseInt(this.getAttribute("star-count")!, 10)
        : undefined,
      showRocket: this.hasAttribute("show-rocket")
        ? this.getAttribute("show-rocket") !== "false"
        : undefined,
      showPlanet: this.hasAttribute("show-planet")
        ? this.getAttribute("show-planet") !== "false"
        : undefined,
      onButtonClick: () => {
        this.dispatchEvent(
          new CustomEvent("button-click", { bubbles: true })
        );
      },
    };

    const instance = createSpace404(this, options);
    this._cleanup = instance.destroy;
  }
}

// Register the custom element
if (typeof window !== "undefined" && !customElements.get("space-404")) {
  customElements.define("space-404", Space404Element);
}

export default createSpace404;
