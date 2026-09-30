"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type SubmitStatus =
  { state: "idle" } | { state: "submitting" } | { state: "success" | "info"; message: string };

/** Announced result of a (demo) form submission, animated in under the submit button. */
export function FormStatus({ status }: { status: SubmitStatus }) {
  const visible = status.state === "success" || status.state === "info";

  return (
    // Always in the DOM (so it is announced); cancels the form gap while empty to keep the layout
    <div role="status" aria-live="polite" className="w-full empty:-mt-6">
      <AnimatePresence>
        {visible && (
          <motion.p
            key={status.message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "rounded-md px-4 py-3 text-label-s",
              status.state === "success" ? "bg-lime/40 text-ink" : "bg-gray-50 text-gray-700",
            )}
          >
            {status.message}{" "}
            {status.state === "success" && (
              <Link
                href="/"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Go to homepage →
              </Link>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
