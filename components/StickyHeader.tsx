"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/lib/navigation";

/** Scroll distance (px) after which the compact header may appear — roughly past the hero. */
const SHOW_AFTER = 640;

/**
 * Compact, blurred header that slides down when you scroll *up* after leaving the hero, and hides
 * again while you scroll down — navigation stays one flick away without covering content.
 * Hidden copies are `inert`, so keyboard and screen-reader users never land in them.
 */
export function StickyHeader() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(y > SHOW_AFTER && y < previous);
  });

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : "-110%" }}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      inert={!visible}
      className="fixed inset-x-0 top-0 z-[70] bg-primary/85 shadow-[0_12px_32px_-16px_rgb(4_8_25/0.55)] backdrop-blur-md"
    >
      <div className="relative container-page flex h-16 items-center justify-between">
        <Logo />

        <nav
          aria-label="Main (compact)"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-body-m lg:flex"
        >
          {mainNav.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-gray-50 transition-colors duration-200 hover:text-lime"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/login"
            className="text-body-m text-gray-50 transition-colors duration-200 hover:text-lime"
          >
            Sign In
          </Link>
          <Button href="/register" className="px-5 py-2 text-label-m">
            Join Us
          </Button>
        </div>

        <MobileMenu items={mainNav} current="/" />
      </div>
    </motion.div>
  );
}
