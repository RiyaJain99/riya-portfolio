"use client";

import ImmersiveScrollGallery from "@/components/ui/immersive-scroll-gallery";

const CRAFT_IMAGES = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop",
].map((src) => ({ src, scale: null }));

export function CraftGallery() {
  return (
    <ImmersiveScrollGallery
      images={CRAFT_IMAGES}
      statement={
        <blockquote className="text-balance font-display text-2xl leading-snug sm:text-4xl">
          I like understanding the problem first, then designing{" "}
          <em className="text-primary not-italic">simple systems</em> that
          are easy to extend, observe, and maintain — whether that&apos;s a
          circuit on a breadboard or an LLM pipeline in production.
        </blockquote>
      }
    />
  );
}
