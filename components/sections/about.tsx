"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { STATS, SKILL_GROUPS } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-xs md:mx-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
              <Image
                src="/images/profile.jpg"
                alt="Riya Jain"
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-border bg-card/90 px-4 py-3 text-center shadow-lg backdrop-blur">
              <div className="font-display text-lg">Riya Jain</div>
              <div className="font-mono text-xs text-muted-foreground">
                VIT Vellore · CSE (IoT) · Final Year
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              About Me
            </div>
            <h2 className="mb-6 text-balance font-display text-3xl sm:text-4xl">
              Motivated to build, <em>eager to learn</em>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a{" "}
                <span className="text-foreground">
                  final-year B.Tech CSE (IoT) student
                </span>{" "}
                at Vellore Institute of Technology, passionate about software
                development, applied AI, and building things that actually
                work.
              </p>
              <p>
                I enjoy crafting{" "}
                <span className="text-foreground">
                  intuitive, AI-powered web experiences
                </span>
                , exploring computer vision and LLM tooling, and learning by
                doing — whether that&apos;s a national hackathon, a new
                framework, or an IoT hardware prototype.
              </p>
              <p>
                Currently growing in{" "}
                <span className="text-foreground">full-stack development</span>{" "}
                and{" "}
                <span className="text-foreground">Generative AI</span>. I
                thrive in collaborative environments and I&apos;m always
                looking for opportunities to grow alongside talented teams.
              </p>
            </div>

            <div className="mt-10 flex items-baseline gap-3 border-y border-border py-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-3">
                  <span className="font-display text-3xl text-primary sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Technical Skills
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-border bg-card/50 p-5"
              >
                <div className="mb-3 text-sm font-medium">{group.title}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
