"use client";
import { motion } from "framer-motion";
import { useId } from "react";

/** Tombol bulat dengan teks melingkar yang berputar, seperti "Explore More · PUSH ME!" */
export default function RoundButton({
  href,
  ring = "Explore More · Explore More · ",
  label = ["Push", "me!"],
  className = "",
}: {
  href: string;
  ring?: string;
  label?: [string, string];
  className?: string;
}) {
  const pathId = useId();
  return (
    <motion.a
      href={href}
      className={`group relative grid h-44 w-44 shrink-0 place-items-center rounded-full text-cream ${className}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={`${ring.split("·")[0].trim()} — ${label.join(" ")}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite] motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path id={pathId} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-current font-serif text-[23px] italic" letterSpacing="2">
          <textPath href={`#${pathId}`} textLength={496} lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="grid h-[92px] w-[92px] place-items-center rounded-full border border-cream/40 transition-colors duration-500 group-hover:bg-cream group-hover:text-night">
        <span className="text-center font-serif text-[1.65rem] leading-[0.85] font-bold uppercase">
          {label[0]}
          <br />
          {label[1]}
        </span>
      </span>
    </motion.a>
  );
}
