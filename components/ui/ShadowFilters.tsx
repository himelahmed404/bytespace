import { Fragment } from "react";

/**
 * Figma effect style "A": eight stacked, independent drop shadows.
 *
 * CSS `filter: drop-shadow()` chains would shadow the previous shadows too, and `box-shadow`
 * ignores image transparency, so the effect is rebuilt as an SVG filter that follows the
 * alpha of cut-out images. (Filter primitives must be direct children of <filter>, hence the
 * Fragment rather than a <g> wrapper.) Apply it with `style={{ filter: "url(#shadow-a)" }}`.
 */
const shadowA = [
  { x: 0.518, y: 0.741, blur: 3.036, alpha: 0.04 },
  { x: 2.233, y: 3.19, blur: 5.723, alpha: 0.06 },
  { x: 5.383, y: 7.69, blur: 9.571, alpha: 0.07 },
  { x: 10.208, y: 14.582, blur: 16.087, alpha: 0.08 },
  { x: 16.946, y: 24.209, blur: 24, alpha: 0.09 },
  { x: 25.838, y: 36.912, blur: 36, alpha: 0.1 },
  { x: 37.122, y: 53.032, blur: 56, alpha: 0.11 },
  { x: 51.038, y: 72.912, blur: 72, alpha: 0.13 },
];

/** Renders the shared SVG filter definitions once (in the root layout): shadow A + goo. */
export function ShadowFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter
        id="shadow-a"
        x="-15%"
        y="-10%"
        width="150%"
        height="150%"
        colorInterpolationFilters="sRGB"
      >
        {shadowA.map((s, i) => (
          <Fragment key={i}>
            <feGaussianBlur in="SourceAlpha" stdDeviation={s.blur / 2} />
            <feOffset dx={s.x} dy={s.y} result={`offset-${i}`} />
            <feFlood floodColor="#000" floodOpacity={s.alpha} />
            <feComposite in2={`offset-${i}`} operator="in" result={`shadow-${i}`} />
          </Fragment>
        ))}
        <feMerge>
          {shadowA.map((_, i) => (
            <feMergeNode key={i} in={`shadow-${i}`} />
          ))}
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/*
        "Gooey" filter for liquid merges: blur, then sharpen the alpha so nearby shapes fuse with
        a watery bridge. Compositing the source on top keeps the shapes themselves crisp.
      */}
      <filter
        id="goo"
        x="-10%"
        y="-60%"
        width="120%"
        height="220%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </svg>
  );
}
