"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";

export function Process() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          How I Work
        </div>
        <h2 className="mb-16 max-w-xl text-balance font-display text-3xl sm:text-4xl">
          Calm, thoughtful <em>engineering</em>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border bg-card/50 p-6"
            >
              <div className="mb-6 font-display text-3xl text-primary">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
