import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import vi from "@/content/vi";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: vi.meta.title,
  description: vi.meta.description,
};

export const viewport: Viewport = {
  themeColor: "#0a1a47",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide animated elements before GSAP runs, without hiding them when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
