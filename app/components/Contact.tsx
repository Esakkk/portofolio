"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RoundButton from "./RoundButton";
import { profile } from "../data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Di HP, mailto: langsung membuka aplikasi email (Gmail, dll).
 * Di desktop sering tidak ada aplikasi email, jadi buka jendela tulis Gmail di tab baru.
 */
function openEmail(e: React.MouseEvent<HTMLAnchorElement>) {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  e.preventDefault();
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timeZone,
      timeZoneName: "short",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || "—"}</span>;
}

export default function Contact() {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Instagram", href: profile.instagram },
  ].filter((l) => l.href);

  return (
    <footer id="contact" className="relative scroll-mt-10 overflow-hidden px-5 pt-28 pb-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-6 text-center text-mute">( Have an idea? )</p>
        <h2 className="text-center font-serif leading-[0.85]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[18vw] font-medium uppercase md:text-[12vw] xl:text-[11rem]"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease }}
            >
              Let&apos;s
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[18vw] italic md:text-[12vw] xl:text-[11rem]"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease, delay: 0.1 }}
            >
              talk
            </motion.span>
          </span>
        </h2>

        {profile.email && (
          <div className="mt-8 flex justify-center">
            <a
              href={`mailto:${profile.email}`}
              onClick={openEmail}
              aria-label="Send me an email"
              title="Send me an email"
              className="grid h-16 w-16 place-items-center rounded-full border border-cream/40 text-cream transition-colors duration-500 hover:bg-cream hover:text-night"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3.5 6.5 8.5 6.5 8.5-6.5" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        )}

        <div className="mt-14 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16">
          <RoundButton
            href={profile.email ? `mailto:${profile.email}` : profile.github}
            onClick={profile.email ? openEmail : undefined}
            ring="Get in touch · Get in touch · "
            label={["Say", "hi!"]}
          />
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-serif text-3xl">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="link-underline italic"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24 grid gap-6 border-t border-cream/15 pt-6 text-sm text-mute sm:grid-cols-3">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span className="sm:text-center">
            {profile.location} — <LocalTime />
          </span>
          <a href="#home" className="link-underline justify-self-start text-cream sm:justify-self-end">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
