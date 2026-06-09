export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 0",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <p
            className="display"
            style={{ fontSize: "0.9rem", color: "var(--cream)", fontStyle: "italic" }}
          >
            50 Filmes da História do Cinema
          </p>
          <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "2px" }}>
            Uma curadoria definitiva.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {/* Film strip icon */}
          <div style={{ display: "flex", gap: "3px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: "20px",
                  background: i % 2 === 0 ? "var(--gold-dim)" : "var(--border)",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
          <p className="mono" style={{ fontSize: "0.65rem", color: "var(--muted)" }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
