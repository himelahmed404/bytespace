/**
 * Static landing-page content. Kept in one place so sections stay presentational and the data
 * could later come from a CMS or API without touching the components.
 */

export type Partner = { name: string; logo: string; width: number; height: number };

export const partners: Partner[] = [
  { name: "Logoipsum", logo: "/images/logos/partner-1.svg", width: 167, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-2.svg", width: 168, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-3.svg", width: 170, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-4.svg", width: 170, height: 41 },
  { name: "Logoipsum", logo: "/images/logos/partner-5.svg", width: 169, height: 42 },
];
