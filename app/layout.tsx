'use client';

import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <title>Grove - Onboarding Inteligente</title>
        <meta name="description" content="Plataforma de onboarding inteligente" />
      </head>
      <body className="h-screen flex overflow-hidden bg-grove-charcoal text-grove-text font-sans">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-hidden bg-gradient-to-br from-[#0a1210] to-[#070b09]">
          {children}
        </main>
      </body>
    </html>
  );
}
