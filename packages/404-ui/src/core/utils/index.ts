/**
 * Generates a random number between min and max (inclusive)
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generates CSS custom properties for a star element
 */
export function generateStarStyles(_index: number): Record<string, string> {
  const size = randomBetween(1, 3);
  const x = randomBetween(0, 100);
  const y = randomBetween(0, 100);
  const duration = randomBetween(2, 5);
  const delay = randomBetween(0, 3);

  return {
    "--star-size": `${size}px`,
    "--star-x": `${x}%`,
    "--star-y": `${y}%`,
    "--star-duration": `${duration}s`,
    "--star-delay": `${delay}s`,
  };
}

/**
 * Generates an array of star configurations
 */
export function generateStars(count: number): Array<{
  id: number;
  styles: Record<string, string>;
}> {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    styles: generateStarStyles(i),
  }));
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Generates CSS custom properties for a rising bubble (Ocean404)
 */
export function generateBubbleStyles(): Record<string, string> {
  const size = randomBetween(6, 22);
  const x = randomBetween(2, 98);
  const duration = randomBetween(8, 16);
  const delay = randomBetween(0, 12);
  const drift = randomBetween(-40, 40);

  return {
    "--bubble-size": `${size}px`,
    "--bubble-x": `${x}%`,
    "--bubble-duration": `${duration}s`,
    "--bubble-delay": `-${delay}s`,
    "--bubble-drift": `${drift}px`,
  };
}

/**
 * Generates an array of bubble configurations for Ocean404
 */
export function generateBubbles(count: number): Array<{
  id: number;
  styles: Record<string, string>;
}> {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    styles: generateBubbleStyles(),
  }));
}

/**
 * Canonical Konami sequence (case-insensitive).
 */
export const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/**
 * Returns a stateful matcher that tracks progress through KONAMI_SEQUENCE.
 * Call the returned function with each keydown event key; it returns
 * `true` on the keystroke that completes the sequence, `false` otherwise.
 */
export function createKonamiMatcher(): (key: string) => boolean {
  let index = 0;
  return (key: string) => {
    const expected = KONAMI_SEQUENCE[index];
    const match =
      key === expected || key.toLowerCase() === String(expected).toLowerCase();
    if (match) {
      index += 1;
      if (index === KONAMI_SEQUENCE.length) {
        index = 0;
        return true;
      }
    } else {
      // allow re-start if this key is the first in the sequence
      index = key === KONAMI_SEQUENCE[0] ? 1 : 0;
    }
    return false;
  };
}
