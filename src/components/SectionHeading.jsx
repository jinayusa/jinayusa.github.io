import { motion } from "framer-motion";

export default function SectionHeading({
  label = "Selected Work",
  title = "",
  subtitle = "",
  align = "center",         // "left" | "center" | "right"
  className = "",
}) {
  const alignMap = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative mb-12 px-2 flex flex-col ${alignMap[align]} ${className}`}
    >
      {/* soft orb glow */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <span className="w-[40rem] h-[40rem] rounded-full bg-gradient-to-r
                         from-cyan-400/12 via-fuchsia-400/10 to-amber-300/10 blur-3xl" />
      </span>

      {/* tiny label */}
      <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase
                      text-zinc-500 dark:text-zinc-400">
        <span className="h-px w-8 bg-current/40" />
        <span>{label}</span>
        <span className="h-px w-8 bg-current/40" />
      </div>

      {/* main title */}
      <h2 className="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent
                     bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900
                     dark:from-white dark:via-zinc-200 dark:to-white">
        {title}
      </h2>

      {/* underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="mt-3 h-[3px] w-28 origin-left rounded-full
                   bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300"
      />

      {subtitle && (
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
