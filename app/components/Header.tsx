"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference sm:px-10">
        <a href="#home" className="text-[0.95rem] leading-[1.05] tracking-tight text-[#e8dfcf] uppercase">
          {profile.firstName}
          <br />
          <span className="mr-0.5">✦</span>
          {profile.lastName}
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="group relative h-10 w-10"
        >
          <span
            className={`absolute left-1/2 h-px w-8 -translate-x-1/2 bg-[#e8dfcf] transition-all duration-500 ${
              open ? "top-1/2 rotate-45" : "top-[42%] group-hover:w-6"
            }`}
          />
          <span
            className={`absolute left-1/2 h-px w-8 -translate-x-1/2 bg-[#e8dfcf] transition-all duration-500 ${
              open ? "top-1/2 -rotate-45" : "top-[58%]"
            }`}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-night px-5 pt-28 pb-10 sm:px-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 font-serif text-6xl leading-[1.05] sm:text-8xl"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="eyebrow text-mute">0{i + 1}</span>
                    <span className="transition-all duration-500 group-hover:pl-4 group-hover:italic">
                      {l.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex flex-wrap justify-between gap-4 border-t border-cream/15 pt-6 text-sm text-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <span>{profile.role}</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline text-cream">
                GitHub ↗
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
