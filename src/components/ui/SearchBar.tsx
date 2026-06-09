"use client";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  filterBr: boolean;
  onFilterBr: (v: boolean) => void;
  filterDecade: string;
  onFilterDecade: (v: string) => void;
  sortBy: string;
  onSortBy: (v: string) => void;
  decades: string[];
  total: number;
  filtered: number;
}

export default function SearchBar({
  search, onSearch,
  filterBr, onFilterBr,
  filterDecade, onFilterDecade,
  sortBy, onSortBy,
  decades,
  total, filtered,
}: Props) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "20px 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
              fontSize: "0.85rem",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar por título, diretor..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              width: "100%",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "9px 14px 9px 36px",
              color: "var(--cream)",
              fontSize: "0.85rem",
              fontFamily: "Inter, sans-serif",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          />
        </div>

        {/* Decade filter */}
        <select
          value={filterDecade}
          onChange={(e) => onFilterDecade(e.target.value)}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "9px 12px",
            color: filterDecade ? "var(--cream)" : "var(--muted)",
            fontSize: "0.8rem",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
          }}
        >
          <option value="">Todas as décadas</option>
          {decades.map((d) => (
            <option key={d} value={d}>
              {d}s
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortBy(e.target.value)}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "9px 12px",
            color: "var(--cream)",
            fontSize: "0.8rem",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
          }}
        >
          <option value="id">Ordem original</option>
          <option value="ano_asc">Ano ↑</option>
          <option value="ano_desc">Ano ↓</option>
          <option value="nome">A → Z</option>
          <option value="aprovacao">Aprovação</option>
        </select>

        {/* BR filter toggle */}
        <button
          onClick={() => onFilterBr(!filterBr)}
          style={{
            background: filterBr ? "var(--gold-glow)" : "var(--card)",
            border: `1px solid ${filterBr ? "var(--gold-dim)" : "var(--border)"}`,
            borderRadius: "8px",
            padding: "9px 14px",
            color: filterBr ? "var(--gold)" : "var(--cream-dim)",
            fontSize: "0.8rem",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          🇧🇷 Brasileiros
        </button>

        {/* Counter */}
        <span
          className="mono"
          style={{
            fontSize: "0.72rem",
            color: "var(--muted)",
            whiteSpace: "nowrap",
            marginLeft: "auto",
          }}
        >
          {filtered === total ? total : `${filtered} de ${total}`} filmes
        </span>
      </div>
    </div>
  );
}
