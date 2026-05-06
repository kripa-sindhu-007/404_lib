import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Channel id displayed in the broadcast HUD (default: "04") */
  channelId?: string;
  /** Whether to show the corner "NO SIGNAL" callout (default: true) */
  showNoSignal?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
}

const MELTDOWN_WORD = "GLITCH";

/**
 * Glitch404 — a corrupted-broadcast 404 page.
 *
 * Atmospherics: chromatic-aberration "404", crawling scanlines, animated
 * static, sync-bar tear, blinking "NO SIGNAL" callout, flickering timecode.
 *
 * Easter eggs:
 *  - Type the word `GLITCH` → 1.6s system meltdown overlay.
 *  - Konami code → "channel flip": palette swaps to a green/red feed.
 *  - Click-and-hold the screen → static intensifies while held.
 */
export function Glitch404({
  title = "404",
  eyebrow = "Transmission interrupted",
  headline = "Page corrupted",
  subtitle = "The signal carrying this page has been lost in transit. Retune.",
  buttonText = "Retune",
  onButtonClick,
  channelId = "04",
  showNoSignal = true,
  className = "",
  style,
}: Glitch404Props): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [meltdown, setMeltdown] = useState(false);
  const [channel, setChannel] = useState<"main" | "alt">("main");
  const [timecode, setTimecode] = useState("88:88:88");
  const [holding, setHolding] = useState(false);
  const meltdownTimerRef = useRef<number | null>(null);
  const channelTimerRef = useRef<number | null>(null);

  const handleButtonClick = useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, [onButtonClick]);

  // Timecode flicker — random timestamps that occasionally land on broken values.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.setInterval(() => {
      const broken = Math.random() < 0.18;
      if (broken) {
        setTimecode("88:88:88");
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
      setTimecode(`${h}:${m}:${s}`);
    }, 720);
    return () => window.clearInterval(id);
  }, []);

  // GLITCH word-typing easter egg + Konami channel flip.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let buffer = "";
    const konami = createKonamiMatcher();

    const onKey = (e: KeyboardEvent) => {
      // Track word for meltdown
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toUpperCase()).slice(-MELTDOWN_WORD.length);
        if (buffer === MELTDOWN_WORD) {
          buffer = "";
          setMeltdown(true);
          if (meltdownTimerRef.current)
            window.clearTimeout(meltdownTimerRef.current);
          meltdownTimerRef.current = window.setTimeout(
            () => setMeltdown(false),
            1600
          );
        }
      }
      // Konami → channel flip
      if (konami(e.key)) {
        setChannel("alt");
        if (channelTimerRef.current)
          window.clearTimeout(channelTimerRef.current);
        channelTimerRef.current = window.setTimeout(
          () => setChannel("main"),
          5000
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (meltdownTimerRef.current)
        window.clearTimeout(meltdownTimerRef.current);
      if (channelTimerRef.current) window.clearTimeout(channelTimerRef.current);
    };
  }, []);

  // Hold-to-intensify static
  const onPointerDown = useCallback(() => setHolding(true), []);
  const onPointerUp = useCallback(() => setHolding(false), []);

  return (
    <div
      ref={containerRef}
      className={`glitch-404-container ${className}`.trim()}
      style={style}
      role="main"
      aria-label="404 Error Page — Glitch"
      data-meltdown={meltdown ? "true" : "false"}
      data-channel={channel}
      onMouseDown={onPointerDown}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
    >
      <div
        className="glitch-404-static"
        aria-hidden="true"
        style={holding ? { opacity: 1 } : undefined}
      />
      <div className="glitch-404-scanlines" aria-hidden="true" />
      <div className="glitch-404-syncbar" aria-hidden="true" />
      <div className="glitch-404-vignette" aria-hidden="true" />

      {/* Top broadcast HUD */}
      <div className="glitch-404-hud" aria-hidden="true">
        <span className="glitch-404-rec">
          <span className="glitch-404-rec-dot" />
          REC
        </span>
        <span className="glitch-404-hud-meta--hide-sm">
          <span className="glitch-404-hud-key">CH</span>{" "}
          <span className="glitch-404-hud-val">{channelId}</span>
        </span>
        <span className="glitch-404-hud-meta--hide-sm">
          <span className="glitch-404-hud-key">FEED</span>{" "}
          <span className="glitch-404-hud-val">
            {channel === "alt" ? "AUX-7" : "PUBLIC-1"}
          </span>
        </span>
        <span className="glitch-404-hud-spacer" />
        <span>
          <span className="glitch-404-hud-key">TX</span>{" "}
          <span className="glitch-404-hud-val">OFFLINE</span>
        </span>
        <span className="glitch-404-timecode">{timecode}</span>
      </div>

      {/* No-signal callout */}
      {showNoSignal && (
        <div className="glitch-404-nosignal" aria-hidden="true">
          NO SIGNAL
        </div>
      )}

      {/* Center stage */}
      <div className="glitch-404-stage">
        <span className="glitch-404-eyebrow">{eyebrow}</span>

        <div className="glitch-404-title-wrap" aria-hidden="false">
          <h1 className="glitch-404-title" data-text={title}>
            {title}
          </h1>
          <span
            className="glitch-404-title-slice glitch-404-title-slice--a"
            aria-hidden="true"
          >
            {title}
          </span>
          <span
            className="glitch-404-title-slice glitch-404-title-slice--b"
            aria-hidden="true"
          >
            {title}
          </span>
        </div>

        <p className="glitch-404-headline">{headline}</p>

        <p className="glitch-404-subtitle">
          {subtitle}
          <span className="glitch-404-cursor" aria-hidden="true" />
        </p>

        <button
          type="button"
          className="glitch-404-button"
          onClick={handleButtonClick}
          aria-label={buttonText}
        >
          <span className="glitch-404-button-arrow" aria-hidden="true">
            ▶
          </span>
          {buttonText}
        </button>
      </div>

      {/* Bottom telemetry */}
      <div className="glitch-404-footer" aria-hidden="true">
        <span className="glitch-404-footer-warn">ERR · 0x404</span>
        <span>·</span>
        <span>frame drop 88%</span>
        <span className="glitch-404-hud-spacer" />
        <span className="glitch-404-hud-meta--hide-sm">
          try ⇧ · type <span className="glitch-404-subtitle-mark">GLITCH</span>
        </span>
      </div>
    </div>
  );
}

export default Glitch404;
