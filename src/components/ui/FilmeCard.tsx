"use client";
import { Filme } from "@/lib/api";
import { useState } from "react";

interface Props {
  filme: Filme;
  rank: number;
}

export default function FilmeCard({ filme, rank }: Props) {
  const [imgError, setImgError] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const aprovacaoNum = parseInt(String(filme.aprovacao ?? "0").replace("%", ""));

  const toggleDescription = () => setShowDescription((prev) => !prev);

  return (
    <article
      className="card-hover"
      role="button"
      tabIndex={0}
      onClick={toggleDescription}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleDescription();
        }
      }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "520px",
        cursor: "pointer",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "2/3",
          background: "var(--surface)",
          overflow: "hidden",
        }}
      >
        {filme.imagem && !imgError ? (
          <img
            src={filme.imagem}
            alt={filme.nome}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, var(--surface) 0%, var(--card) 100%)",
            }}
          >
            <span style={{ fontSize: "3rem", opacity: 0.3 }}>🎬</span>
          </div>
        )}

        {/* Rank badge */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(10,10,15,0.85)",
            border: "1px solid var(--gold-dim)",
            borderRadius: "6px",
            padding: "3px 8px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="mono gold-text"
            style={{ fontSize: "0.7rem", fontWeight: 500 }}
          >
            #{String(rank).padStart(2, "0")}
          </span>
        </div>

        {/* Brazilian badge */}
        {Boolean(filme.brasileiro) && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(10,10,15,0.85)",
              border: "1px solid #2A8A4A",
              borderRadius: "6px",
              padding: "3px 6px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ fontSize: "0.7rem" }}>🇧🇷</span>
          </div>
        )}

        {/* Approval overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "var(--border)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${aprovacaoNum}%`,
              background: "linear-gradient(90deg, var(--gold-dim), var(--gold))",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          className="display"
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "var(--cream)",
            lineHeight: 1.3,
            marginBottom: "4px",
          }}
        >
          {filme.nome}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span
            className="mono"
            style={{ fontSize: "0.72rem", color: "var(--cream-dim)" }}
          >
            {filme.ano}
          </span>
          {filme.diretor && (
            <>
              <span style={{ color: "var(--border)", fontSize: "0.6rem" }}>•</span>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--cream-dim)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {filme.diretor}
              </span>
            </>
          )}
        </div>

        {filme.descricao && (
          <div style={{ marginTop: "8px", flex: 1, display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--cream-dim)",
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: showDescription ? 1000 : 3,
                maxHeight: showDescription ? "none" : "4.5em",
                transition: "max-height 0.3s ease",
              }}
            >
              {filme.descricao}
            </p>
            <span
              style={{
                marginTop: "10px",
                fontSize: "0.76rem",
                color: "var(--gold)",
                textDecoration: "underline",
                alignSelf: "flex-start",
              }}
            >
              {showDescription ? "Ocultar descrição" : "Clique para ver descrição"}
            </span>
          </div>
        )}

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: "0.7rem",
              color: aprovacaoNum >= 99 ? "var(--gold)" : "var(--cream-dim)",
            }}
          >
            ★ {filme.aprovacao}
          </span>
          {aprovacaoNum >= 99 && (
            <span
              className="badge"
              style={{
                background: "var(--gold-glow)",
                border: "1px solid var(--gold-dim)",
                borderRadius: "4px",
                padding: "2px 6px",
                color: "var(--gold)",
              }}
            >
              Perfeito
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
