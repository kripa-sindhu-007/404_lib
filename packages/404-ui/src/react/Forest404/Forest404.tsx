import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  generateFireflies,
  generateLeaves,
  createKonamiMatcher,
} from "../../core/utils";
import { COMPASS_SVG, LEAF_SVG, FOX_SVG, MOTH_SVG } from "../../core/assets";

export interface Forest404Props {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title */
  eyebrow?: string;
  /** Italic line under the 404 (e.g. "The trail forks here.") */
  headline?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Coordinate string shown in the trail HUD (default: "47°23′N · 122°02′W") */
  coordinates?: string;
  /** Number of pulsing fireflies (default: 22) */
  fireflyCount?: number;
  /** Number of falling birch leaves (default: 14) */
  leafCount?: number;
  /** Whether to show the canopy treeline silhouettes (default: true) */
  showTreeline?: boolean;
  /** Whether to show the marginalia ranger's note (default: true) */
  showNote?: string | boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
}

const BLOOM_WORD = "MOSS";
const DEFAULT_NOTE =
  "“The map said this trail looped — it doesn't. Mark waypoint 404 and turn back before dusk.”\n— Field journal, 1958";

/**
 * Forest404 — an old-growth temperate-rainforest 404 page.
 *
 * Atmosphere: drifting twilight fog, swaying canopy silhouettes, a hand-drawn
 * compass with a wobbling needle, pulsing fireflies, falling birch leaves,
 * a rangery serif "404" with golden ember glow.
 *
 * Easter eggs:
 *  - Click any firefly → it bursts in a soft flash.
 *  - Type the word `MOSS` → spring bloom: palette warms toward fresher greens.
 *  - Konami code → a fox pads across the forest floor.
 *  - After ~18s of idle time, a luminous moth flutters across the canopy.
 */
