/** Site-wide constants used by metadata, robots.txt and the sitemap. */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  name: "ByteSpace",
  title: "ByteSpace — Get Access to Hundreds of Courses",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with ByteSpace's wide range of courses — or share your expertise as a creator.",
  /** Production URL on Vercel, localhost during development. */
  url: vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000",
};
