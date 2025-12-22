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