export function Forest404({
  title = "404",
  eyebrow = "Trail uncharted",
  headline = "The path forks here.",
  subtitle = "You've wandered off the map. The grove is quiet, the moss is patient — find your bearings and head back.",
  buttonText = "Find your bearings",
  onButtonClick,
  coordinates = "47°23′N · 122°02′W",
  fireflyCount = 22,
  leafCount = 14,
  showTreeline = true,
  showNote = true,
  className = "",
  style,
}: Forest404Props): React.JSX.Element {
  const fireflies = useMemo(
    () => generateFireflies(fireflyCount),
    [fireflyCount]
  );
  const leaves = useMemo(() => generateLeaves(leafCount), [leafCount]);

  const [burstFireflies, setBurstFireflies] = useState<Set<number>>(
    () => new Set()
  );
  const [bloom, setBloom] = useState(false);
  const [foxKey, setFoxKey] = useState(0);
  const [mothKey, setMothKey] = useState(0);
  const [altitude, setAltitude] = useState(312);

  const bloomTimerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  const handleButtonClick = useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, [onButtonClick]);

  const handleFireflyClick = useCallback((id: number) => {
    setBurstFireflies((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    window.setTimeout(() => {
      setBurstFireflies((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 700);
  }, []);

  // MOSS easter egg + Konami fox.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let buffer = "";
    const konami = createKonamiMatcher();

    const onKey = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toUpperCase()).slice(-BLOOM_WORD.length);
        if (buffer === BLOOM_WORD) {
          buffer = "";
          setBloom(true);
          if (bloomTimerRef.current) window.clearTimeout(bloomTimerRef.current);
          bloomTimerRef.current = window.setTimeout(
            () => setBloom(false),
            5000
          );
        }
      }
      if (konami(e.key)) {
        setFoxKey((k) => k + 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (bloomTimerRef.current) window.clearTimeout(bloomTimerRef.current);
    };
  }, []);

  // Idle moth — after 18s with no input, a glowing moth crosses the canopy.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const resetIdle = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setMothKey((k) => k + 1);
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

  // Altimeter — slowly drifts within a plausible foothill range.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setInterval(() => {
      setAltitude((a) => {
        const drift = Math.random() < 0.5 ? -1 : 1;
        const next = a + drift;
        if (next < 280) return 281;
        if (next > 340) return 339;
        return next;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  const noteText = useMemo(() => {
    if (showNote === false) return null;
    if (typeof showNote === "string") return showNote;
    return DEFAULT_NOTE;
  }, [showNote]);

  return (
    <div
      className={`forest-404-container ${className}`.trim()}
      style={style}
      role="main"
      aria-label="404 Error Page — Forest"
      data-bloom={bloom ? "true" : "false"}
    >
      {showTreeline && (
        <>
          <div
            className="forest-404-treeline forest-404-treeline--left"
            aria-hidden="true"
          />
          <div
            className="forest-404-treeline forest-404-treeline--right"
            aria-hidden="true"
          />
        </>
      )}

      <div className="forest-404-fog" aria-hidden="true" />
      <div className="forest-404-vignette" aria-hidden="true" />

      <div className="forest-404-firefly-field" aria-hidden="true">
        {fireflies.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="forest-404-firefly"
            style={f.styles as React.CSSProperties}
            data-burst={burstFireflies.has(f.id) ? "true" : "false"}
            onClick={() => handleFireflyClick(f.id)}
          />
        ))}
      </div>

      <div className="forest-404-leaf-field" aria-hidden="true">
        {leaves.map((l) => (
          <span
            key={l.id}
            className="forest-404-leaf"
            style={l.styles as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: LEAF_SVG }}
          />
        ))}
      </div>

      {/* Trail HUD */}
      <div className="forest-404-statusbar" aria-hidden="true">
        <span className="forest-404-trailmark">Waypoint 404 · Lost</span>
        <span className="forest-404-status-meta--hide-sm">
          <span className="forest-404-status-key">Lat/Lon</span>{" "}
          <span className="forest-404-status-val">{coordinates}</span>
        </span>
        <span className="forest-404-status-spacer" />
        <span>
          <span className="forest-404-status-key">Alt</span>{" "}
          <span className="forest-404-status-val">{altitude}m</span>
        </span>
        <span className="forest-404-status-meta--hide-sm">
          <span className="forest-404-status-key">Wind</span>{" "}
          <span className="forest-404-status-val">ESE 4kt</span>
        </span>
      </div>

      {noteText && (
        <aside className="forest-404-note" aria-hidden="true">
          {noteText}
        </aside>
      )}

      {/* Center stage */}
      <div className="forest-404-stage">
        <div
          className="forest-404-compass"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: COMPASS_SVG }}
        />

        <span className="forest-404-eyebrow">{eyebrow}</span>

        <div className="forest-404-title-wrap">
          <span className="forest-404-title-shadow" aria-hidden="true">
            {title}
          </span>
          <h1 className="forest-404-title">{title}</h1>
        </div>

        <p className="forest-404-headline">{headline}</p>
        <p className="forest-404-subtitle">{subtitle}</p>

        <button
          type="button"
          className="forest-404-button"
          onClick={handleButtonClick}
          aria-label={buttonText}
        >
          <span className="forest-404-button-arrow" aria-hidden="true">
            ↗
          </span>
          {buttonText}
        </button>
      </div>

      {/* Footer telemetry */}
      <div className="forest-404-footer" aria-hidden="true">
        <span className="forest-404-footer-warn">SIGNAL · WEAK</span>
        <span>·</span>
        <span>Last fix 02:14 ago</span>
        <span className="forest-404-status-spacer" />
        <span className="forest-404-status-meta--hide-sm">
          try ↑↑↓↓ · type MOSS
        </span>
      </div>

      {foxKey > 0 && (
        <div
          key={`fox-${foxKey}`}
          className="forest-404-fox"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: FOX_SVG }}
        />
      )}

      {mothKey > 0 && (
        <div
          key={`moth-${mothKey}`}
          className="forest-404-moth"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: MOTH_SVG }}
        />
      )}
    </div>
  );
}

export default Forest404;
