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
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-[582px] items-start gap-3 sm:gap-4 lg:w-auto lg:max-w-none"
    >
      <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-xl bg-white px-6 py-3 transition-shadow focus-within:ring-2 focus-within:ring-lime lg:w-[461px] lg:flex-none">
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
