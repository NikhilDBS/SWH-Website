import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Standard Wear House — Bespoke Tailoring, Bengaluru",
  description:
    "Standard Wear House is a contemporary Bengaluru tailoring house. Bespoke suits, shirts, trousers and ethnic tailoring, made patiently in Bengaluru.",
  icons: { icon: "/images/logo-main.png" },
};

export const viewport: Viewport = {
  themeColor: "#F3F0E9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
