"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

/** Course search bar. Submitting scrolls down to the course list. */
export function HeroSearch() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex items-start gap-4">
      <label className="flex h-[52px] w-[461px] items-center gap-2 rounded-xl bg-white px-6 py-3 transition-shadow focus-within:ring-2 focus-within:ring-lime">
        <Image src="/images/icons/search.svg" alt="" width={24} height={24} />
        <span className="sr-only">Search courses</span>
        <input
          type="search"
          name="q"
          placeholder="Course, topic, creator"
          className="w-full bg-transparent text-body-l text-ink outline-none placeholder:text-gray-400"
        />
      </label>
      <Button type="submit">Search</Button>
    </form>
  );
}
