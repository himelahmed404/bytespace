"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type NavItem = { label: string; href: string };

/** Hamburger menu for screens below 1024px. Closes on link click, Escape, or outside click. */
export function MobileMenu({ items, current }: { items: NavItem[]; current: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full text-gray-50 transition-colors hover:bg-white/10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-full rounded-xl bg-white p-6 shadow-[0_24px_48px_-16px_rgb(4_8_25/0.35)] sm:inset-x-6"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={href === current ? "page" : undefined}
                      className="block rounded-md px-3 py-3 text-label-l font-medium text-ink transition-colors hover:bg-gray-50 aria-[current=page]:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <Button href="/login" variant="outline" onClick={close}>
                Sign In
              </Button>
              <Button href="/register" onClick={close}>
                Join Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
