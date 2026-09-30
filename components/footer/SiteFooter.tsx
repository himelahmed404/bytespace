import { FooterLink } from "@/components/footer/FooterLink";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, legalLinks } from "@/lib/data";

/** Site footer: brand + newsletter, link columns, copyright row. */
export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-14 pb-12 xl:pt-[70px]">
      <div className="container-page flex flex-col gap-14 lg:gap-20 xl:gap-[130px]">
        <div className="flex flex-col gap-12 xl:flex-row xl:gap-[92px]">
          <div className="flex w-full max-w-[528px] flex-col gap-10 xl:gap-[45px]">
            <div className="flex flex-col gap-4">
              <Logo tone="dark" className="self-start" />
              <p className="text-[14px] leading-[22px] text-ink">
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>
            <NewsletterForm />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 xl:flex xl:w-[580px] xl:gap-10"
          >
            {footerColumns.map((column) => (
              <div key={column.title} className="xl:w-[167px]">
                {/* The design shows no column titles; they're kept for screen readers */}
                <h2 className="sr-only">{column.title}</h2>
                <ul className="flex flex-col gap-4 text-[14px] leading-[22px] text-ink xl:mt-12">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-[22px] text-[12px] leading-[19px] text-ink sm:flex-row sm:items-start sm:justify-between">
          <p>@ 2023 ByteSpace. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
