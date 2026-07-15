"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TIMELINE, CERTIFICATIONS } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Background
        </div>
        <h2 className="mb-16 max-w-xl text-balance font-display text-3xl sm:text-4xl">
          Education &amp; <em>Experience</em>
        </h2>

        <div className="relative mb-20 space-y-10 border-l border-border pl-8 sm:pl-10">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[2.6rem] top-1.5 size-3 rounded-full border-2 border-background bg-primary sm:-left-[3.1rem]" />
              <div className="mb-1 font-mono text-xs text-muted-foreground">
                {item.date}
              </div>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <div className="mb-2 text-sm text-primary">{item.place}</div>
              <p className="max-w-2xl text-sm text-muted-foreground">
                {item.description}
              </p>
              {item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Certifications
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card/50 p-5"
            >
              <span className="text-2xl">{cert.emoji}</span>
              <h4 className="mt-3 text-sm font-medium">{cert.title}</h4>
              <div className="mt-1 text-xs text-muted-foreground">
                {cert.issuer} · {cert.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
