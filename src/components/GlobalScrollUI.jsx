import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function GlobalScrollUI({
  showHint = true,
  className = "",
  forceShow = false,
  idleDelayMs = 900,
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });

  const [hasScroll, setHasScroll] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [hovered, setHovered] = useState(false);
  const idleTimer = useRef(null);

  const recalc = () => {
    const el = document.scrollingElement || document.documentElement;
    const diff = el.scrollHeight - el.clientHeight;
    setHasScroll(diff > 4);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
  };

  useEffect(() => {
    recalc();
    const t = setTimeout(recalc, 0);

    const onScroll = () => {
      setIsIdle(false);
      recalc();
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), idleDelayMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);
    window.addEventListener("load", recalc);

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(recalc);
      ro.observe(document.documentElement);
      ro.observe(document.body);
    }

    return () => {
      clearTimeout(t);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
      window.removeEventListener("load", recalc);
      if (ro) ro.disconnect();
    };
  }, [idleDelayMs]);

  const shouldShow = forceShow || hasScroll;
  const showHintNow = shouldShow && showHint && isIdle && !atBottom;

  return (
    <>
      {/* Neutral aurora ribbon (top progress) */}
      {shouldShow && (
        <div className={"fixed top-0 left-0 right-0 z-[60] pointer-events-none " + className}>
          <div className="relative h-2">
            <motion.div
              style={{ scaleX: progress }}
              className="absolute left-0 top-0 h-[2px] w-full origin-left"
            >
              {/* neutral line + subtle glow, dark-mode aware */}
              <div className="h-full bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-600" />
              <div className="absolute -inset-x-2 -inset-y-[7px] blur-md bg-zinc-300/25 dark:bg-zinc-600/25" />
              {/* small tip dot */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                <div className="ml-auto mr-[1px] w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-white/70 shadow-[0_0_0_2px_rgba(255,255,255,0.5)]" />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Bottom-center hint (DOWN arrow, neutral, no wild colors) */}
      {shouldShow && showHint && (
        <motion.button
          aria-label="Scroll down"
          onClick={() =>
            window.scrollTo({ top: window.scrollY + window.innerHeight * 0.9, behavior: "smooth" })
          }
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
          animate={{ opacity: showHintNow ? 1 : 0 }}
          transition={{ duration: 0.24 }}
          style={{ pointerEvents: showHintNow ? "auto" : "none" }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <div
            className={[
              "inline-flex items-center gap-2 px-4 py-2 rounded-full",
              "border border-transparent",
              hovered ? "bg-transparent dark:bg-transparent" : "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md",
              "text-[12px] tracking-[0.22em] text-zinc-700 dark:text-zinc-200",
              "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]",
              "transition-all duration-200 ease-out",
            ].join(" ")}
          >
            <span className="select-none">SCROLL</span>
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={false}
              animate={{ y: hovered ? 1 : 0, opacity: hovered ? 1 : 0.9 }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
          <motion.div
            className="mx-auto mt-1 w-px h-5"
            animate={showHintNow && !hovered ? { opacity: [0.35, 1, 0.35], y: [0, 4, 0] } : { opacity: 0, y: 0 }}
            transition={{ duration: 1.4, repeat: showHintNow && !hovered ? Infinity : 0, ease: "easeInOut", delay: 0.1 }}
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.75))" }}
          />
        </motion.button>
      )}
    </>
  );
}
