import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Pixelify_Sans, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REDITUS — Tech Creative Agency",
  description: "Next-gen technology creative agency. WebGL, Three.js, AI pipelines, custom software.",
  keywords: [
    "technology creative agency",
    "WebGL development",
    "Three.js agency",
    "custom software development",
    "AI pipeline engineering",
  ],
  authors: [{ name: "REDITUS Agency" }],
  openGraph: {
    title: "REDITUS — Tech Creative Agency",
    description: "Next-gen technology creative agency.",
    type: "website",
    siteName: "REDITUS",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDITUS — Tech Creative Agency",
    description: "Next-gen technology creative agency.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${pixelifySans.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-[#0B1114] text-[#F1EDE3] font-display selection:bg-[#087F8C] selection:text-[#F1EDE3]">
        {children}
      </body>
    </html>
  );
}