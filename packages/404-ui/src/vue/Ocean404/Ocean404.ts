import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  type PropType,
} from "vue";
import { generateBubbles, createKonamiMatcher } from "../../core/utils";
import { JELLYFISH_SVG, SUBMARINE_SVG, ANGLER_SVG } from "../../core/assets";

export interface Ocean404Props {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title */
  eyebrow?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Number of rising bubbles (default: 28) */
  bubbleCount?: number;
  /** Whether to render the drifting jellyfish (default: true) */
  showJellyfish?: boolean;
}

function cssVarsToStyle(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

function generateJellies(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const size = 80 + Math.random() * 80;
    return {
      id: i,
      style: {
        "--jelly-size": `${size}px`,
        "--jelly-x": `${10 + Math.random() * 80}%`,
        "--jelly-y": `${15 + Math.random() * 60}%`,
        "--jelly-duration": `${4.5 + Math.random() * 3}s`,
        "--jelly-delay": `${Math.random() * 3}s`,
      } as Record<string, string>,
    };
  });
}

/**
 * Ocean404 Vue component — bioluminescent deep-sea 404 page.
 *
 * Includes the same easter eggs as the React version: clickable bubbles,
 * Konami-triggered submarine, idle anglerfish, and a looping depth HUD.
 */
export const Ocean404 = defineComponent({
  name: "Ocean404",
  props: {
    title: { type: String as PropType<string>, default: "404" },
    eyebrow: {
      type: String as PropType<string>,
      default: "Signal lost · 11,034m",
    },
    subtitle: {
      type: String as PropType<string>,
      default: "You've drifted too deep. The surface is waiting.",
    },
    buttonText: {
      type: String as PropType<string>,
      default: "Return to surface",
    },
    bubbleCount: { type: Number as PropType<number>, default: 28 },
    showJellyfish: { type: Boolean as PropType<boolean>, default: true },
  },
  emits: ["buttonClick"],
  setup(props, { emit }) {
    const bubbles = computed(() => generateBubbles(props.bubbleCount));
    const jellies = computed(() =>
      props.showJellyfish ? generateJellies(2) : []
    );
    const popped = ref<Set<number>>(new Set());
    const depth = ref(0);
    const submarineKey = ref(0);
    const anglerKey = ref(0);

    let depthInterval: number | null = null;
    let idleTimeout: number | null = null;
    let keydownHandler: ((e: KeyboardEvent) => void) | null = null;
    const idleEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    let resetIdle: (() => void) | null = null;

    function popBubble(id: number) {
      if (popped.value.has(id)) return;
      const next = new Set(popped.value);
      next.add(id);
      popped.value = next;
      setTimeout(() => {
        if (!popped.value.has(id)) return;
        const n = new Set(popped.value);
        n.delete(id);
        popped.value = n;
      }, 600);
    }

    onMounted(() => {
      if (typeof window === "undefined") return;

      depthInterval = window.setInterval(() => {
        depth.value = (depth.value + 1) % 11035;
      }, 180);

      const match = createKonamiMatcher();
      keydownHandler = (e: KeyboardEvent) => {
        if (match(e.key)) submarineKey.value += 1;
      };
      window.addEventListener("keydown", keydownHandler);

      resetIdle = () => {
        if (idleTimeout) window.clearTimeout(idleTimeout);
        idleTimeout = window.setTimeout(() => {
          anglerKey.value += 1;
        }, 18000);
      };
      idleEvents.forEach((ev) =>
        window.addEventListener(ev, resetIdle as EventListener)
      );
      resetIdle();
    });

    onBeforeUnmount(() => {
      if (depthInterval) clearInterval(depthInterval);
      if (idleTimeout) clearTimeout(idleTimeout);
      if (keydownHandler) window.removeEventListener("keydown", keydownHandler);
      if (resetIdle) {
        idleEvents.forEach((ev) =>
          window.removeEventListener(ev, resetIdle as EventListener)
        );
      }
    });

    const depthDisplay = computed(() => {
      const value = depth.value > 11000 ? 11034 : depth.value;
      return value.toString().padStart(5, "0");
    });

    return () =>
      h(
        "div",
        {
          class: "ocean-404-container",
          role: "main",
          "aria-label": "404 Error Page — Ocean",
        },
        [
          h("div", { class: "ocean-404-caustics", "aria-hidden": "true" }),
          h("div", { class: "ocean-404-vignette", "aria-hidden": "true" }),

          h("div", { class: "ocean-404-depth", "aria-hidden": "true" }, [
            "Depth ",
            h(
              "span",
              { class: "ocean-404-depth-value" },
              `${depthDisplay.value}m`
            ),
          ]),
          h(
            "div",
            { class: "ocean-404-coords", "aria-hidden": "true" },
            "40°04′04″N · 179°59′59″W"
          ),

          h(
            "div",
            { class: "ocean-404-bubble-field", "aria-hidden": "true" },
            bubbles.value.map((b) =>
              h("button", {
                key: b.id,
                type: "button",
                "aria-hidden": "true",
                tabindex: -1,
                class: "ocean-404-bubble",
                style: cssVarsToStyle(b.styles),
                "data-popped": popped.value.has(b.id) ? "true" : "false",
                onClick: () => popBubble(b.id),
              })
            )
          ),

          ...jellies.value.map((j) =>
            h("div", {
              key: j.id,
              class: "ocean-404-jellyfish",
              style: cssVarsToStyle(j.style),
              "aria-hidden": "true",
              innerHTML: JELLYFISH_SVG,
            })
          ),

          submarineKey.value > 0 &&
            h("div", {
              key: `sub-${submarineKey.value}`,
              class: "ocean-404-submarine",
              "aria-hidden": "true",
              innerHTML: SUBMARINE_SVG,
            }),

          anglerKey.value > 0 &&
            h("div", {
              key: `angler-${anglerKey.value}`,
              class: "ocean-404-angler",
              "aria-hidden": "true",
              innerHTML: ANGLER_SVG,
            }),

          h("div", { class: "ocean-404-content" }, [
            h("div", { class: "ocean-404-sonar", "aria-hidden": "true" }),
            h("span", { class: "ocean-404-eyebrow" }, props.eyebrow),
            h("h1", { class: "ocean-404-title" }, props.title),
            h("p", { class: "ocean-404-subtitle" }, props.subtitle),
            h(
              "button",
              {
                type: "button",
                class: "ocean-404-button",
                "aria-label": props.buttonText,
                onClick: () => emit("buttonClick"),
              },
              [h("span", { "aria-hidden": "true" }, "↑"), props.buttonText]
            ),
          ]),
        ]
      );
  },
});

export default Ocean404;
