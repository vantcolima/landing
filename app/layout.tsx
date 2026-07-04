import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Vant — Tecnología hecha a tu medida',
  description: 'Diseñamos y construimos apps, sitios web y sistemas a la medida para negocios que ya no caben en una plantilla genérica.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-ink font-sans text-white antialiased">{children}</body>
    </html>
  );
}