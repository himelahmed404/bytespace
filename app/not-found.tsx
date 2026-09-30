import type { Metadata } from "next";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { RiseIn } from "@/components/motion/RiseIn";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/Button";
import { GridBackground, REGULAR_GRID_ROWS } from "@/components/ui/GridBackground";

export const metadata: Metadata = {
  title: "Page not found — ByteSpace",
};

/** Figma: lime fading to transparent white, top → bottom, over the "404" glyphs. */
const fadingLime =
  "linear-gradient(to bottom, rgb(212 251 32) 0%, rgb(212 251 32 / 0.96) 25%, rgb(212 251 32 / 0.81) 50%, rgb(212 251 32 / 0.61) 68%, rgb(255 255 255 / 0) 100%)";

/** Branded 404 page (Figma frame "404 Not Found"). */
export default function NotFound() {
  return (
    <>
      <main id="main">
        <section className="relative isolate overflow-hidden bg-primary pb-24 lg:h-[957px] lg:pb-0">
          <GridBackground rows={REGULAR_GRID_ROWS} />
          <SiteHeader current="" className="z-[60]" />

          <div className="relative container-page flex flex-col items-center text-center">
            <RiseIn>
              <p
                aria-hidden
                className="mt-6 bg-clip-text font-heading text-[160px] leading-none font-semibold tracking-[-0.01em] text-transparent sm:text-[280px] lg:mt-10 lg:text-[480px]"
                style={{ backgroundImage: fadingLime }}
              >
                404
              </p>
            </RiseIn>

            {/* Overlaps the faded bottom of the "404", exactly like the design */}
            <div className="-mt-10 flex flex-col items-center gap-8 sm:-mt-[70px] lg:-mt-[119px]">
              <RiseIn delay={0.1}>
                <h1 className="max-w-[935px] font-heading text-[40px]/[48px] font-semibold tracking-[-0.01em] text-white max-lg:text-balance sm:text-[56px]/[67px] lg:text-heading-l">
                  The page you are looking for doesn’t exist
                </h1>
              </RiseIn>
              <RiseIn delay={0.2}>
                <p className="max-w-[486px] text-body-m text-gray-100 sm:text-body-l">
                  Try to use a correct url or go back to homepage to start again
                </p>
              </RiseIn>
              <RiseIn delay={0.3}>
                <Button href="/">Back to Home</Button>
              </RiseIn>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
