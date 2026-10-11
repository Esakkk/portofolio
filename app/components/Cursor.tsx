"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Kursor custom: titik kecil yang menempel di mouse + lingkaran yang menyusul
 * dengan halus (lerp per frame). Panah bawaan disembunyikan.
 * Membesar di atas link, dan menampilkan label pada elemen ber-atribut data-cursor.
 * Nonaktif di layar sentuh dan saat "reduce motion" (panah bawaan kembali tampil).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "label">("default");
  const [label, setLabel] = useState("");

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;
    let last = performance.now();

    // posisi lingkaran mengejar mouse secara eksponensial → gerak halus dan
    // sama cepatnya di layar 60Hz maupun 144Hz
    const loop = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const t = 1 - Math.pow(0.82, dt / 16.67);
      ring.x += (target.x - ring.x) * t;
      ring.y += (target.y - ring.y) * t;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setVisible(true);
      const el = e.target as Element | null;
      const labelled = el?.closest?.("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.getAttribute("data-cursor") ?? "");
      } else if (el?.closest?.("a, button, canvas")) {
        setMode("link");
      } else {
        setMode("default");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "label" ? 92 : mode === "link" ? 54 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      {/* lingkaran yang menyusul */}
      <div ref={ringRef} className="absolute top-0 left-0 will-change-transform">
        <motion.div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#e8dfcf]"
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            backgroundColor: mode === "label" ? "rgba(232,223,207,1)" : "rgba(232,223,207,0)",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="eyebrow text-[#1e2125]"
            animate={{ opacity: mode === "label" ? 1 : 0, scale: mode === "label" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </div>

      {/* titik kecil tepat di ujung mouse */}
      <div ref={dotRef} className="absolute top-0 left-0 will-change-transform">
        <motion.div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8dfcf]"
          animate={{ opacity: visible && mode === "default" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
