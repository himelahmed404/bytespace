import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/navigation";

const linkClass = "text-gray-50 transition-colors duration-200 hover:text-lime";

/** Transparent header that sits on top of the blue hero. Collapses into a menu below 1024px. */
export function SiteHeader({ current = "/", className }: { current?: string; className?: string }) {
  return (
    <header
      className={cn(
        "relative container-page flex h-20 items-center justify-between lg:h-[120px] lg:items-start",
        className,
      )}
    >
      <Logo className="lg:mt-[35px] lg:ml-[2px]" />

      <nav
        aria-label="Main"
        className="absolute top-[calc(50%+1px)] left-[calc(50%-0.5px)] hidden -translate-1/2 items-start gap-6 text-body-m lg:flex"
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

      <div className="mt-[49px] hidden items-start gap-6 text-body-m leading-6 lg:flex">
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

      <MobileMenu items={mainNav} current={current} />
    </header>
  );
}
