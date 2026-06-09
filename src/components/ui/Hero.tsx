"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Count-up animation for the "50"
    let start = 0;
    const end = 50;
    const duration = 1200;
    const step = duration / end;
    const el = numRef.current;
    if (!el) return;

    const timer = setInterval(() => {
      start++;
      el.textContent = String(start).padStart(2, "0");
      if (start >= end) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      style={{
        background: "var(--black)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 0 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at center, #C9A84C0A 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Film strip decoration top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: "repeating-linear-gradient(90deg, var(--gold-dim) 0px, var(--gold-dim) 16px, transparent 16px, transparent 24px)",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p
          className="mono"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "24px",
            opacity: 0.8,
          }}
        >
          Os melhores
        </p>

        {/* Main title */}
        <h1
          className="display"
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          <span
            className="gold-text"
            style={{ display: "inline-block" }}
          >
            <span ref={numRef} style={{ fontVariantNumeric: "tabular-nums" }}>
              00
            </span>
          </span>
          <br />
          <span style={{ color: "var(--cream)", fontSize: "0.55em", fontWeight: 400, fontStyle: "italic" }}>
            filmes da história
          </span>
        </h1>

        <h2
          className="display"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.6rem)",
            fontWeight: 400,
            color: "var(--cream-dim)",
            marginTop: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          do cinema
        </h2>

        <hr className="divider" style={{ margin: "32px auto", maxWidth: "120px" }} />

        <p
          style={{
            color: "var(--cream-dim)",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Obras que definiram gerações, romperam barreiras e moldaram a linguagem do cinema.
          Uma lista com aprovação crítica de até{" "}
          <span style={{ color: "var(--gold)" }}>100%</span>.
        </p>
      </div>

      {/* Film strip decoration bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: "repeating-linear-gradient(90deg, var(--gold-dim) 0px, var(--gold-dim) 16px, transparent 16px, transparent 24px)",
          opacity: 0.3,
        }}
      />
    </header>
  );
}
