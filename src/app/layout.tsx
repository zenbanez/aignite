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
  title: "Project AIgnite",
  description: "The Digital Atelier for professional growth",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { MasteryProvider } from "@/context/MasteryContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${manrope.variable} antialiased bg-surface text-on-surface font-sans`}>
        <AuthProvider>
          <MasteryProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
          </MasteryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
