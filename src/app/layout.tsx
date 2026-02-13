import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import GlobalCursorLight from "@/components/GlobalCursorLight";
import Navbar from "@/components/Navbar";
import ScrollToTopOnRouteChange from "@/components/ScrollToTopOnRouteChange";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tractor Plant",
  description: "Premium tractors for agriculture and construction",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="global-video-bg" aria-hidden="true">
          <video
            className="global-video"
            src="/videos/bg2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="global-video-overlay" />
          <div className="global-light-beams absolute inset-0 pointer-events-none" />
        </div>

        {/* animated background layers */}
        <div className="site-bg" />
        <div className="site-glowA" />
        <div className="site-glowB" />
        <div className="site-shimmer" />
        <div className="site-grid" />
        <div className="site-noise" />
        <ScrollToTopOnRouteChange />
        <GlobalCursorLight />
        <Navbar />
        <div className="relative z-10 pt-24">{children}</div>
      </body>
    </html>
  );
}




