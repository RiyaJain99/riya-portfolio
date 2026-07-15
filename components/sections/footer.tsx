import { NAV_LINKS, SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="font-display text-lg">{SITE.name}</div>
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Made with precision · VIT Vellore
        </div>
        <div className="flex gap-4 font-mono text-xs text-muted-foreground">
          <a href="#hero" className="hover:text-foreground">
            Top
          </a>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
