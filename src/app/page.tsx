import { Filme, getFilmes } from "@/lib/api";
import Hero from "@/components/ui/Hero";
import DashboardStats from "@/components/ui/DashboardStats";
import FilmeGrid from "@/components/ui/FilmeGrid";
import Footer from "@/components/ui/Footer";

export const revalidate = 3600;

export default async function Home() {
  let filmes: Filme[] = [];
  let error: string | null = null;

  try {
    filmes = await getFilmes();
  } catch (e) {
    error = "Não foi possível carregar os filmes. Tente novamente.";
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--black)" }}>
      <Hero />

      {error ? (
        <div
          style={{
            maxWidth: "960px",
            margin: "80px auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>⚠️ {error}</p>
        </div>
      ) : (
        <>
          <hr className="divider" />
          <DashboardStats filmes={filmes} />
          <hr className="divider" />
          <FilmeGrid filmes={filmes} />
        </>
      )}

      <Footer />
    </main>
  );
}
