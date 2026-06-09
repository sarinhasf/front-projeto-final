"use client";
import { useState, useMemo } from "react";
import { Filme } from "@/lib/api";
import FilmeCard from "./FilmeCard";
import SearchBar from "./SearchBar";

interface Props {
  filmes: Filme[];
}

export default function FilmeGrid({ filmes }: Props) {
  const [search, setSearch] = useState("");
  const [filterBr, setFilterBr] = useState(false);
  const [filterDecade, setFilterDecade] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const decades = useMemo(() => {
    const set = new Set<string>();
    filmes.forEach((f) => {
      if (f.ano) set.add(String(Math.floor(f.ano / 10) * 10));
    });
    return Array.from(set).sort();
  }, [filmes]);

  const filtered = useMemo(() => {
    let list = [...filmes];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.nome?.toLowerCase().includes(q) ||
          f.diretor?.toLowerCase().includes(q) ||
          String(f.ano).includes(q)
      );
    }

    if (filterBr) list = list.filter((f) => Boolean(f.brasileiro));

    if (filterDecade) {
      const dec = parseInt(filterDecade);
      list = list.filter((f) => Math.floor(f.ano / 10) * 10 === dec);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "ano_asc") return a.ano - b.ano;
      if (sortBy === "ano_desc") return b.ano - a.ano;
      if (sortBy === "nome") return a.nome.localeCompare(b.nome, "pt-BR");
      if (sortBy === "aprovacao") {
        const pa = parseInt(String(a.aprovacao ?? "0").replace("%", ""));
        const pb = parseInt(String(b.aprovacao ?? "0").replace("%", ""));
        return pb - pa;
      }
      // default: original order by id desc
      return b.id - a.id;
    });

    return list;
  }, [filmes, search, filterBr, filterDecade, sortBy]);

  return (
    <>
      <SearchBar
        search={search}
        onSearch={setSearch}
        filterBr={filterBr}
        onFilterBr={setFilterBr}
        filterDecade={filterDecade}
        onFilterDecade={setFilterDecade}
        sortBy={sortBy}
        onSortBy={setSortBy}
        decades={decades}
        total={filmes.length}
        filtered={filtered.length}
      />

      <section style={{ padding: "48px 0 80px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
          {/* Section header */}
          <div style={{ marginBottom: "32px" }}>
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
              A seleção
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 700,
                color: "var(--cream)",
              }}
            >
              Os filmes
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--muted)",
              }}
            >
              <p style={{ fontSize: "2rem", marginBottom: "12px" }}>🎬</p>
              <p className="display" style={{ fontSize: "1.1rem", marginBottom: "4px", color: "var(--cream-dim)" }}>
                Nenhum filme encontrado
              </p>
              <p style={{ fontSize: "0.8rem" }}>Tente outros termos de busca ou remova os filtros.</p>
            </div>
          ) : (
            <div
              className="stagger"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "20px",
                alignItems: "stretch",
              }}
            >
              {filtered.map((filme, i) => (
                <div key={filme.id} className="fade-up" style={{ height: "100%" }}>
                  <FilmeCard filme={filme} rank={i + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
