import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  type PropType,
} from "vue";
import { ORBIT_SVG, ROCKET_SVG } from "../../core/assets";

export interface Space404Props {
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
  /** Mission identifier shown in the status bar */
  missionId?: string;
  /** Whether to render the orbital diagnostic */
  showOrbit?: boolean;
}

const TRANSMISSION_LINES = [
  "SIGNAL LOST // COORDINATES UNKNOWN // REQUESTING RE-VECTOR",
  "TELEMETRY DRIFT DETECTED // TRAJECTORY DEVIATION Δ 0.404 RAD",
  "ATTEMPTING UPLINK // CHECK HANDOVER TO RECOVERY",
  "REROUTING THROUGH DEEP SPACE NETWORK // PLEASE STAND BY",
];

const IDLE_LOG = "> PRIVATE LOG: see you on the pad.";

/**
 * Space404 Vue component — Apollo-era mission-control 404.
 *
 * Matches the React version's easter eggs: morse burst on spacecraft click,
 * APOLLO keyword rocket launch, Shift-hold CRT intensify, idle private log.
 */
export const Space404 = defineComponent({
  name: "Space404",
  props: {
    title: { type: String as PropType<string>, default: "404" },
    eyebrow: {
      type: String as PropType<string>,
      default: "SIGNAL LOST · UPLINK DEGRADED",
    },
    headline: {
      type: String as PropType<string>,
      default: "OFF-NOMINAL TRAJECTORY DETECTED",
    },
    subtitle: {
      type: String as PropType<string>,
      default:
        "The page you requested has drifted outside the nominal envelope. Re-establishing uplink with base.",
    },
    buttonText: {
      type: String as PropType<string>,
      default: "RE-VECTOR TO BASE",
    },
    missionId: {
      type: String as PropType<string>,
      default: "APOLLO · LM-404",
    },
    showOrbit: { type: Boolean as PropType<boolean>, default: true },
  },
  emits: ["buttonClick"],
  setup(props, { emit }) {
    const intensify = ref(false);
    const morseKey = ref(0);
    const rocketKey = ref(0);
    const showIdleLog = ref(false);
    const telemetryTick = ref(0);
    const tickerIndex = ref(0);
    const tickerChars = ref(0);

    let telemetryInterval: number | null = null;
    let tickerTimeout: number | null = null;
    let idleTimeout: number | null = null;
    let apolloBuffer = "";

    const idleEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") intensify.value = true;
      if (e.key.length === 1) {
        apolloBuffer = (apolloBuffer + e.key.toUpperCase()).slice(-6);
        if (apolloBuffer === "APOLLO") {
          apolloBuffer = "";
          rocketKey.value += 1;
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") intensify.value = false;
    };

    const resetIdle = () => {
      showIdleLog.value = false;
      if (idleTimeout) window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(() => {
        showIdleLog.value = true;
      }, 22000);
    };

    function scheduleTick() {
      const line =
        TRANSMISSION_LINES[tickerIndex.value % TRANSMISSION_LINES.length];
      if (tickerChars.value < line.length) {
        tickerTimeout = window.setTimeout(() => {
          tickerChars.value += 1;
          scheduleTick();
        }, 28);
      } else {
        tickerTimeout = window.setTimeout(() => {
          tickerChars.value = 0;
          tickerIndex.value += 1;
          scheduleTick();
        }, 2400);
      }
    }

    onMounted(() => {
      if (typeof window === "undefined") return;

      telemetryInterval = window.setInterval(() => {
        telemetryTick.value += 1;
      }, 900);

      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      idleEvents.forEach((ev) => window.addEventListener(ev, resetIdle));
      resetIdle();
      scheduleTick();
    });

    onBeforeUnmount(() => {
      if (telemetryInterval) clearInterval(telemetryInterval);
      if (tickerTimeout) clearTimeout(tickerTimeout);
      if (idleTimeout) clearTimeout(idleTimeout);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      idleEvents.forEach((ev) => window.removeEventListener(ev, resetIdle));
    });

    const telemetry = computed(() => {
      const t = telemetryTick.value;
      const jitter = (magnitude: number) =>
        Math.round((Math.sin(t * 0.7) + Math.cos(t * 1.3)) * magnitude);
      return {
        altitude: 94203 + jitter(8),
        velocity: 7784 + jitter(3),
        bearing: (((137 + jitter(2)) % 360) + 360) % 360,
        signal: -92 + jitter(1),
      };
    });

    const ticker = computed(() => {
      const line =
        TRANSMISSION_LINES[tickerIndex.value % TRANSMISSION_LINES.length];
      return line.slice(0, tickerChars.value);
    });

    const rocketX = computed(() => 20 + Math.random() * 60);

    function onCraftClick() {
      morseKey.value += 1;
    }

    function onButtonClick() {
      emit("buttonClick");
    }

    function rail(opts: {
      side: "left" | "right";
      children: ReturnType<typeof h>[];
    }) {
      return h(
        "aside",
        {
          class: `space-404-rail space-404-rail--${opts.side}`,
          "aria-hidden": "true",
        },
        opts.children
      );
    }

    function row(
      key: string,
      value: string,
      side: "left" | "right",
      extraStyle?: Record<string, string>
    ) {
      return h(
        "div",
        {
          class:
            side === "right"
              ? "space-404-rail-row space-404-rail-row--right"
              : "space-404-rail-row",
        },
        [
          h("span", { class: "space-404-rail-key" }, key),
          h("span", { class: "space-404-rail-val", style: extraStyle }, value),
        ]
      );
    }

    return () =>
      h(
        "div",
        {
          class: "space-404-container",
          role: "main",
          "data-intensify": intensify.value ? "true" : "false",
          "aria-label": "404 Error Page — Mission Control",
        },
        [
          h("div", { class: "space-404-scanlines", "aria-hidden": "true" }),

          // Status bar
          h("div", { class: "space-404-statusbar" }, [
            h("span", { class: "space-404-led", "aria-hidden": "true" }),
            h("span", { class: "space-404-statusbar-label" }, props.missionId),
            h("span", { class: "space-404-spacer" }),
            h("span", {}, "FLT 04:0404"),
            h("span", { class: "space-404-spacer" }),
            h("span", { class: "space-404-warn" }, "⚠ LINK FAULT"),
          ]),

          // Stage
          h("div", { class: "space-404-stage" }, [
            rail({
              side: "left",
              children: [
                h("div", { class: "space-404-rail-heading" }, "TRAJECTORY"),
                row(
                  "ALT",
                  `${telemetry.value.altitude.toLocaleString()} m`,
                  "left"
                ),
                row(
                  "VEL",
                  `${telemetry.value.velocity.toLocaleString()} m/s`,
                  "left"
                ),
                row(
                  "BRG",
                  `${telemetry.value.bearing.toString().padStart(3, "0")}°`,
                  "left"
                ),
                row("SIG", `${telemetry.value.signal} dBm`, "left"),
                h(
                  "div",
                  {
                    class: "space-404-rail-heading",
                    style: "margin-top: 1rem",
                  },
                  "CHECKLIST"
                ),
                row("S-IVB BURN", "OK", "left"),
                row("TLI", "OK", "left"),
                row("ROUTE", "FAIL", "left", { color: "#ff3d3d" }),
              ],
            }),

            // Center
            h("div", { class: "space-404-content" }, [
              h("span", { class: "space-404-eyebrow" }, props.eyebrow),
              h(
                "h1",
                {
                  class: "space-404-title",
                  "data-text": props.title,
                },
                props.title
              ),
              h("p", { class: "space-404-headline" }, props.headline),
              props.showOrbit &&
                h("div", { class: "space-404-orbit", "aria-hidden": "true" }, [
                  h("div", {
                    style: "position: relative",
                    innerHTML: ORBIT_SVG,
                  }),
                  h("button", {
                    type: "button",
                    "aria-label": "Ping off-nominal spacecraft",
                    title: "Ping spacecraft",
                    style:
                      "position:absolute; left:calc(60/320 * 60%); top:calc(144/180 * 100%); width:28px; height:28px; transform:translate(-50%,-50%); background:transparent; border:0; padding:0; cursor:pointer",
                    onClick: onCraftClick,
                  }),
                ]),
              h("p", { class: "space-404-subtitle" }, props.subtitle),
              h(
                "button",
                {
                  type: "button",
                  class: "space-404-button",
                  "aria-label": props.buttonText,
                  onClick: onButtonClick,
                },
                [
                  h("span", { class: "space-404-button-bracket" }, "["),
                  props.buttonText,
                  h("span", { class: "space-404-button-bracket" }, "]"),
                ]
              ),
            ]),

            rail({
              side: "right",
              children: [
                h("div", { class: "space-404-rail-heading" }, "SYSTEMS"),
                row("PWR", "28.4 V", "right"),
                row("O₂", "84.2%", "right"),
                row("CPU", "AGC NOM", "right"),
                row("TEMP", "-118°C", "right"),
                h(
                  "div",
                  {
                    class: "space-404-rail-heading",
                    style: "margin-top: 1rem",
                  },
                  "TIPS"
                ),
                h(
                  "div",
                  {
                    class: "space-404-rail-row space-404-rail-row--right",
                    style: "opacity: 0.7",
                  },
                  [
                    h(
                      "span",
                      {
                        class: "space-404-rail-key",
                        style: "font-size: 8px; letter-spacing: 0.25em",
                      },
                      "HINT"
                    ),
                    h(
                      "span",
                      {
                        class: "space-404-rail-val",
                        style:
                          "font-size: 10px; text-transform: none; letter-spacing: 0",
                      },
                      "try ⇧, or type APOLLO"
                    ),
                  ]
                ),
              ],
            }),
          ]),

          // Ticker
          h("div", { class: "space-404-ticker", "aria-live": "polite" }, [
            h("span", { class: "space-404-ticker-prompt" }, "> TRANSMIT"),
            h("span", { class: "space-404-ticker-text" }, [
              ticker.value,
              showIdleLog.value ? `  ${IDLE_LOG}` : "",
              h("span", {
                class: "space-404-ticker-cursor",
                "aria-hidden": "true",
              }),
            ]),
          ]),

          h("div", { class: "space-404-vignette", "aria-hidden": "true" }),

          morseKey.value > 0 &&
            h(
              "div",
              {
                key: `morse-${morseKey.value}`,
                class: "space-404-morse",
                "aria-hidden": "true",
              },
              "· · · — — — · · ·"
            ),

          rocketKey.value > 0 &&
            h("div", {
              key: `rocket-${rocketKey.value}`,
              class: "space-404-rocket",
              style: `--rocket-x: ${rocketX.value}%`,
              "aria-hidden": "true",
              innerHTML: ROCKET_SVG,
            }),
        ]
      );
  },
});

export default Space404;
