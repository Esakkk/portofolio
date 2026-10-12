"use client";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col items-center justify-center px-5 pt-24 pb-16 text-center">
      <motion.p
        className="eyebrow mb-6 text-cream/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {profile.role}
      </motion.p>

      <h1 className="font-serif text-cream">
        <Line delay={0.3} className="text-[15vw] leading-[0.85] font-medium tracking-[-0.02em] uppercase md:text-[10.5vw] xl:text-[9.5rem]">
          Packets
        </Line>
        <Line delay={0.42} className="text-[15vw] leading-[0.85] font-medium tracking-[-0.02em] uppercase md:text-[10.5vw] xl:text-[9.5rem]">
          Flow
        </Line>
        <Line delay={0.54} className="text-[13vw] leading-[0.9] italic md:text-[8.5vw] xl:text-[7.5rem]">
          Clean Logic
        </Line>
        <Line delay={0.66} className="mt-1 text-[7vw] leading-none md:text-[4.5vw] xl:text-[4rem]">
          <span className="italic">&amp; Full</span> <span className="font-bold">Stack</span>{" "}
        </Line>
      </h1>

      <motion.a
        href="#about"
        className="eyebrow absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-cream/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-cream"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
