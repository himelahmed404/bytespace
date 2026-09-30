import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const mainNav = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "#courses" },
  { label: "Creators", href: "#creators" },
];

const linkClass = "text-gray-50 transition-colors duration-200 hover:text-lime";

/** Transparent header that sits on top of the blue hero. */
export function SiteHeader({ current = "/" }: { current?: string }) {
  return (
    <header className="relative container-page flex h-[120px] items-start justify-between">
      <Logo className="mt-[35px] ml-[2px]" />

      <nav
        aria-label="Main"
        className="absolute top-[calc(50%+1px)] left-[calc(50%-0.5px)] flex -translate-1/2 items-start gap-6 text-body-m"
      >
        {mainNav.map(({ label, href }) => {
          const active = href === current;
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(linkClass, active && "text-label-m font-medium")}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-[49px] flex items-start gap-6 text-body-m leading-6">
        <Link href="/login" className={linkClass}>
          Sign In
        </Link>
        <Link href="/register" className={linkClass}>
          Join Us
        </Link>
        <Link href="#" aria-label="Cart" className="transition-opacity hover:opacity-80">
          <Image src="/images/icons/shopping-bag.svg" alt="" width={24} height={24} />
        </Link>
      </div>
    </header>
  );
}
