"use client";
import ScrollVelocity from "../plugin/ScrollVelocity/ScrollVelocity";

/** Teks serif raksasa yang berjalan dan makin cepat saat di-scroll */
export default function BigMarquee({
  text,
  velocity = 40,
  size = "large",
}: {
  text: string;
  velocity?: number;
  size?: "large" | "medium";
}) {
  const sizeClass =
    size === "large"
      ? "!text-[22vw] !leading-[1] md:!text-[16vw]"
      : "!text-[11vw] !leading-[1.1] md:!text-[7vw]";

  return (
    <div className="overflow-hidden py-4" aria-hidden="true">
      <ScrollVelocity
        texts={[text]}
        velocity={velocity}
        className="font-serif italic text-cream"
        scrollerClassName={`!font-serif !font-normal !tracking-[-0.01em] !drop-shadow-none ${sizeClass}`}
      />
    </div>
  );
}
