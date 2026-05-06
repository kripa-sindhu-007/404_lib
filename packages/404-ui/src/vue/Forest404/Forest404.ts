import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  type PropType,
} from "vue";
import {
  generateFireflies,
  generateLeaves,
  createKonamiMatcher,
} from "../../core/utils";
import { COMPASS_SVG, LEAF_SVG, FOX_SVG, MOTH_SVG } from "../../core/assets";

export interface Forest404Props {
  title?: string;
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  buttonText?: string;
  coordinates?: string;
  fireflyCount?: number;
  leafCount?: number;
  showTreeline?: boolean;
  showNote?: string | boolean;
}

const BLOOM_WORD = "MOSS";
const DEFAULT_NOTE =
  "“The map said this trail looped — it doesn't. Mark waypoint 404 and turn back before dusk.”\n— Field journal, 1958";

/**
 * Forest404 Vue component — old-growth temperate rainforest at twilight.
 *
 * Same easter eggs as the React version: type "MOSS" for spring bloom,
 * Konami summons a fox, idle ~18s reveals a luminous moth, click any
 * firefly to burst it.
 */
export const Forest404 = defineComponent({
  name: "Forest404",
  props: {
    title: { type: String as PropType<string>, default: "404" },
    eyebrow: { type: String as PropType<string>, default: "Trail uncharted" },
    headline: {
      type: String as PropType<string>,
      default: "The path forks here.",
    },
    subtitle: {
      type: String as PropType<string>,
      default:
        "You've wandered off the map. The grove is quiet, the moss is patient — find your bearings and head back.",
    },
    buttonText: {
      type: String as PropType<string>,
      default: "Find your bearings",
    },
    coordinates: {
      type: String as PropType<string>,
      default: "47°23′N · 122°02′W",
    },
    fireflyCount: { type: Number as PropType<number>, default: 22 },
    leafCount: { type: Number as PropType<number>, default: 14 },
    showTreeline: { type: Boolean as PropType<boolean>, default: true },
    showNote: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: true,
    },
  },
  emits: ["buttonClick"],
  setup(props, { emit }) {
    const fireflies = computed(() => generateFireflies(props.fireflyCount));
    const leaves = computed(() => generateLeaves(props.leafCount));

    const burstFireflies = ref<Set<number>>(new Set());
    const bloom = ref(false);
    const foxKey = ref(0);
    const mothKey = ref(0);
    const altitude = ref(312);

    let bloomTimer: number | null = null;
    let idleTimer: number | null = null;
    let altitudeInterval: number | null = null;
    let keydownHandler: ((e: KeyboardEvent) => void) | null = null;
    const idleEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    let resetIdle: (() => void) | null = null;

    const noteText = computed<string | null>(() => {
      if (props.showNote === false) return null;
      if (typeof props.showNote === "string") return props.showNote;
      return DEFAULT_NOTE;
    });

    function handleFireflyClick(id: number): void {
      if (burstFireflies.value.has(id)) return;
      const next = new Set(burstFireflies.value);
      next.add(id);
      burstFireflies.value = next;
      window.setTimeout(() => {
        const cleanup = new Set(burstFireflies.value);
        cleanup.delete(id);
        burstFireflies.value = cleanup;
      }, 700);
    }

    onMounted(() => {
      if (typeof window === "undefined") return;

      let buffer = "";
      const konami = createKonamiMatcher();
      keydownHandler = (e: KeyboardEvent) => {
        if (e.key.length === 1) {
          buffer = (buffer + e.key.toUpperCase()).slice(-BLOOM_WORD.length);
          if (buffer === BLOOM_WORD) {
            buffer = "";
            bloom.value = true;
            if (bloomTimer) window.clearTimeout(bloomTimer);
            bloomTimer = window.setTimeout(() => {
              bloom.value = false;
            }, 5000);
          }
        }
        if (konami(e.key)) {
          foxKey.value += 1;
        }
      };
      window.addEventListener("keydown", keydownHandler);

      resetIdle = () => {
        if (idleTimer) window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          mothKey.value += 1;
        }, 18000);
      };
      idleEvents.forEach((ev) => window.addEventListener(ev, resetIdle!));
      resetIdle();

      altitudeInterval = window.setInterval(() => {
        const drift = Math.random() < 0.5 ? -1 : 1;
        const next = altitude.value + drift;
        if (next < 280) altitude.value = 281;
        else if (next > 340) altitude.value = 339;
        else altitude.value = next;
      }, 1100);
    });

    onBeforeUnmount(() => {
      if (keydownHandler) window.removeEventListener("keydown", keydownHandler);
      if (resetIdle) {
        idleEvents.forEach((ev) => window.removeEventListener(ev, resetIdle!));
      }
      if (bloomTimer) window.clearTimeout(bloomTimer);
      if (idleTimer) window.clearTimeout(idleTimer);
      if (altitudeInterval) window.clearInterval(altitudeInterval);
    });

    return () =>
      h(
        "div",
        {
          class: "forest-404-container",
          role: "main",
          "aria-label": "404 Error Page — Forest",
          "data-bloom": bloom.value ? "true" : "false",
        },
        [
          props.showTreeline &&
            h("div", {
              class: "forest-404-treeline forest-404-treeline--left",
              "aria-hidden": "true",
            }),
          props.showTreeline &&
            h("div", {
              class: "forest-404-treeline forest-404-treeline--right",
              "aria-hidden": "true",
            }),

          h("div", { class: "forest-404-fog", "aria-hidden": "true" }),
          h("div", { class: "forest-404-vignette", "aria-hidden": "true" }),

          h(
            "div",
            { class: "forest-404-firefly-field", "aria-hidden": "true" },
            fireflies.value.map((f) =>
              h("button", {
                key: f.id,
                type: "button",
                "aria-hidden": "true",
                tabindex: -1,
                class: "forest-404-firefly",
                style: f.styles,
                "data-burst": burstFireflies.value.has(f.id) ? "true" : "false",
                onClick: () => handleFireflyClick(f.id),
              })
            )
          ),

          h(
            "div",
            { class: "forest-404-leaf-field", "aria-hidden": "true" },
            leaves.value.map((l) =>
              h("span", {
                key: l.id,
                class: "forest-404-leaf",
                style: l.styles,
                innerHTML: LEAF_SVG,
              })
            )
          ),

          h("div", { class: "forest-404-statusbar", "aria-hidden": "true" }, [
            h("span", { class: "forest-404-trailmark" }, "Waypoint 404 · Lost"),
            h("span", { class: "forest-404-status-meta--hide-sm" }, [
              h("span", { class: "forest-404-status-key" }, "Lat/Lon"),
              " ",
              h("span", { class: "forest-404-status-val" }, props.coordinates),
            ]),
            h("span", { class: "forest-404-status-spacer" }),
            h("span", null, [
              h("span", { class: "forest-404-status-key" }, "Alt"),
              " ",
              h(
                "span",
                { class: "forest-404-status-val" },
                `${altitude.value}m`
              ),
            ]),
            h("span", { class: "forest-404-status-meta--hide-sm" }, [
              h("span", { class: "forest-404-status-key" }, "Wind"),
              " ",
              h("span", { class: "forest-404-status-val" }, "ESE 4kt"),
            ]),
          ]),

          noteText.value &&
            h(
              "aside",
              { class: "forest-404-note", "aria-hidden": "true" },
              noteText.value
            ),

          h("div", { class: "forest-404-stage" }, [
            h("div", {
              class: "forest-404-compass",
              "aria-hidden": "true",
              innerHTML: COMPASS_SVG,
            }),
            h("span", { class: "forest-404-eyebrow" }, props.eyebrow),
            h("div", { class: "forest-404-title-wrap" }, [
              h(
                "span",
                {
                  class: "forest-404-title-shadow",
                  "aria-hidden": "true",
                },
                props.title
              ),
              h("h1", { class: "forest-404-title" }, props.title),
            ]),
            h("p", { class: "forest-404-headline" }, props.headline),
            h("p", { class: "forest-404-subtitle" }, props.subtitle),
            h(
              "button",
              {
                type: "button",
                class: "forest-404-button",
                "aria-label": props.buttonText,
                onClick: () => emit("buttonClick"),
              },
              [
                h(
                  "span",
                  { class: "forest-404-button-arrow", "aria-hidden": "true" },
                  "↗"
                ),
                props.buttonText,
              ]
            ),
          ]),

          h("div", { class: "forest-404-footer", "aria-hidden": "true" }, [
            h("span", { class: "forest-404-footer-warn" }, "SIGNAL · WEAK"),
            h("span", null, "·"),
            h("span", null, "Last fix 02:14 ago"),
            h("span", { class: "forest-404-status-spacer" }),
            h(
              "span",
              { class: "forest-404-status-meta--hide-sm" },
              "try ↑↑↓↓ · type MOSS"
            ),
          ]),

          foxKey.value > 0 &&
            h("div", {
              key: `fox-${foxKey.value}`,
              class: "forest-404-fox",
              "aria-hidden": "true",
              innerHTML: FOX_SVG,
            }),

          mothKey.value > 0 &&
            h("div", {
              key: `moth-${mothKey.value}`,
              class: "forest-404-moth",
              "aria-hidden": "true",
              innerHTML: MOTH_SVG,
            }),
        ]
      );
  },
});

export default Forest404;
