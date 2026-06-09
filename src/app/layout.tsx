import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "50 Filmes da História do Cinema",
  description: "Uma curadoria dos 50 maiores filmes já produzidos na história do cinema mundial.",
  openGraph: {
    title: "50 Filmes da História do Cinema",
    description: "Uma curadoria dos 50 maiores filmes já produzidos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
