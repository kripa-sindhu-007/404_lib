import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ORBIT_SVG, ROCKET_SVG } from "../../core/assets";

export interface Space404Props {
  /** Title text (default: "404") */
  title?: string;
  /** Small caption above the title (default: "SIGNAL LOST") */
  eyebrow?: string;
  /** Headline shown below the title (default: "OFF-NOMINAL TRAJECTORY DETECTED") */
  headline?: string;
  /** Longer subtitle / copy */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** Callback when the action button is clicked */
  onButtonClick?: () => void;
  /** Mission identifier shown in the status bar (default: "APOLLO · LM-404") */
  missionId?: string;
  /** Whether to render the orbital diagnostic (default: true) */
  showOrbit?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
}

const TELEMETRY_BASE = {
  altitude: 94203,
  velocity: 7784,
  bearing: 137,
  signal: -92,
};

const TRANSMISSION_LINES = [
  "SIGNAL LOST // COORDINATES UNKNOWN // REQUESTING RE-VECTOR",
  "TELEMETRY DRIFT DETECTED // TRAJECTORY DEVIATION Δ 0.404 RAD",
  "ATTEMPTING UPLINK // CHECK HANDOVER TO RECOVERY",
  "REROUTING THROUGH DEEP SPACE NETWORK // PLEASE STAND BY",
];

const IDLE_LOG = "> PRIVATE LOG: see you on the pad.";

function useTicker(initialLines: string[]): string {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const current = initialLines[index % initialLines.length];
    if (chars < current.length) {
      const t = window.setTimeout(() => setChars((c) => c + 1), 28);
      return () => window.clearTimeout(t);
    }
    const hold = window.setTimeout(() => {
      setChars(0);
      setIndex((i) => i + 1);
    }, 2400);
    return () => window.clearTimeout(hold);
  }, [chars, index, initialLines]);

  const current = initialLines[index % initialLines.length];
  return current.slice(0, chars);
}

/**
 * Space404 — Apollo-era mission-control 404.
 *
 * Subtle motion: drifting scanlines, rotating orbital rings, occasional
 * CRT glitch on the title, amber LED blink, cursor blink, typing ticker.
 *
 * Easter eggs:
 *  - Click the off-nominal spacecraft dot → morse burst ("S O S").
 *  - Type "APOLLO" anywhere → a small rocket launches.
 *  - Hold Shift → CRT effect intensifies.
 *  - ~22s idle → a private log line appears in the transmission.
 */
