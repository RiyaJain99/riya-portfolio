"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { Badge } from "@/components/ui/badge";
import { PROJECTS, SITE, type Project } from "@/lib/data";

type ProjectCardItem = CardStackItem & { project: Project };

const items: ProjectCardItem[] = PROJECTS.map((project) => ({
  id: project.id,
  title: project.title,
  description: project.description,
  href: project.github ?? SITE.github,
  project,
}));

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br ${project.gradient} bg-card p-6`}
    >
      <div className="flex items-start justify-between">
        <span className="text-4xl">{project.emoji}</span>
        {project.featured && (
          <Badge className="bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      <div>
        {project.badge && (
          <div className="mb-2 font-mono text-xs text-amber-500">
            {project.badge}
          </div>
        )}
        <h3 className="text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background/60 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | number>(items[0].id);
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Selected Work
        </div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-balance font-display text-3xl sm:text-4xl">
            Projects that show how I <em>build</em>
          </h2>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All projects <ArrowUpRight className="size-4" />
          </a>
        </div>
        <p className="mb-14 max-w-xl text-muted-foreground">
          Drag, click, or use the arrow keys to move through the stack — from
          shipped AI products to hackathon builds and early experiments.
        </p>

        <CardStack
          items={items}
          initialIndex={0}
          cardWidth={440}
          cardHeight={280}
          renderCard={(item) => (
            <ProjectCard project={(item as ProjectCardItem).project} />
          )}
          onChangeIndex={(_, item) => setActiveId(item.id)}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card/50 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              {active.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {active.year}
              </span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Problem
                </div>
                <p className="text-sm text-muted-foreground">
                  {active.problem}
                </p>
              </div>
              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  My role
                </div>
                <p className="text-sm text-muted-foreground">{active.role}</p>
              </div>
              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Outcome
                </div>
                <p className="text-sm text-muted-foreground">
                  {active.outcome}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
              {active.github ? (
                <a
                  href={active.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <GithubIcon className="size-4" />
                  View source
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <GithubIcon className="size-4" />
                  Hardware prototype — code on request
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
