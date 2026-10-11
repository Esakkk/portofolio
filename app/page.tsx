"use client";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import BigMarquee from "./components/BigMarquee";
import Work from "./components/Work";
import Services from "./components/Services";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import { doing } from "./data/portfolio";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Intro />
        <BigMarquee text="Portfolio · " />
        <Work />
        <BigMarquee text={doing.map((d) => `${d} / `).join("")} velocity={-30} size="medium" />
        <Services />
        <Journey />
      </main>
      <Contact />
    </MotionConfig>
  );
}
