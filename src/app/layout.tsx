import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { ToastContainer } from "@/components/ui/ToastContainer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zsgaming.pk"),
  title: {
    default: "ZS Gaming Store | Custom PC Builds & Gaming Hardware Pakistan",
    template: "%s | ZS Gaming Store Pakistan",
  },
  description:
    "Pakistan's premier custom PC building and hardware store. High-performance gaming PCs, RTX 40-series GPUs, AMD Ryzen AM5 processors, DDR5 memory, and nationwide insured delivery.",
  keywords: [
    "gaming PC in Pakistan",
    "custom gaming PC build",
    "PC components in Pakistan",
    "buy graphics card in Pakistan",
    "PC builder Pakistan",
    "RTX 4080 Super price Pakistan",
    "Ryzen 7800X3D Pakistan",
    "custom PC Lahore Hafeez Centre",
    "custom PC Karachi Techno City",
  ],
  authors: [{ name: "ZS Gaming Store" }],
  creator: "ZS Gaming Store",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://zsgaming.pk",
    siteName: "ZS Gaming Store",
    title: "ZS Gaming Store | Custom Gaming PCs & PC Components Pakistan",
    description:
      "Buy custom gaming PCs, RTX graphics cards, processors, and PC components with official warranty and insured shipping across Pakistan.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "ZS Gaming Store Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZS Gaming Store | Custom PC Builds Pakistan",
    description: "Build your dream gaming PC in Pakistan with 24-hr stress testing & official warranty.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-graphite-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-yellow-400 selection:text-graphite-950">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatbotWidget />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
