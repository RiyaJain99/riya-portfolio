"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }
    const fallback = window.setTimeout(hide, 800);
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="font-display text-3xl">
            Riya <span className="text-primary">Jain</span>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Loading
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
