import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces)",
  display: "swap"
});

export const metadata: Metadata = {
  title: "BharatSetu | Hyperlocal Travel & Local Service Booking Platform",
  description: "Connect directly with verified local homestays, temple guides, pilgrimage packages, and artisans across India with instant WhatsApp confirmations."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} suppressHydrationWarning`}>
      <body className="min-h-screen flex flex-col bg-base dark:bg-base-dark text-charcoal dark:text-gray-100 selection:bg-terracotta/20 selection:text-terracotta">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
