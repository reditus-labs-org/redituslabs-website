import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REDITUS — We Build What's Possible",
  description:
    "REDITUS is a technology engineering agency building websites, software, AI tools, AI pipelines and SaaS products. We turn vibe-coded applications into production-ready software.",
  keywords: [
    "software development agency",
    "AI development agency",
    "SaaS development",
    "AI pipelines",
    "AI tools development",
    "web development agency",
    "software engineering agency",
    "vibe code rescue",
    "AI application development",
    "custom software development",
  ],
  authors: [{ name: "REDITUS Agency" }],
  openGraph: {
    title: "REDITUS — We Build What's Possible",
    description:
      "RETURN. REIMAGINE. REALIZE. We build digital products, software, AI tools and pipelines, and rescue vibe-coded apps into production software.",
    type: "website",
    siteName: "REDITUS",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDITUS — We Build What's Possible",
    description: "RETURN. REIMAGINE. REALIZE. Software & AI Engineering Studio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
