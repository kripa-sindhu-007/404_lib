/**
 * Animation configuration types
 */
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  iterations?: number | "infinite";
}

/**
 * Default animation configurations for various effects
 */
export const defaultAnimations = {
  float: {
    duration: 6,
    easing: "ease-in-out",
    iterations: "infinite" as const,
  },
  twinkle: {
    duration: 3,
    easing: "ease-in-out",
    iterations: "infinite" as const,
  },
  pulse: {
    duration: 2,
    easing: "ease-in-out",
    iterations: "infinite" as const,
  },
  drift: {
    duration: 20,
    easing: "linear",
    iterations: "infinite" as const,
  },
  rocket: {
    duration: 8,
    easing: "ease-in-out",
    iterations: "infinite" as const,
  },
};

/**
 * Applies CSS animation to an element
 */
export function applyAnimation(
  element: HTMLElement,
  animationName: string,
  config: AnimationConfig = {}
): void {
  const { duration = 1, delay = 0, easing = "ease", iterations = 1 } = config;

  element.style.animation = `${animationName} ${duration}s ${easing} ${delay}s ${iterations}`;
}

/**
 * Creates a stagger effect for multiple elements
 */
export function staggerAnimation(
  elements: HTMLElement[],
  animationName: string,
  config: AnimationConfig = {},
  staggerDelay: number = 0.1
): void {
  elements.forEach((element, index) => {
    applyAnimation(element, animationName, {
      ...config,
      delay: (config.delay ?? 0) + index * staggerDelay,
    });
  });
}

/**
 * Pauses all animations on an element
 */
export function pauseAnimation(element: HTMLElement): void {
  element.style.animationPlayState = "paused";
}

/**
 * Resumes all animations on an element
 */
export function resumeAnimation(element: HTMLElement): void {
  element.style.animationPlayState = "running";
}