export function Space404({
  title = "404",
  eyebrow = "SIGNAL LOST · UPLINK DEGRADED",
  headline = "OFF-NOMINAL TRAJECTORY DETECTED",
  subtitle = "The page you requested has drifted outside the nominal envelope. Re-establishing uplink with base.",
  buttonText = "RE-VECTOR TO BASE",
  onButtonClick,
  missionId = "APOLLO · LM-404",
  showOrbit = true,
  className = "",
  style,
}: Space404Props): React.JSX.Element {
  const [intensify, setIntensify] = useState(false);
  const [morseKey, setMorseKey] = useState(0);
  const [rocketKey, setRocketKey] = useState(0);
  const [showIdleLog, setShowIdleLog] = useState(false);
  const [telemetryTick, setTelemetryTick] = useState(0);
  const idleTimerRef = useRef<number | null>(null);
  const apolloBufferRef = useRef<string>("");

  const baseTicker = useTicker(TRANSMISSION_LINES);

  const handleButtonClick = useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.location.href = "/";
    }
  }, [onButtonClick]);

  const handleCraftClick = useCallback(() => {
    setMorseKey((k) => k + 1);
  }, []);

  // Telemetry tick — small jitter applied to base values.
  useEffect(() => {
    const id = window.setInterval(() => setTelemetryTick((t) => t + 1), 900);
    return () => window.clearInterval(id);
  }, []);

  // Keyboard easter eggs: Shift-hold intensify + "APOLLO" to launch rocket.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIntensify(true);

      if (e.key.length === 1) {
        const next = (apolloBufferRef.current + e.key.toUpperCase()).slice(-6);
        apolloBufferRef.current = next;
        if (next === "APOLLO") {
          apolloBufferRef.current = "";
          setRocketKey((k) => k + 1);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIntensify(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Idle private-log easter egg.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reset = () => {
      setShowIdleLog(false);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(
        () => setShowIdleLog(true),
        22000
      );
    };
    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll",
    ];
    events.forEach((ev) => window.addEventListener(ev, reset));
    reset();
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, reset));
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  const telemetry = useMemo(() => {
    const t = telemetryTick;
    const jitter = (magnitude: number) =>
      Math.round((Math.sin(t * 0.7) + Math.cos(t * 1.3)) * magnitude);
    return {
      altitude: TELEMETRY_BASE.altitude + jitter(8),
      velocity: TELEMETRY_BASE.velocity + jitter(3),
      bearing: (TELEMETRY_BASE.bearing + jitter(2) + 360) % 360,
      signal: TELEMETRY_BASE.signal + jitter(1),
    };
  }, [telemetryTick]);

  const rocketX = useMemo(() => 20 + Math.random() * 60, [rocketKey]);

  return (
    <div
      className={`space-404-container ${className}`.trim()}
      style={style}
      data-intensify={intensify ? "true" : "false"}
      role="main"
      aria-label="404 Error Page — Mission Control"
    >
      <div className="space-404-scanlines" aria-hidden="true" />

      {/* Top status bar */}
      <div className="space-404-statusbar">
        <span className="space-404-led" aria-hidden="true" />
        <span className="space-404-statusbar-label">{missionId}</span>
        <span className="space-404-spacer" />
        <span>FLT 04:0404</span>
        <span className="space-404-spacer" />
        <span className="space-404-warn">⚠ LINK FAULT</span>
      </div>

      {/* Main stage */}
      <div className="space-404-stage">
        {/* Left rail: trajectory telemetry */}
        <aside
          className="space-404-rail space-404-rail--left"
          aria-hidden="true"
        >
          <div className="space-404-rail-heading">TRAJECTORY</div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">ALT</span>
            <span className="space-404-rail-val">
              {telemetry.altitude.toLocaleString()} m
            </span>
          </div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">VEL</span>
            <span className="space-404-rail-val">
              {telemetry.velocity.toLocaleString()} m/s
            </span>
          </div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">BRG</span>
            <span className="space-404-rail-val">
              {telemetry.bearing.toString().padStart(3, "0")}°
            </span>
          </div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">SIG</span>
            <span className="space-404-rail-val">{telemetry.signal} dBm</span>
          </div>
          <div className="space-404-rail-heading" style={{ marginTop: "1rem" }}>
            CHECKLIST
          </div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">S-IVB BURN</span>
            <span className="space-404-rail-val">OK</span>
          </div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">TLI</span>
            <span className="space-404-rail-val">OK</span>
          </div>
          <div className="space-404-rail-row">
            <span className="space-404-rail-key">ROUTE</span>
            <span className="space-404-rail-val" style={{ color: "#ff3d3d" }}>
              FAIL
            </span>
          </div>
        </aside>

        {/* Center */}
        <div className="space-404-content">
          <span className="space-404-eyebrow">{eyebrow}</span>
          <h1 className="space-404-title" data-text={title}>
            {title}
          </h1>
          <p className="space-404-headline">{headline}</p>
          {showOrbit && (
            <div className="space-404-orbit" aria-hidden="true">
              <OrbitDiagram onCraftClick={handleCraftClick} />
            </div>
          )}
          <p className="space-404-subtitle">{subtitle}</p>
          <button
            type="button"
            className="space-404-button"
            onClick={handleButtonClick}
            aria-label={buttonText}
          >
            <span className="space-404-button-bracket">[</span>
            {buttonText}
            <span className="space-404-button-bracket">]</span>
          </button>
        </div>

        {/* Right rail: systems */}
        <aside
          className="space-404-rail space-404-rail--right"
          aria-hidden="true"
        >
          <div className="space-404-rail-heading">SYSTEMS</div>
          <div className="space-404-rail-row space-404-rail-row--right">
            <span className="space-404-rail-key">PWR</span>
            <span className="space-404-rail-val">28.4 V</span>
          </div>
          <div className="space-404-rail-row space-404-rail-row--right">
            <span className="space-404-rail-key">O₂</span>
            <span className="space-404-rail-val">84.2%</span>
          </div>
          <div className="space-404-rail-row space-404-rail-row--right">
            <span className="space-404-rail-key">CPU</span>
            <span className="space-404-rail-val">AGC NOM</span>
          </div>
          <div className="space-404-rail-row space-404-rail-row--right">
            <span className="space-404-rail-key">TEMP</span>
            <span className="space-404-rail-val">-118°C</span>
          </div>
          <div className="space-404-rail-heading" style={{ marginTop: "1rem" }}>
            TIPS
          </div>
          <div
            className="space-404-rail-row space-404-rail-row--right"
            style={{ opacity: 0.7 }}
          >
            <span
              className="space-404-rail-key"
              style={{ fontSize: "8px", letterSpacing: "0.25em" }}
            >
              HINT
            </span>
            <span
              className="space-404-rail-val"
              style={{
                fontSize: "10px",
                textTransform: "none",
                letterSpacing: 0,
              }}
            >
              try ⇧, or type APOLLO
            </span>
          </div>
        </aside>
      </div>

      {/* Transmission ticker */}
      <div className="space-404-ticker" aria-live="polite">
        <span className="space-404-ticker-prompt">&gt; TRANSMIT</span>
        <span className="space-404-ticker-text">
          {baseTicker}
          {showIdleLog ? `  ${IDLE_LOG}` : ""}
          <span className="space-404-ticker-cursor" aria-hidden="true" />
        </span>
      </div>

      <div className="space-404-vignette" aria-hidden="true" />

      {/* Easter egg: morse burst */}
      {morseKey > 0 && (
        <div
          key={`morse-${morseKey}`}
          className="space-404-morse"
          aria-hidden="true"
        >
          · · · — — — · · ·
        </div>
      )}

      {/* Easter egg: APOLLO rocket */}
      {rocketKey > 0 && (
        <div
          key={`rocket-${rocketKey}`}
          className="space-404-rocket"
          style={{ ["--rocket-x" as string]: `${rocketX}%` }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: ROCKET_SVG }}
        />
      )}
    </div>
  );
}

/** Orbit diagram — stitched to the base SVG so we can wire the craft click. */
function OrbitDiagram({
  onCraftClick,
}: {
  onCraftClick: () => void;
}): React.JSX.Element {
  // Render the base SVG with a click-through overlay on the craft dot.
  return (
    <div style={{ position: "relative" }}>
      <div dangerouslySetInnerHTML={{ __html: ORBIT_SVG }} />
      <button
        type="button"
        onClick={onCraftClick}
        aria-label="Ping off-nominal spacecraft"
        title="Ping spacecraft"
        style={{
          position: "absolute",
          left: "calc(60 / 320 * 100%)",
          top: "calc(144 / 180 * 100%)",
          width: 28,
          height: 28,
          transform: "translate(-50%, -50%)",
          background: "transparent",
          border: 0,
          padding: 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default Space404;
