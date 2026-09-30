import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { FloatingCard } from "@/components/motion/FloatingCard";
import { FloatingOrnament } from "@/components/motion/FloatingOrnament";
import { ORNAMENT_TINT } from "@/components/ui/Ornament";
import { courses } from "@/lib/data";

/**
 * Floating collage on the left of the auth pages (course cards, happy-students card, 3D shapes),
 * positioned on the 1440×1024 Figma frame. Desktop only.
 */
export function AuthShowcase() {
  return (
    <div aria-hidden className="pointer-events-none">
      <FloatingCard
        trigger="mount"
        className="top-[394px] left-[122px]"
        enter={0.2}
        float={{ duration: 6.5, delay: 0.3, distance: -10 }}
      >
        <CourseCard course={courses[1]} variant="showcase" />
      </FloatingCard>
      <FloatingCard
        trigger="mount"
        className="top-[305px] left-[233px]"
        enter={0.35}
        float={{ duration: 6, delay: 1, distance: -12 }}
      >
        <CourseCard course={courses[2]} variant="showcase" />
      </FloatingCard>
      <FloatingCard
        trigger="mount"
        className="top-[740px] left-[348px]"
        enter={0.5}
        float={{ duration: 5.5, delay: 0.6, distance: -10 }}
      >
        <HappyStudentsCard tone="lime" dealDelay={0.3} />
      </FloatingCard>

      <FloatingOrnament
        trigger="mount"
        shape="zigzag"
        tint={ORNAMENT_TINT.white}
        x={470.81}
        y={626}
        size={175.81}
        flip
        enter={0.55}
        enterRotate={10}
        float={{ duration: 6, delay: 1.2, distance: -12, rotate: -5 }}
      />
      <FloatingOrnament
        trigger="mount"
        shape="torus"
        tint={ORNAMENT_TINT.lime}
        x={149.47}
        y={319.68}
        size={146.72}
        enter={0.45}
        float={{ duration: 7.5, delay: 0.4, distance: -14, rotate: -6 }}
      />
      <FloatingOrnament
        trigger="mount"
        shape="pyramid"
        tint={ORNAMENT_TINT.lime}
        x={95.03}
        y={701.59}
        size={188.93}
        enter={0.6}
        enterRotate={10}
        float={{ duration: 6.5, delay: 0.8, distance: -12, rotate: 8 }}
      />
    </div>
  );
}
