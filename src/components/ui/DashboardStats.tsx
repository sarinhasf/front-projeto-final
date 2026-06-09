"use client";
import { useEffect, useState, useRef } from "react";
import { Filme } from "@/lib/api";

interface Props {
  filmes: Filme[];
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const steps = 40;
    const inc = value / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
}

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
}

function HorizontalBarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {data.map((item, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--cream-dim)" }}>
              {item.label}
            </span>
            <span
              className="mono"
              style={{ fontSize: "0.75rem", color: "var(--gold)" }}
            >
              {item.value}
            </span>
          </div>
          <div
            style={{
              height: "6px",
              background: "var(--border)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(item.value / max) * 100}%`,
                background: item.color ?? "linear-gradient(90deg, var(--gold-dim), var(--gold))",
                borderRadius: "3px",
                transition: "width 1s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DecadePieChart({ filmes }: { filmes: Filme[] }) {
  const decades: Record<string, number> = {};
  filmes.forEach((f) => {
    const decade = Math.floor(f.ano / 10) * 10;
    const label = `${decade}s`;
    decades[label] = (decades[label] ?? 0) + 1;
  });

  const sorted = Object.entries(decades)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([label, count]) => ({ label, count }));

  const total = filmes.length;
  const colors = [
    "#C9A84C", "#8A7035", "#5C4A1E", "#E8C97A", "#A08030",
    "#D4B060", "#7A6028", "#F0D890",
  ];

  // Build SVG donut
  let cumulative = 0;
  const radius = 60;
  const cx = 80;
  const cy = 80;
  const strokeWidth = 22;

  const slices = sorted.map((item, i) => {
    const pct = item.count / total;
    const startAngle = cumulative * 360;
    const endAngle = (cumulative + pct) * 360;
    cumulative += pct;

    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
    const x1 = cx + radius * Math.cos(toRad(startAngle));
    const y1 = cy + radius * Math.sin(toRad(startAngle));
    const x2 = cx + radius * Math.cos(toRad(endAngle));
    const y2 = cy + radius * Math.sin(toRad(endAngle));
    const large = pct > 0.5 ? 1 : 0;

    return {
      ...item,
      color: colors[i % colors.length],
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`,
      pct: Math.round(pct * 100),
    };
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <svg width="160" height="160" viewBox="0 0 160 160">
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill={s.color}
            opacity={0.85}
            stroke="var(--black)"
            strokeWidth="1.5"
          />
        ))}
        <circle cx={cx} cy={cy} r={radius - strokeWidth} fill="var(--card)" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="var(--gold)"
          fontSize="18"
          fontFamily="JetBrains Mono"
          fontWeight="500"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="var(--cream-dim)"
          fontSize="7"
          fontFamily="Inter"
        >
          filmes
        </text>
      </svg>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 16px",
          flex: 1,
          minWidth: "150px",
        }}
      >
        {slices.map((s, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                background: s.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.72rem", color: "var(--cream-dim)" }}>
              {s.label}
            </span>
            <span
              className="mono"
              style={{ fontSize: "0.7rem", color: "var(--gold)" }}
            >
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardStats({ filmes }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const total = filmes.length;
  const brasileiros = filmes.filter((f) => Boolean(f.brasileiro)).length;
  const estrangeiros = total - brasileiros;
  const pctBr = total ? Math.round((brasileiros / total) * 100) : 0;

  // Top diretores
  const diretoresMap: Record<string, number> = {};
  filmes.forEach((f) => {
    if (f.diretor) diretoresMap[f.diretor] = (diretoresMap[f.diretor] ?? 0) + 1;
  });
  const topDiretores = Object.entries(diretoresMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([label, value]) => ({ label, value }));

  // Filmes por ano
  const anoMap: Record<number, number> = {};
  filmes.forEach((f) => {
    anoMap[f.ano] = (anoMap[f.ano] ?? 0) + 1;
  });

  const statCards = [
    { label: "Total de filmes", value: total, suffix: "" },
    { label: "Diretores únicos", value: Object.keys(diretoresMap).length, suffix: "" },
    { label: "Filmes brasileiros", value: brasileiros, suffix: "" },
    { label: "Aprovação máxima", value: 100, suffix: "%" },
  ];

  return (
    <section ref={ref} style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <div style={{ marginBottom: "40px" }}>
          <p
            className="mono"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "8px",
            }}
          >
            acompanhe os
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "var(--cream)",
            }}
          >
            Dados Gerais
          </h2>
        </div>

        {/* Stat cards */}
        <div
          className={visible ? "stagger" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {statCards.map((card, i) => (
            <div
              key={i}
              className={`fade-up card-hover`}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--cream-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {card.label}
              </p>
              <p
                className="mono gold-text"
                style={{ fontSize: "2.2rem", fontWeight: 500, lineHeight: 1 }}
              >
                {visible ? <AnimatedNumber value={card.value} /> : card.value}
                {card.suffix}
              </p>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Brasileiros vs Estrangeiros */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "28px",
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "20px",
              }}
            >
              Origem
            </p>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--cream)" }}>
                  🇧🇷 Brasileiros
                </span>
                <span className="mono" style={{ color: "var(--gold)", fontSize: "0.8rem" }}>
                  {brasileiros} ({pctBr}%)
                </span>
              </div>
              <div
                style={{
                  height: "10px",
                  background: "var(--border)",
                  borderRadius: "5px",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pctBr}%`,
                    background: "linear-gradient(90deg, #2A8A4A, #3FBF6A)",
                    borderRadius: "5px",
                    transition: "width 1.2s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--cream)" }}>
                  🌍 Estrangeiros
                </span>
                <span
                  className="mono"
                  style={{ color: "var(--cream-dim)", fontSize: "0.8rem" }}
                >
                  {estrangeiros} ({100 - pctBr}%)
                </span>
              </div>
              <div
                style={{
                  height: "10px",
                  background: "var(--border)",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${100 - pctBr}%`,
                    background: "linear-gradient(90deg, var(--gold-dim), var(--gold))",
                    borderRadius: "5px",
                    transition: "width 1.2s ease 0.2s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Top diretores */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "28px",
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "20px",
              }}
            >
              Top diretores
            </p>
            <HorizontalBarChart data={topDiretores} />
          </div>

          {/* Filmes por década */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "28px",
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "20px",
              }}
            >
              Filmes por década
            </p>
            <DecadePieChart filmes={filmes} />
          </div>
        </div>
      </div>
    </section>
  );
}
