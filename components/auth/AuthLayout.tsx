import type { ReactNode } from "react";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { RiseIn } from "@/components/motion/RiseIn";
import { GridBackground, REGULAR_GRID_ROWS } from "@/components/ui/GridBackground";
import { Logo } from "@/components/ui/Logo";

type AuthLayoutProps = {
  /** Intro on the blue side, e.g. "Sign in with ease". */
  title: string;
  description: string;
  /** The form card content (it provides the page's `<h1>`). */
  children: ReactNode;
};

/**
 * Shared shell of the Login / Register pages.
 * ≥1280px: the Figma layout — everything absolutely placed on the centered 1440×1024 frame.
 * Smaller screens: logo, intro and the form card stack in normal flow (the collage is hidden).
 */
export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <main
      id="main"
      className="relative isolate min-h-screen overflow-hidden bg-primary pb-16 xl:min-h-[1024px] xl:pb-0"
    >
      <GridBackground rows={REGULAR_GRID_ROWS} />

      <div className="relative xl:absolute xl:top-0 xl:left-[calc(50%-720px)] xl:h-[1024px] xl:w-[1440px]">
        <header className="container-page flex h-20 items-center xl:absolute xl:top-[35px] xl:left-[122px] xl:h-auto xl:w-auto xl:px-0">
          <Logo markOnly />
        </header>

        <div className="container-page xl:contents">
          {/* Centered 579px column on phones & tablets; dissolves into the absolute layout at xl */}
          <div className="mx-auto flex w-full max-w-[579px] flex-col gap-8 xl:contents">
            <RiseIn className="flex flex-col gap-4 text-gray-50 xl:absolute xl:top-[120px] xl:left-[122px] xl:w-[475px]">
              <p className="font-heading text-heading-xs font-semibold">{title}</p>
              <p className="max-w-[475px] text-body-m sm:text-body-l">{description}</p>
            </RiseIn>

            <div className="hidden xl:block">
              <AuthShowcase />
            </div>

            <RiseIn
              delay={0.1}
              className="w-full max-w-[579px] rounded-xl bg-white px-6 py-8 sm:px-10 sm:py-12 xl:absolute xl:top-[120px] xl:left-[741px] xl:min-h-[784px] xl:w-[579px] xl:max-w-none xl:px-[63px] xl:pt-[61px] xl:pb-10"
            >
              {children}
            </RiseIn>
          </div>
        </div>
      </div>
    </main>
  );
}
