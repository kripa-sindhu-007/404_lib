import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  type PropType,
} from "vue";
import { createKonamiMatcher } from "../../core/utils";

export interface Glitch404Props {
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
  /** Channel id displayed in the broadcast HUD (default: "04") */
  channelId?: string;
  /** Whether to show the corner "NO SIGNAL" callout (default: true) */
  showNoSignal?: boolean;
}

const MELTDOWN_WORD = "GLITCH";

/**
 * Glitch404 Vue component — corrupted-broadcast 404 page.
 *
 * Includes the same easter eggs as the React version: type "GLITCH" for
 * meltdown, Konami code flips channels, hold the screen to densify static.
 */
export const Glitch404 = defineComponent({
  name: "Glitch404",
  props: {
    title: { type: String as PropType<string>, default: "404" },
    eyebrow: {
      type: String as PropType<string>,
      default: "Transmission interrupted",
    },
    headline: { type: String as PropType<string>, default: "Page corrupted" },
    subtitle: {
      type: String as PropType<string>,
      default:
        "The signal carrying this page has been lost in transit. Retune.",
    },
    buttonText: { type: String as PropType<string>, default: "Retune" },
    channelId: { type: String as PropType<string>, default: "04" },
    showNoSignal: { type: Boolean as PropType<boolean>, default: true },
  },
  emits: ["buttonClick"],
  setup(props, { emit }) {
    const meltdown = ref(false);
    const channel = ref<"main" | "alt">("main");
    const timecode = ref("88:88:88");
    const holding = ref(false);

    let timecodeInterval: number | null = null;
    let meltdownTimeout: number | null = null;
    let channelTimeout: number | null = null;
    let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

    onMounted(() => {
      if (typeof window === "undefined") return;

      timecodeInterval = window.setInterval(() => {
        if (Math.random() < 0.18) {
          timecode.value = "88:88:88";
          return;
        }
        const h = Math.floor(Math.random() * 24)
          .toString()
          .padStart(2, "0");
        const m = Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0");
        const s = Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0");
        timecode.value = `${h}:${m}:${s}`;
      }, 720);

      let buffer = "";
      const konami = createKonamiMatcher();
      keydownHandler = (e: KeyboardEvent) => {
        if (e.key.length === 1) {
          buffer = (buffer + e.key.toUpperCase()).slice(-MELTDOWN_WORD.length);
          if (buffer === MELTDOWN_WORD) {
            buffer = "";
            meltdown.value = true;
            if (meltdownTimeout) window.clearTimeout(meltdownTimeout);
            meltdownTimeout = window.setTimeout(() => {
              meltdown.value = false;
            }, 1600);
          }
        }
        if (konami(e.key)) {
          channel.value = "alt";
          if (channelTimeout) window.clearTimeout(channelTimeout);
          channelTimeout = window.setTimeout(() => {
            channel.value = "main";
          }, 5000);
        }
      };
      window.addEventListener("keydown", keydownHandler);
    });

    onBeforeUnmount(() => {
      if (timecodeInterval) window.clearInterval(timecodeInterval);
      if (meltdownTimeout) window.clearTimeout(meltdownTimeout);
      if (channelTimeout) window.clearTimeout(channelTimeout);
      if (keydownHandler) window.removeEventListener("keydown", keydownHandler);
    });

    return () =>
      h(
        "div",
        {
          class: "glitch-404-container",
          role: "main",
          "aria-label": "404 Error Page — Glitch",
          "data-meltdown": meltdown.value ? "true" : "false",
          "data-channel": channel.value,
          onMousedown: () => (holding.value = true),
          onMouseup: () => (holding.value = false),
          onMouseleave: () => (holding.value = false),
          onTouchstart: () => (holding.value = true),
          onTouchend: () => (holding.value = false),
        },
        [
          h("div", {
            class: "glitch-404-static",
            "aria-hidden": "true",
            style: holding.value ? { opacity: 1 } : undefined,
          }),
          h("div", { class: "glitch-404-scanlines", "aria-hidden": "true" }),
          h("div", { class: "glitch-404-syncbar", "aria-hidden": "true" }),
          h("div", { class: "glitch-404-vignette", "aria-hidden": "true" }),

          h("div", { class: "glitch-404-hud", "aria-hidden": "true" }, [
            h("span", { class: "glitch-404-rec" }, [
              h("span", { class: "glitch-404-rec-dot" }),
              "REC",
            ]),
            h("span", { class: "glitch-404-hud-meta--hide-sm" }, [
              h("span", { class: "glitch-404-hud-key" }, "CH"),
              " ",
              h("span", { class: "glitch-404-hud-val" }, props.channelId),
            ]),
            h("span", { class: "glitch-404-hud-meta--hide-sm" }, [
              h("span", { class: "glitch-404-hud-key" }, "FEED"),
              " ",
              h(
                "span",
                { class: "glitch-404-hud-val" },
                channel.value === "alt" ? "AUX-7" : "PUBLIC-1"
              ),
            ]),
            h("span", { class: "glitch-404-hud-spacer" }),
            h("span", null, [
              h("span", { class: "glitch-404-hud-key" }, "TX"),
              " ",
              h("span", { class: "glitch-404-hud-val" }, "OFFLINE"),
            ]),
            h("span", { class: "glitch-404-timecode" }, timecode.value),
          ]),

          props.showNoSignal &&
            h(
              "div",
              { class: "glitch-404-nosignal", "aria-hidden": "true" },
              "NO SIGNAL"
            ),

          h("div", { class: "glitch-404-stage" }, [
            h("span", { class: "glitch-404-eyebrow" }, props.eyebrow),
            h("div", { class: "glitch-404-title-wrap" }, [
              h(
                "h1",
                {
                  class: "glitch-404-title",
                  "data-text": props.title,
                },
                props.title
              ),
              h(
                "span",
                {
                  class: "glitch-404-title-slice glitch-404-title-slice--a",
                  "aria-hidden": "true",
                },
                props.title
              ),
              h(
                "span",
                {
                  class: "glitch-404-title-slice glitch-404-title-slice--b",
                  "aria-hidden": "true",
                },
                props.title
              ),
            ]),
            h("p", { class: "glitch-404-headline" }, props.headline),
            h("p", { class: "glitch-404-subtitle" }, [
              props.subtitle,
              h("span", { class: "glitch-404-cursor", "aria-hidden": "true" }),
            ]),
            h(
              "button",
              {
                type: "button",
                class: "glitch-404-button",
                "aria-label": props.buttonText,
                onClick: () => emit("buttonClick"),
              },
              [
                h(
                  "span",
                  { class: "glitch-404-button-arrow", "aria-hidden": "true" },
                  "▶"
                ),
                props.buttonText,
              ]
            ),
          ]),

          h("div", { class: "glitch-404-footer", "aria-hidden": "true" }, [
            h("span", { class: "glitch-404-footer-warn" }, "ERR · 0x404"),
            h("span", null, "·"),
            h("span", null, "frame drop 88%"),
            h("span", { class: "glitch-404-hud-spacer" }),
            h("span", { class: "glitch-404-hud-meta--hide-sm" }, [
              "try ⇧ · type ",
              h("span", { class: "glitch-404-subtitle-mark" }, "GLITCH"),
            ]),
          ]),
        ]
      );
  },
});

export default Glitch404;
