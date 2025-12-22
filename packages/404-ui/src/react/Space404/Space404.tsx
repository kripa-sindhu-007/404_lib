import type React from "react";
import { useMemo, useCallback } from "react";
import { generateStars } from "../../core/utils";

export interface Space404Props {
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
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
}

/**
 * Space404 - An animated space-themed 404 error page component
 *
 * @example
 * ```tsx
 * import { Space404 } from '@404-ui/react';
 *
 * function NotFoundPage() {
 *   return (
 *     <Space404
 *       title="404"
 *       subtitle="Houston, we have a problem..."
 *       buttonText="Return Home"
 *       onButtonClick={() => window.location.href = '/'}
 *     />
 *   );
 * }
 * ```
 */
export function Space404({
  title = "404",
  subtitle = "Lost in space...",
  buttonText = "Return Home",
  onButtonClick,
  starCount = 100,
  showRocket = true,
  showPlanet = true,
  className = "",
  style,
}: Space404Props): React.JSX.Element {
  // Memoize stars to prevent regeneration on every render
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  const handleButtonClick = useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default behavior: navigate to home
      window.location.href = "/";
    }
  }, [onButtonClick]);

  return (
    <div
      className={`space-404-container ${className}`.trim()}
      style={style}
      role="main"
      aria-label="404 Error Page"
    >
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            className="space-404-star"
            style={star.styles as React.CSSProperties}
          />
        ))}
      </div>

      {/* Background Planet */}
      {showPlanet && (
        <div
          className="space-404-planet -left-24 -top-24"
          aria-hidden="true"
        />
      )}

      {/* Floating Rocket */}
      {showRocket && (
        <div
          className="space-404-rocket right-10 top-1/4"
          aria-hidden="true"
        >
          🚀
        </div>
      )}

      {/* Main Content */}
      <div className="space-404-content">
        <h1 className="space-404-title">{title}</h1>
        <p className="space-404-subtitle">{subtitle}</p>
        <button
          type="button"
          className="space-404-button"
          onClick={handleButtonClick}
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </div>

      {/* Secondary Planet */}
      {showPlanet && (
        <div
          className="space-404-planet -bottom-32 -right-32 opacity-20"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Space404;
