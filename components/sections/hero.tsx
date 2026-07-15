"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 font-mono text-xs tracking-wide text-muted-foreground backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          {SITE.openTo}
        </div>

        <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {SITE.tagline}
        </div>

        <h1 className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
          Riya <em className="text-primary not-italic">Jain</em>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          I&apos;m a final-year CS (IoT) student who loves building{" "}
          <strong className="text-foreground">
            calm, reliable web experiences
          </strong>{" "}
          and <strong className="text-foreground">GenAI-powered tools</strong>{" "}
          — from AI email assistants to computer-vision safety systems. Less
          noise, more signal.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-accent"
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        Scroll
        <span className="h-8 w-px animate-pulse bg-border" />
      </div>
    </section>
  );
}
