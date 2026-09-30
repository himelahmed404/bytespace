"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwipeListProps = {
  /** `<li>` items. */
  children: ReactNode;
  /** Classes for the `<ul>` (make it a horizontal snap scroller on small screens). */
  className?: string;
  /** Accessible name of the list, e.g. "Testimonials". */
  label: string;
  /** Classes for the dots row (e.g. `md:hidden` when the list is a grid on larger screens). */
  dotsClassName?: string;
};

/** Swipeable list with pagination dots that follow the swipe (and jump to a card on tap). */
export function SwipeList({ children, className, label, dotsClassName }: SwipeListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target));
        }
      },
      { root: list, threshold: 0.6 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Scroll only the list itself: scrollIntoView() would also scroll any overflow-hidden ancestor
  // (like the section clipping the background glows) and shift the whole section sideways.
  function goTo(index: number) {
    const list = listRef.current;
    const item = list?.children[index];
    if (!list || !item) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    const delta = itemBox.left - listBox.left - (listBox.width - itemBox.width) / 2;
    list.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <>
      <ul ref={listRef} aria-label={label} className={className}>
        {children}
      </ul>
      <div className={cn("mt-3 flex justify-center", dotsClassName)}>
        {Array.from({ length: count }, (_, i) => (
          // 24px tap target around a small visual dot (WCAG target size)
          <button
            key={i}
            type="button"
            aria-label={`Show item ${i + 1} of ${count}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className="group grid h-6 min-w-6 place-items-center px-1"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-primary" : "w-2 bg-gray-200 group-hover:bg-gray-400",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
