import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { generateBubbles, createKonamiMatcher } from "../../core/utils";
import { JELLYFISH_SVG, SUBMARINE_SVG, ANGLER_SVG } from "../../core/assets";

export interface Ocean404Props {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title (default: "Signal lost · 11,034m") */
  eyebrow?: string;
  /** Subtitle text (default: "You've drifted too deep. The surface is waiting.") */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Number of rising bubbles (default: 28) */
  bubbleCount?: number;
  /** Whether to render the drifting jellyfish (default: true) */
  showJellyfish?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
}

interface JellyConfig {
  id: number;
  style: Record<string, string>;
}

function generateJellyfish(count: number): JellyConfig[] {
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
      },
    };
  });
}

/**
 * Ocean404 — a bioluminescent deep-sea 404 page.
 *
 * Subtle motion: rising bubbles, drifting jellyfish, caustic light sway,
 * sonar ring, shimmering title.
 *
 * Easter eggs (subtle):
 *  - Click any bubble to pop it.
 *  - Konami code summons a drifting submarine.
 *  - After ~18s of idle time, a lone anglerfish drifts past in the deep.
 *  - A depth HUD in the corner slowly ticks toward 404m.
 */
export function Ocean404({
  title = "404",
  eyebrow = "Signal lost · 11,034m",
  subtitle = "You've drifted too deep. The surface is waiting.",
  buttonText = "Return to surface",
  onButtonClick,
  bubbleCount = 28,
  showJellyfish = true,
  className = "",
  style,
}: Ocean404Props): React.JSX.Element {
  const bubbles = useMemo(() => generateBubbles(bubbleCount), [bubbleCount]);
  const jellies = useMemo(
    () => (showJellyfish ? generateJellyfish(2) : []),
    [showJellyfish]
  );

  const [poppedBubbles, setPoppedBubbles] = useState<Set<number>>(
    () => new Set()
  );
  const [depth, setDepth] = useState(0);
  const [submarineKey, setSubmarineKey] = useState(0);
  const [anglerKey, setAnglerKey] = useState(0);
  const idleTimerRef = useRef<number | null>(null);

  const handleButtonClick = useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.location.href = "/";
    }
  }, [onButtonClick]);

  const handleBubbleClick = useCallback((id: number) => {
    setPoppedBubbles((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // Let the bubble pop animation play, then release it to rise again.
    window.setTimeout(() => {
      setPoppedBubbles((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 600);
  }, []);

  // Konami easter egg — summon a submarine.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const match = createKonamiMatcher();
    const onKey = (e: KeyboardEvent) => {
      if (match(e.key)) {
        setSubmarineKey((k) => k + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Depth counter — slowly ticks through plausible trench depths, loops past 404m.
  useEffect(() => {
    const id = window.setInterval(() => {
      setDepth((d) => (d + 1) % 11035);
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  // Idle anglerfish — after 18s with no input, a glowing lure drifts past.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const resetIdle = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setAnglerKey((k) => k + 1);
      }, 18000);
    };
    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    events.forEach((ev) => window.addEventListener(ev, resetIdle));
    resetIdle();
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  const depthDisplay = useMemo(() => {
    // Land on 404 every time the counter crosses it, for flavor.
    const value = depth > 11000 ? 11034 : depth === 404 ? 404 : depth;
    return value.toString().padStart(5, "0");
  }, [depth]);

  return (
    <div
      className={`ocean-404-container ${className}`.trim()}
      style={style}
      role="main"
      aria-label="404 Error Page — Ocean"
    >
      <div className="ocean-404-caustics" aria-hidden="true" />
      <div className="ocean-404-vignette" aria-hidden="true" />

      <div className="ocean-404-depth" aria-hidden="true">
        Depth <span className="ocean-404-depth-value">{depthDisplay}m</span>
      </div>
      <div className="ocean-404-coords" aria-hidden="true">
        40°04′04″N · 179°59′59″W
      </div>

      <div className="ocean-404-bubble-field" aria-hidden="true">
        {bubbles.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="ocean-404-bubble"
            style={b.styles as React.CSSProperties}
            data-popped={poppedBubbles.has(b.id) ? "true" : "false"}
            onClick={() => handleBubbleClick(b.id)}
          />
        ))}
      </div>

      {jellies.map((j) => (
        <div
          key={j.id}
          className="ocean-404-jellyfish"
          style={j.style as React.CSSProperties}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: JELLYFISH_SVG }}
        />
      ))}

      {submarineKey > 0 && (
        <div
          key={`sub-${submarineKey}`}
          className="ocean-404-submarine"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: SUBMARINE_SVG }}
        />
      )}

      {anglerKey > 0 && (
        <div
          key={`angler-${anglerKey}`}
          className="ocean-404-angler"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: ANGLER_SVG }}
        />
      )}

      <div className="ocean-404-content">
        <div className="ocean-404-sonar" aria-hidden="true" />
        <span className="ocean-404-eyebrow">{eyebrow}</span>
        <h1 className="ocean-404-title">{title}</h1>
        <p className="ocean-404-subtitle">{subtitle}</p>
        <button
          type="button"
          className="ocean-404-button"
          onClick={handleButtonClick}
          aria-label={buttonText}
        >
          <span aria-hidden="true">↑</span>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Ocean404;
