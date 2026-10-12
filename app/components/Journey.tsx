"use client";
import { motion } from "framer-motion";
import { journey } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Journey() {
  return (
    <section className="px-5 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-10 text-mute">( Journey )</p>
        <ul className="border-b border-cream/40">
          {journey.map((m, i) => (
            <motion.li
              key={`${m.title}-${i}`}
              className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-t border-cream/15 py-5 transition-colors duration-500 hover:border-cream/50 lg:grid-cols-[4.5rem_1fr_11rem_11rem] lg:py-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease, delay: i * 0.06 }}
            >
              <span className="text-sm font-semibold">{m.year}</span>
              <span className="font-serif text-4xl leading-[1.05] transition-transform duration-500 group-hover:translate-x-3 group-hover:italic sm:text-5xl md:text-[5.2vw] md:whitespace-nowrap lg:text-[min(3.5vw,3.25rem)]">
                {m.title}
              </span>
              <span className="col-start-2 text-sm font-semibold lg:col-start-auto">{m.place}</span>
              <span className="col-start-2 text-sm text-mute italic lg:col-start-auto">{m.note}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
