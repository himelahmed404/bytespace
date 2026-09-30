import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ShadowFilters } from "@/components/ui/ShadowFilters";
import { siteConfig } from "@/lib/site";
import { clashDisplay, poppins, satoshi } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["online courses", "e-learning", "course creators", "ByteSpace"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#003be2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} ${poppins.variable} ${clashDisplay.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-lime focus:px-5 focus:py-3 focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <ShadowFilters />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
