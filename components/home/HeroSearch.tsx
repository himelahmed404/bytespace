"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

/** How long the gooey filter stays on while the shapes merge or split. */
const LIQUID_MS = 950;

const barSpring = { type: "spring", stiffness: 170, damping: 15, mass: 0.9 } as const;

/** Where the button sits once merged: 4px inside the bar's right end, vertically centered. */
const DOCKED = { x: -4, y: 3 };

/**
 * Course search bar. Idle, it matches the design (bar + separate button). Once you start typing,
 * the button flows into the bar's right end with a liquid "gooey" merge and starts to glow;
 * clearing the text splits them apart again. Submitting scrolls down to the course list.
 */
export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [liquid, setLiquid] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();
  const merged = query.trim().length > 0;

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleChange(value: string) {
    const willMerge = value.trim().length > 0;
    if (willMerge !== merged && !reduceMotion) {
      setLiquid(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setLiquid(false), LIQUID_MS);
    }
    setQuery(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  }

  // The button (and its lime shape) reach a little further left before docking — the "drop" feel.
  const buttonMotion = merged
    ? {
        x: [0, -24, -1, DOCKED.x],
        y: [0, 1, 3, DOCKED.y],
        transition: { duration: 0.8, times: [0, 0.35, 0.75, 1], ease: "easeOut" as const },
      }
    : {
        x: [DOCKED.x, 8, 0],
        y: [DOCKED.y, 0, 0],
        transition: { duration: 0.6, times: [0, 0.5, 1], ease: "easeOut" as const },
      };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="group relative grid w-full max-w-[582px] grid-cols-[1fr_auto] items-start gap-x-3 sm:gap-x-4 lg:w-auto lg:max-w-none lg:grid-cols-[461px_auto]"
    >
      {/* Shape layer (behind the content): the white bar and the lime button body */}
      <div
        aria-hidden
        className="pointer-events-none col-span-2 col-start-1 row-start-1 grid grid-cols-subgrid items-start"
        style={{ filter: liquid ? "url(#goo)" : "none" }}
      >
        <motion.div
          layout
          transition={{ layout: barSpring }}
          className={cn(
            "row-start-1 h-[52px] rounded-xl bg-white transition-shadow duration-200",
            merged ? "col-span-2 col-start-1" : "col-start-1",
            focused && !liquid && "shadow-[0_0_0_2px_var(--color-lime)]",
          )}
        />
        <motion.div
          animate={buttonMotion}
          initial={false}
          className="col-start-2 row-start-1 rounded-xl bg-lime px-6 py-3 transition-[box-shadow,filter] duration-200 group-has-[button:hover]:shadow-[0_8px_24px_-8px_rgba(212,251,32,0.7)] group-has-[button:hover]:brightness-105"
        >
          {/* Invisible label sizes the lime body exactly like the real button */}
          <span className="invisible block text-label-l font-medium whitespace-nowrap">Search</span>
        </motion.div>
      </div>

      {/* Content layer */}
      <label className="relative z-10 col-start-1 row-start-1 flex h-[52px] min-w-0 items-center gap-2 px-6 py-3">
        <Image src="/images/icons/search.svg" alt="" width={24} height={24} />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Course, topic, creator"
          className="w-full bg-transparent text-body-l text-ink outline-none placeholder:text-gray-400 [&::-webkit-search-cancel-button]:appearance-none"
        />
      </label>
      <motion.button
        type="submit"
        animate={buttonMotion}
        initial={false}
        className={cn(
          "relative z-10 col-start-2 row-start-1 rounded-xl px-6 py-3 text-label-l font-medium whitespace-nowrap text-ink",
          merged && !liquid && "motion-safe:animate-glow-pulse",
        )}
      >
        Search
      </motion.button>
    </form>
  );
}
