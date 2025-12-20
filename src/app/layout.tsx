import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundFlow from "@/components/layout/BackgroundFlow";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matteorossi.dev"),
  title: {
    default: "Mattéo Rossi | Creative Developer & Architect",
    template: "%s | Mattéo Rossi"
  },
  description: "Portfolio of Mattéo Rossi, a Creative Developer and Full-stack Architect specializing in 3D interactions, Next.js, and high-performance web applications.",
  keywords: ["Creative Developer", "Full Stack Engineer", "React", "Next.js", "Three.js", "GSAP", "Freelance"],
  authors: [{ name: "Mattéo Rossi" }],
  creator: "Mattéo Rossi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://matteorossi.dev",
    title: "Mattéo Rossi | Creative Developer",
    description: "Building immersive digital experiences with modern web technologies.",
    siteName: "Mattéo Rossi Portfolio",
    images: [{
      url: "/og-image.jpg", // Assuming an image will exist or generic placeholder
      width: 1200,
      height: 630,
      alt: "Mattéo Rossi Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mattéo Rossi | Creative Developer",
    description: "Building immersive digital experiences with modern web technologies.",
    creator: "@matteorossi", // Placeholder handle
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundFlow />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
