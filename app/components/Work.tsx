"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, type Project } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

/** Cover abstrak untuk proyek yang belum punya gambar */
function AbstractCover({ index, soon }: { index: number; soon?: boolean }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#2b2f35,#1a1c20)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgb(232_223_207/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(232_223_207/0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div
        className="absolute -top-1/4 -right-1/4 h-[80%] w-[80%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgb(232 223 207 / ${soon ? 0.06 : 0.16}), transparent 70%)` }}
      />
      <span className="absolute inset-0 grid place-items-center font-serif text-[18vw] text-cream/[0.06] italic md:text-[9vw]">
        {soon ? "soon" : String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const flipped = index % 2 === 1;

  const body = (
    <div ref={ref} className="relative py-10 md:py-20">
      <motion.div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-cream/10 md:w-[58%] ${flipped ? "" : "md:ml-auto"}`}
        initial={{ clipPath: "inset(12% 12% 12% 12% round 1.5rem)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)", opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.2, ease }}
      >
        <motion.div className="absolute inset-[-8%] transition-transform duration-700 group-hover:scale-[1.04]" style={{ y: imageY }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(min-width: 768px) 58vw, 100vw" />
          ) : (
            <AbstractCover index={index} soon={project.comingSoon} />
          )}
        </motion.div>
        {/* bayangan di bawah gambar supaya judul yang menimpa tetap terbaca */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/80 to-transparent" />
        <span className="eyebrow absolute top-5 left-6 text-cream/70">{String(index + 1).padStart(2, "0")}</span>
        {project.comingSoon && (
          <span className="eyebrow absolute top-4 right-5 rounded-full border border-cream/25 bg-night/40 px-3 py-1.5 text-cream/70 backdrop-blur">
            In progress
          </span>
        )}
      </motion.div>

      <motion.div
        className={`relative z-10 -mt-10 md:absolute md:bottom-4 md:mt-0 ${flipped ? "md:right-0 md:text-right" : "md:left-[8%]"}`}
        style={{ y: titleY }}
      >
        <h3 className="font-serif text-[13vw] leading-[0.9] text-cream md:text-[7.5vw] xl:text-[7rem]">
          {project.title}
        </h3>
        <p className="eyebrow mt-3 text-cream/70">
          {project.tags.join(" • ")}
          {project.year !== "—" && <span className="text-mute"> — {project.year}</span>}
        </p>
      </motion.div>
    </div>
  );

  return project.link && !project.comingSoon ? (
    <a href={project.link} target="_blank" rel="noreferrer" className="group block" data-cursor="View">
      {body}
    </a>
  ) : (
    <div className="group" data-cursor="Soon">
      {body}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="scroll-mt-10 px-5 pb-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between border-b border-cream/15 pb-6">
          <p className="eyebrow text-mute">( Selected work )</p>
          <p className="eyebrow text-mute">{String(projects.length).padStart(2, "0")} projects</p>
        </div>
        {projects.map((p, i) => (
          <ProjectRow key={`${p.title}-${i}`} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
