// src/components/ContactSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

// Small helpers for framer stagger
const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, when: "beforeChildren", staggerChildren: 0.06 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactSection() {
  // links
  const EMAIL = "jinay.y.shah@outlook.com";
  const LINKEDIN = "https://linkedin.com/in/jinay24";
  const GITHUB = "https://github.com/jinayusa";
  const RESUME = "/resume.pdf";

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    } catch {}
  };

  // Brand styles for the icon chips
  const brand = {
    email: {
      chip: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      ring: "group-hover:ring-cyan-400/40",
      icon: "text-white", // stroke
    },
    linkedin: {
      chip: "bg-gradient-to-br from-[#0A66C2] to-[#0A5CB0]",
      ring: "group-hover:ring-[#0A66C2]/40",
      icon: "text-white",
    },
    github: {
      // Light mode: dark chip with white icon.
      // Dark mode: light chip with black icon for contrast.
      chip:
        "bg-gradient-to-br from-zinc-900 to-black " +
        "dark:from-white dark:to-zinc-100",
      ring: "group-hover:ring-zinc-700/40 dark:group-hover:ring-white/40",
      icon: "text-white dark:text-black",
    },
    resume: {
      chip: "bg-gradient-to-br from-slate-600 to-slate-700",
      ring: "group-hover:ring-slate-400/40",
      icon: "text-white",
    },
  };

  const items = [
    {
      type: "button",
      label: "Email",
      sub: EMAIL,
      onClick: () => (window.location.href = `mailto:${EMAIL}?subject=Hi Jinay`),
      onAux: copy,
      icon: Mail,
      brand: brand.email,
      aria: "Send an email to Jinay",
    },
    {
      href: LINKEDIN,
      label: "LinkedIn",
      sub: "@jinay24",
      icon: Linkedin,
      brand: brand.linkedin,
      aria: "Open LinkedIn profile",
    },
    {
      href: GITHUB,
      label: "GitHub",
      sub: "@jinayusa",
      icon: Github,
      brand: brand.github,
      aria: "Open GitHub profile",
    },
    RESUME
      ? {
          href: RESUME,
          label: "Résumé",
          sub: "PDF",
          icon: FileText,
          brand: brand.resume,
          aria: "Open résumé PDF",
        }
      : null,
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-8"
    >
  

      {/* FROSTED PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-7xl
          rounded-3xl
          bg-white/60 dark:bg-zinc-900/55
          backdrop-blur-xl backdrop-saturate-150
          border border-white/40 dark:border-white/10
          shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]
          p-8 sm:p-12
        "
      >
        {/* Heading + copy */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2
            variants={item}
            className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Let’s connect
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-3 text-center text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto"
          >
            I’m open to roles and impactful projects. A little context helps me reply quickly.
          </motion.p>

          {/* Links rail */}
          <motion.nav
            variants={item}
            className="
              mt-8 rounded-2xl border border-zinc-300/40 dark:border-zinc-700/40
              bg-white/30 dark:bg-zinc-900/35
              shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)]
              overflow-hidden
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
                    <Comp
                      {...props}
                      aria-label={it.aria}
                      className="group w-full block px-5 sm:px-6 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Icon chip with brand fill and inner glow */}
                        <span
                          className={`relative grid place-items-center w-10 h-10 rounded-xl ${it.brand.chip} shadow-sm transition-transform duration-200 group-hover:scale-[1.03]`}
                        >
                          <Icon
                            className={`w-[18px] h-[18px] ${it.brand.icon}`}
                            strokeWidth={2.2}
                          />
                          <span
                            className={`absolute inset-0 rounded-xl ring-0 ${it.brand.ring} transition duration-200`}
                          />
                          <span className="absolute -z-10 inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>

                        <div className="min-w-0 text-left">
                          <div className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                            {it.label}
                          </div>
                          <div className="text-sm text-zinc-600 dark:text-zinc-300 truncate">
                            {it.sub}
                          </div>
                        </div>

                        {/* CTA arrow */}
                        <span className="ml-auto inline-flex items-center text-xs text-zinc-600 dark:text-zinc-300">
                          <span className="hidden sm:inline">Open</span>
                          <motion.span
                            className="ml-1 inline-block"
                            initial={false}
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            →
                          </motion.span>
                        </span>
                      </div>
                    </Comp>
                  </li>
                );
              })}
            </ul>
          </motion.nav>

          {/* Secondary action row */}
          <motion.div
            variants={item}
            className="mt-6 flex items-center justify-center gap-3 text-xs text-zinc-600 dark:text-zinc-300"
          >
            <button
              onClick={copy}
              className="rounded-full px-3 py-1.5 border border-zinc-300/60 dark:border-zinc-700/60 bg-white/40 dark:bg-white/10 backdrop-blur-md hover:bg-white/70 dark:hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              Copy email
            </button>
            <span className="opacity-70">or</span>
            <a
              href={`mailto:${EMAIL}?subject=Hi Jinay`}
              className="rounded-full px-3 py-1.5 border border-cyan-300/60 bg-cyan-600/90 text-white hover:bg-cyan-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              Start a draft
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copy toast */}
      <motion.div
        initial={false}
        animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : -6, scale: copied ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-8 rounded-full px-3 py-1.5 text-xs bg-zinc-900/85 text-white backdrop-blur-md border border-white/10 text-center"
      >
        Email copied
      </motion.div>
    </section>
  );
}
