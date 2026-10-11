"use client";
import { motion } from "framer-motion";
import RoundButton from "./RoundButton";
import Lanyard from "../plugin/Lanyard/Lanyard";
import { profile } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Intro() {
  const words = profile.intro.split(" ");

  return (
    <section id="about" className="relative scroll-mt-10 px-5 py-24 sm:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-8 text-mute">( About me )</p>
          {/* teks muncul per kata saat di-scroll */}
          <p className="font-serif text-[1.9rem] leading-[1.15] text-cream sm:text-[2.4rem]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px -25% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.025 }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </p>

          <div className="mt-12 flex items-center gap-8">
            <RoundButton href="#work" />
            <p className="max-w-[15rem] text-sm leading-relaxed text-mute">
              Based in {profile.location}. Grab the card on the right — it&apos;s real physics.
            </p>
          </div>
        </div>

        <motion.div
          className="relative h-[480px] overflow-hidden rounded-[1.75rem] bg-night-2 sm:h-[560px]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgb(232_223_207/0.10),transparent_60%)]" />
          <span className="eyebrow pointer-events-none absolute top-6 left-6 text-mute">ID Card — drag me</span>
          <span className="eyebrow pointer-events-none absolute right-6 bottom-6 text-mute">↻ 3D</span>
          <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} />
        </motion.div>
      </div>
    </section>
  );
}
