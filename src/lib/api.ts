const BASE_URL = "https://api-projeto-final.vercel.app/api";

export interface Filme {
  id: number;
  nome: string;
  brasileiro: boolean;
  ano: number;
  diretor: string;
  aprovacao: string;
  imagem: string;
  descricao: string;
}

export interface Dashboard {
  total_filmes: number;
  filmes_brasileiros: number;
  mais_99_aprovacao: number;
  antes_2000: number;
  diretor_top: string;
  qtd_diretor: number;
}

export async function getFilmes(): Promise<Filme[]> {
  const res = await fetch(`${BASE_URL}/filmes`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Falha ao buscar filmes");
  return res.json();
}

export async function getDashboard(): Promise<Dashboard> {
  const res = await fetch(`${BASE_URL}/dashboard`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Falha ao buscar dashboard");
  return res.json();
}

export async function getFilme(id: number): Promise<Filme> {
  const res = await fetch(`${BASE_URL}/filmes/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Filme não encontrado");
  return res.json();
}
