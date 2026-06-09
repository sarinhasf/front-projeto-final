# 🎬 50 Filmes da História do Cinema

Front-end minimalista e elegante para a API de filmes.

## Stack
- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** (Playfair Display + Inter + JetBrains Mono)
- Gráficos em **SVG puro** (sem dependências)

---

## Instalação

```bash
# No seu projeto Next.js já criado:

# 1. Copie todos os arquivos deste projeto para o seu projeto
#    Substitua src/app/globals.css, src/app/layout.tsx, src/app/page.tsx
#    e adicione todos os arquivos em src/components/ui/ e src/lib/

# 2. Atualize o tailwind.config.ts com o conteúdo do arquivo deste projeto

# 3. Rode o projeto
npm run dev
```

---

## Estrutura

```
src/
├── app/
│   ├── globals.css       ← Design tokens, animações, estilos globais
│   ├── layout.tsx        ← Root layout com metadata
│   └── page.tsx          ← Página principal (Server Component)
│
├── components/ui/
│   ├── Hero.tsx          ← Título animado com contagem regressiva
│   ├── DashboardStats.tsx← Gráficos: origem, top diretores, décadas
│   ├── FilmeGrid.tsx     ← Grid com busca, filtros e ordenação
│   ├── FilmeCard.tsx     ← Card individual de cada filme
│   ├── SearchBar.tsx     ← Barra de pesquisa sticky com filtros
│   └── Footer.tsx        ← Rodapé minimalista
│
└── lib/
    └── api.ts            ← Funções de fetch para a API
```

---

## Features

- **Hero animado** — o número "50" conta do 0 ao 50 na entrada
- **Gráficos SVG nativos** — sem bibliotecas externas
  - Donut chart por décadas com legenda
  - Barras horizontais para top diretores  
  - Barras de progresso para origem (🇧🇷 vs 🌍)
  - Stat cards com números animados
- **Barra sticky** — persiste no topo durante scroll
- **Busca em tempo real** — por título, diretor, ano
- **Filtros** — por década, apenas brasileiros
- **Ordenação** — por ordem original, ano, nome, aprovação
- **Card elegante** — rank, imagem, aprovação visual, badge "Perfeito"
- **Film grain** — textura sutil de película sobre toda a página
- **Responsivo** — mobile-first com grid adaptativo

---

## Paleta de cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--black` | `#0A0A0F` | Fundo |
| `--surface` | `#111118` | Superfícies secundárias |
| `--card` | `#1A1A24` | Cards |
| `--gold` | `#C9A84C` | Accent principal |
| `--cream` | `#F5F0E8` | Texto primário |
| `--cream-dim` | `#A09A8E` | Texto secundário |
