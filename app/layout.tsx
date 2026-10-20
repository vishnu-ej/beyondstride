import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeyondStride — Break Your Baseline. Step Beyond.",
  description:
    "Next-generation precision-engineered athletic performance house. Purposeful biomechanics, technical fabric intelligence, and editorial silhouettes.",
  openGraph: {
    title: "BeyondStride — Break Your Baseline. Step Beyond.",
    description:
      "Precision-engineered performance essentials built for intentional progress and personal records.",
    type: "website",
  },
};

export function generateViewport() {
  return { themeColor: "#F4EFEA" };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full selection:bg-[#F3B39C] selection:text-[#231F20]">{children}</body>
    </html>
  );
}
