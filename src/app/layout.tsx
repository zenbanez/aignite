import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aignite.banezglobal.com"),
  title: {
    default: "Project AIgnite | The Digital Atelier",
    template: "%s | Project AIgnite"
  },
  description: "The Digital Atelier for professional growth. Empowering Filipino educators with AI-driven pedagogical tools and intelligence.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Project AIgnite | The Digital Atelier",
    description: "Empowering Filipino educators with AI-driven pedagogical tools and intelligence.",
    url: "https://aignite.banezglobal.com",
    siteName: "Project AIgnite",
    images: [
      {
        url: "/ebook-cover-wide-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Project AIgnite - The Digital Atelier",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project AIgnite | The Digital Atelier",
    description: "Empowering Filipino educators with AI-driven pedagogical tools and intelligence.",
    images: ["/ebook-cover-wide-v2.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/icons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StructuredData from "@/components/StructuredData";
import { AuthProvider } from "@/context/AuthContext";
import { MasteryProvider } from "@/context/MasteryContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <StructuredData />
      </head>
      <body className={`${notoSerif.variable} ${manrope.variable} antialiased bg-surface text-on-surface font-sans`}>
        <AuthProvider>
          <MasteryProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <ChatWidget />
          </MasteryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
