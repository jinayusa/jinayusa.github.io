// src/components/ContactSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  // links ───────────────────────────────────────────────────────────────
  const EMAIL = "jinay.y.shah@outlook.com";
  const LINKEDIN = "https://linkedin.com/in/jinay24";
  const GITHUB = "https://github.com/jinayusa";
  const RESUME = "/resume.pdf";
  // ─────────────────────────────────────────────────────────────────────

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    } catch {}
  };

  const items = [
    { type: "button", label: "Email", sub: EMAIL, onClick: () => (window.location.href = `mailto:${EMAIL}?subject=Hi Jinay`), onAux: copy, icon: MailIcon },
    { href: LINKEDIN, label: "LinkedIn", sub: "@jinay24", icon: InIcon },
    { href: GITHUB, label: "GitHub", sub: "@jinayusa", icon: GitHubIcon },
    RESUME ? { href: RESUME, label: "Résumé", sub: "PDF", icon: FileIcon } : null,
  ].filter(Boolean);

  return (
    <section id="contact" className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
      {/* FROSTED PANEL (the blur that improves readability) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-7xl
          rounded-2xl
          bg-white/55 dark:bg-zinc-900/50
          backdrop-blur-md backdrop-saturate-125
          border border-white/40 dark:border-white/10
          shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]
          p-8 sm:p-10
        "
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 text-center"
        >
          Let’s connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-3 text-center text-zinc-700 dark:text-zinc-300"
        >
          I’m open to roles and impactful projects. Reach out—brief context helps me respond fast.
        </motion.p>

        {/* Rail (softened so the panel does the heavy lifting) */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="
            mt-8 rounded-xl border border-zinc-300/35 dark:border-zinc-700/35
            bg-white/25 dark:bg-zinc-900/25
            shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)]
          "
        >
          <ul className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-zinc-300/30 dark:divide-zinc-700/40">
            {items.map((it, i) => {
              const Icon = it.icon;
              const Comp = it.type === "button" ? "button" : "a";
              const props =
                it.type === "button"
                  ? { onClick: it.onClick, onAuxClick: it.onAux }
                  : { href: it.href, target: "_blank", rel: "noreferrer" };
              return (
                <li key={i} className="flex-1">
                  <Comp {...props} className="group w-full block px-5 sm:px-6 py-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="relative grid place-items-center w-9 h-9 rounded-lg border border-zinc-300/50 dark:border-zinc-700/60 bg-white/70 dark:bg-white/[0.06]">
                        <Icon className="w-4.5 h-4.5 text-zinc-700 dark:text-zinc-200 transition-transform duration-200 group-hover:scale-110" />
                        <span className="absolute inset-0 rounded-lg ring-0 ring-cyan-400/0 group-hover:ring-2 group-hover:ring-cyan-400/25 transition-[box-shadow,opacity] duration-200" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{it.label}</div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-300 truncate">{it.sub}</div>
                      </div>
                      <span className="ml-auto inline-flex items-center text-xs text-zinc-600 dark:text-zinc-300">
                        <span className="hidden sm:inline">Open</span>
                        <motion.span className="ml-1" initial={false} whileHover={{ x: 2 }}>
                          ↓
                        </motion.span>
                      </span>
                    </div>
                  </Comp>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      </motion.div>

      {/* Copy toast */}
      <motion.div
        initial={false}
        animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : -6, scale: copied ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-8 rounded-full px-3 py-1.5 text-xs bg-zinc-900/80 text-white backdrop-blur-md border border-white/10 text-center"
      >
        Email copied
      </motion.div>
    </section>
  );
}

/* — tiny inline icons — */
function MailIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
    </svg>
  );
}
function InIcon({ className = "" }) {
  return (
    <svg className={className + " flex items-center justify-center"} viewBox="-3 0 30 23" aria-hidden="true">
      <g className="flex items-center justify-center">
        <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v2h.06c.53-.95 1.83-2 3.77-2 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.7c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V23h-4z" />
      </g>
    </svg>
  );
}
function GitHubIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.78.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.28c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
function FileIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
    </svg>
  );
}
