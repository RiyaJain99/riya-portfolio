"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE, SOCIAL_LINKS } from "@/lib/data";

const ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
} as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      toast.success("Message sent — I'll get back to you soon!");
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : `Couldn't send. Email me directly at ${SITE.email}`,
      );
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Get In Touch
        </div>
        <h2 className="mb-6 max-w-xl text-balance font-display text-3xl sm:text-4xl">
          Let&apos;s <em>connect</em>
        </h2>
        <p className="mb-16 max-w-xl text-muted-foreground">
          I&apos;m a final-year CSE student actively seeking full-time and
          internship opportunities in software and GenAI engineering. Open to
          collaborations, hackathons, and new challenges.
        </p>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {SOCIAL_LINKS.map((link) => {
              const Icon = ICONS[link.label as keyof typeof ICONS];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">
                      {link.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {link.subtext}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-border bg-card/50 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" placeholder="Your name" required />
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <Input
              name="subject"
              placeholder="Internship / Collaboration / Hello"
            />
            <Textarea
              name="message"
              placeholder="Tell me about the opportunity..."
              required
              minLength={10}
              rows={5}
            />
            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto"
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
