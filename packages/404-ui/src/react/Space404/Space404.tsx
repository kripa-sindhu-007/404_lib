import type React from "react";
import { useMemo, useCallback } from "react";
import { generateStars } from "../../core/utils";
import { ASTRONAUT_SVG } from "../../core/assets";

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
  /** Whether to show the floating astronaut */
  showAstronaut?: boolean;
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
  showAstronaut = true,
  className = "",
  style,
}: Space404Props): React.JSX.Element {
  // Memoize stars to prevent regeneration on every render
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  // Generate random position for astronaut
  const astronautPosition = useMemo(
    () => ({
      right: `${Math.random() * 20 + 5}%`,
      top: `${Math.random() * 60 + 10}%`,
    }),
    []
  );

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

      {/* Floating Astronaut */}
      {showAstronaut && (
        <div
          className="space-404-astronaut"
          style={{
            right: astronautPosition.right,
            top: astronautPosition.top,
          }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: ASTRONAUT_SVG }}
        />
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
    </div>
  );
}

export default Space404;
