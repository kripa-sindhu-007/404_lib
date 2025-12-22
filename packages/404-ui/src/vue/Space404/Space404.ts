import { defineComponent, h, computed, type PropType } from "vue";
import { generateStars } from "../../core/utils";

export interface Space404Props {
  /** Title text displayed prominently (default: "404") */
  title?: string;
  /** Subtitle text (default: "Lost in space...") */
  subtitle?: string;
  /** Button text for the action button */
  buttonText?: string;
  /** Number of stars to generate (default: 100) */
  starCount?: number;
  /** Whether to show the floating rocket */
  showRocket?: boolean;
  /** Whether to show the background planet */
  showPlanet?: boolean;
}

/**
 * Space404 Vue Component
 *
 * @example
 * ```vue
 * <script setup>
 * import { Space404 } from '@404-ui/core/vue';
 * </script>
 *
 * <template>
 *   <Space404
 *     title="404"
 *     subtitle="Page not found"
 *     @button-click="$router.push('/')"
 *   />
 * </template>
 * ```
 */
export const Space404 = defineComponent({
  name: "Space404",
  props: {
    title: {
      type: String as PropType<string>,
      default: "404",
    },
    subtitle: {
      type: String as PropType<string>,
      default: "Lost in space...",
    },
    buttonText: {
      type: String as PropType<string>,
      default: "Return Home",
    },
    starCount: {
      type: Number as PropType<number>,
      default: 100,
    },
    showRocket: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    showPlanet: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: ["buttonClick"],
  setup(props, { emit }) {
    const stars = computed(() => generateStars(props.starCount));

    function handleButtonClick() {
      emit("buttonClick");
    }

    function cssVarsToStyle(vars: Record<string, string>): string {
      return Object.entries(vars)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
    }

    return () =>
      h(
        "div",
        {
          class: "space-404-container",
          role: "main",
          "aria-label": "404 Error Page",
        },
        [
          // Stars Background
          h(
            "div",
            {
              class: "absolute inset-0 overflow-hidden",
              "aria-hidden": "true",
            },
            stars.value.map((star) =>
              h("div", {
                key: star.id,
                class: "space-404-star",
                style: cssVarsToStyle(star.styles),
              })
            )
          ),

          // Background Planet
          props.showPlanet &&
            h("div", {
              class: "space-404-planet -left-24 -top-24",
              "aria-hidden": "true",
            }),

          // Floating Rocket
          props.showRocket &&
            h(
              "div",
              {
                class: "space-404-rocket right-10 top-1/4",
                "aria-hidden": "true",
              },
              "🚀"
            ),

          // Main Content
          h("div", { class: "space-404-content" }, [
            h("h1", { class: "space-404-title" }, props.title),
            h("p", { class: "space-404-subtitle" }, props.subtitle),
            h(
              "button",
              {
                type: "button",
                class: "space-404-button",
                "aria-label": props.buttonText,
                onClick: handleButtonClick,
              },
              props.buttonText
            ),
          ]),

          // Secondary Planet
          props.showPlanet &&
            h("div", {
              class: "space-404-planet -bottom-32 -right-32 opacity-20",
              style: "animation-delay: 2s",
              "aria-hidden": "true",
            }),
        ]
      );
  },
});

export default Space404;
