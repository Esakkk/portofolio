"use client";
import { motion } from "framer-motion";
import { services } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  return (
    <section id="services" className="scroll-mt-10 px-5 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-serif text-6xl leading-[0.95] sm:text-7xl">
            What I <span className="italic">do</span>
          </h2>
          <p className="max-w-sm text-mute">
            Two worlds that meet in the middle: the cables nobody sees, and the pages everybody does.
          </p>
        </div>

        {/* geser horizontal di HP, grid di layar besar */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              className="group flex min-h-[26rem] w-[82%] shrink-0 snap-start flex-col rounded-[1.5rem] bg-paper p-7 text-night sm:w-[55%] lg:w-auto"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-6xl leading-none italic">{String(i + 1).padStart(2, "0")}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-night/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-night group-hover:text-paper">
                  ↗
                </span>
              </div>
              <h3 className="mt-auto font-serif text-4xl leading-none font-semibold">{s.title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-night/70">{s.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <li key={t} className="rounded-full border border-night/15 px-3 py-1 text-xs font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
