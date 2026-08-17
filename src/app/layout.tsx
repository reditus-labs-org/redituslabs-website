import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "REDITUS — Tech Creative Agency",
  description: "Next-gen technology creative agency. Brutalist-cyberpunk digital experiences. WebGL, Three.js, AI pipelines, custom software.",
  keywords: [
    "technology creative agency",
    "WebGL development",
    "Three.js agency",
    "brutalist design",
    "cyberpunk aesthetic",
    "interactive 3D web",
    "custom software development",
    "AI pipeline engineering",
  ],
  authors: [{ name: "REDITUS Agency" }],
  openGraph: {
    title: "REDITUS — Tech Creative Agency",
    description: "Next-gen technology creative agency. Brutalist-cyberpunk digital experiences.",
    type: "website",
    siteName: "REDITUS",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDITUS — Tech Creative Agency",
    description: "Brutalist-cyberpunk digital experiences.",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-bg text-fg font-mono selection:bg-fg selection:bg">
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}