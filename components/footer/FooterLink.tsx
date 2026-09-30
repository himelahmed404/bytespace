"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { showCoursesIn } from "@/lib/courseFilter";
import type { FooterLink as FooterLinkData } from "@/lib/data";

/** Footer link; category links also open the course grid on that category. */
export function FooterLink({ link, className }: { link: FooterLinkData; className?: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Only intercept on the landing page; elsewhere (e.g. the 404 page) just follow the link.
    if (!link.courseCategory || !document.getElementById("courses")) return;
    event.preventDefault();
    showCoursesIn(link.courseCategory);
  }

  return (
    <Link
      href={link.href}
      onClick={handleClick}
      className={cn("transition-colors duration-200 hover:text-primary", className)}
    >
      {link.label}
    </Link>
  );
}
