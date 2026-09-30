import { Poppins } from "next/font/google";
import localFont from "next/font/local";

/** Headings */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

/** Body copy & labels */
export const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/** "ByteSpace" wordmark */
export const clashDisplay = localFont({
  src: [{ path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" }],
  variable: "--font-clash-display",
  display: "swap",
});
