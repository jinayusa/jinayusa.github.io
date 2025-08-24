import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

/* ——— Categories with stable IDs ——— */
const CATS = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "backend", label: "Backend" },
  { id: "data-ml", label: "Data & ML" },
  { id: "databases", label: "Databases" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
  { id: "frontend", label: "Frontend" },
  { id: "tools", label: "Tools" },
  { id: "soft-skills", label: "Other" },
];

/* ——— Skills (assign one or more category IDs via `cats`) ——— */
const RAW_SKILLS = [
  // Languages
  { name: "Python", level: 5, cats: ["languages"] },
  { name: "Java", level: 5, cats: ["languages"] },
  { name: "JavaScript", level: 5, cats: ["languages"] },
  { name: "TypeScript", level: 3, cats: ["languages"] },
  { name: "SQL", level: 4, cats: ["languages"] },
  { name: "Go", level: 2, cats: ["languages"] },
  { name: "C#", level: 3, cats: ["languages"] },

  // Backend
  { name: "Message Queues (Kafka/RabbitMQ)", level: 4, cats: ["backend", "cloud-devops"] },
  { name: "Caching (Redis)", level: 4, cats: ["backend", "databases"] },

  // Frontend
  { name: "React", level: 3, cats: ["frontend"] },
  { name: "Tailwind CSS", level: 3, cats: ["frontend"] },
  { name: "Plotly / Charts", level: 3, cats: ["frontend"] },

  // Databases
  { name: "PostgreSQL", level: 4, cats: ["databases"] },
  { name: "MongoDB", level: 3, cats: ["databases"] },
  { name: "DynamoDB", level: 3, cats: ["databases"] },
  { name: "Elasticsearch", level: 3, cats: ["databases"] },

  // Cloud & DevOps
  { name: "AWS", level: 4, cats: ["cloud-devops"] },
  { name: "Docker", level: 5, cats: ["cloud-devops"] },
  { name: "Kubernetes", level: 3, cats: ["cloud-devops"] },
  { name: "CI/CD (GitHub Actions)", level: 4, cats: ["cloud-devops", "tools"] },
  { name: "Terraform (IaC)", level: 3, cats: ["cloud-devops"] },
  { name: "Serverless (AWS Lambda)", level: 3, cats: ["cloud-devops", "backend"] },
  { name: "Linux & Bash", level: 4, cats: ["cloud-devops", "tools"] },

  // Data & ML
  { name: "Pandas", level: 5, cats: ["data-ml"] },
  { name: "TensorFlow", level: 3, cats: ["data-ml"] },
  { name: "spaCy / NLP", level: 4, cats: ["data-ml"] },
  { name: "ARIMA / Prophet", level: 3, cats: ["data-ml"] },
  { name: "OpenCV", level: 3, cats: ["data-ml"] },
  { name: "AI-assisted Dev (Copilot/ChatGPT)", level: 4, cats: ["tools", "backend", "frontend"] },

  // Security
  { name: "OWASP Top 10 Awareness", level: 4, cats: ["security"] },
  { name: "Secrets Management", level: 4, cats: ["security", "cloud-devops"] },
  { name: "Secure Coding & Reviews", level: 4, cats: ["security", "backend"] },

  // Testing & Quality
  { name: "Unit/Integration Testing (pytest/JUnit)", level: 4, cats: ["testing", "backend"] },
  { name: "Contract & E2E Testing", level: 3, cats: ["testing", "backend", "frontend"] },
  { name: "Load/Perf (k6/jMeter)", level: 3, cats: ["testing", "cloud-devops"] },

  // Tools
  { name: "Git & Branching Strategies", level: 5, cats: ["tools"] },
  { name: "Observability (ELK/Prometheus/Grafana)", level: 3, cats: ["tools", "cloud-devops"] },
  { name: "API tooling (Postman/Insomnia)", level: 4, cats: ["tools", "backend"] },
  { name: "Documentation (ADR/Markdown)", level: 4, cats: ["tools"] },

  // Soft Skills (mapped for recruiters)
  { name: "Communication (Async & Live)", level: 5, cats: ["soft-skills"] },
  { name: "Collaboration & Code Reviews", level: 5, cats: ["soft-skills"] },
  { name: "Problem Solving & Debugging", level: 5, cats: ["soft-skills"] },
  { name: "Ownership & Accountability", level: 4, cats: ["soft-skills"] },
  { name: "Stakeholder Management", level: 4, cats: ["soft-skills"] },
  { name: "Product Sense & Prioritization", level: 4, cats: ["soft-skills"] },
  { name: "Mentorship", level: 4, cats: ["soft-skills"] },
];

/* ——— Utility ——— */
function abbr(name) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function prettyCats(ids) {
  const map = Object.fromEntries(CATS.map((c) => [c.id, c.label]));
  return ids.map((id) => map[id] || id).join(" • ");
}

/* ——— Segmented (robust pill) ——— */
function Segmented({ options, value, onChange, className = "" }) {
  const wrapRef = useRef(null);
  const btnRefs = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0, height: 0 });

  const update = () => {
    const idx = options.findIndex((o) => o.id === value);
    const el = btnRefs.current[idx];
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    setPill({
      left: el.offsetLeft - (wrap.scrollLeft || 0),
      width: el.offsetWidth,
      height: el.offsetHeight,
    });
  };

  useEffect(() => {
    update();
    const onResize = () => update();
    const onScroll = () => update();
    window.addEventListener("resize", onResize);
    wrapRef.current && wrapRef.current.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      wrapRef.current && wrapRef.current.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options.length]);

  return (
    <div
      ref={wrapRef}
      className={
        "relative overflow-x-auto rounded-full p-1 border border-zinc-300/70 dark:border-zinc-700/70 " +
        "bg-white/70 dark:bg-white/[0.06] backdrop-blur-sm " +
        className
      }
    >
      {/* pill */}
      <motion.div
        className="absolute top-1 left-1 rounded-full bg-zinc-900 dark:bg-white"
        animate={{ x: pill.left, width: pill.width, height: pill.height }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      />
      {/* buttons */}
      <div className="relative flex gap-1">
        {options.map((opt, i) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              ref={(el) => (btnRefs.current[i] = el)}
              onClick={() => onChange(opt.id)}
              className={
                "relative z-10 px-3.5 py-2 rounded-full text-sm transition " +
                (active ? "text-white dark:text-zinc-900" : "text-zinc-700 dark:text-zinc-200")
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ——— Mobile Category Select (visible on <sm) ——— */
function CategorySelect({ value, onChange }) {
  return (
    <div className="block sm:hidden w-full">
      <label htmlFor="skill-cat" className="sr-only">Category</label>
      <div className="relative">
        <select
          id="skill-cat"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg px-3.5 py-2.5 text-sm
                     bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm
                     border border-zinc-300/60 dark:border-zinc-700/60
                     text-zinc-800 dark:text-zinc-200
                     focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        >
          {CATS.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">▾</span>
      </div>
    </div>
  );
}

/* ——— Badge ——— */
function Badge({ level }) {
  const map = {
    5: { label: "Core", cls: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" },
    4: { label: "Strong", cls: "bg-zinc-800/90 text-white dark:bg-zinc-200 dark:text-zinc-900" },
    3: { label: "Working", cls: "bg-zinc-700/70 text-white dark:bg-zinc-300 dark:text-zinc-900" },
    2: { label: "Learning", cls: "bg-zinc-600/60 text-white dark:bg-zinc-400 dark:text-zinc-900" },
    1: { label: "Basics", cls: "bg-zinc-500/50 text-white dark:bg-zinc-500 dark:text-white" },
  };
  const cfg = map[level] || map[3];
  return <span className={`text-[10px] px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>;
}

export default function Skills() {
  const [cat, setCat] = useState("languages");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const base = cat === "all" ? [...RAW_SKILLS] : RAW_SKILLS.filter((s) => s.cats && s.cats.includes(cat));
    const qq = q.trim().toLowerCase();
    const byName = qq ? base.filter((s) => s.name.toLowerCase().includes(qq)) : base;
    return byName.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
  }, [cat, q]);

  return (
    <section id="skills" className="relative py-24 px-6 sm:px-12 ml-7 sm:ml-0 lg:ml-7">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Capabilities"
          title="Skills"
          subtitle="The stack I rely on to ship measurable outcomes."
          align="center"
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
          {/* Mobile dropdown */}
          <CategorySelect value={cat} onChange={setCat} />

          {/* Desktop segmented control */}
          <div className="hidden sm:block flex-1">
            <Segmented options={CATS} value={cat} onChange={setCat} className="w-full" />
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search skills…"
              className="w-full rounded-lg px-3.5 py-2.5 text-sm
                         bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm
                         border border-zinc-300/60 dark:border-zinc-700/60
                         text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 text-sm">⌘K</span>
          </div>
        </div>

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/40 dark:border-white/10
                     bg-white/55 dark:bg-zinc-900/45 backdrop-blur-md backdrop-saturate-125
                     shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] p-5 sm:p-6"
        >
          {/* Grid; key forces re-mount on tab/search change */}
          <motion.div
            key={`${cat}|${q}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
          >
            {filtered.map((s) => (
              <motion.div
                key={`${s.name}-${s.cats.join(',')}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="group relative overflow-hidden rounded-xl border
                           border-zinc-300/60 dark:border-zinc-700/60
                           bg-white/65 dark:bg-white/[0.06] backdrop-blur-sm
                           p-4 shadow-sm hover:shadow-md transition"
              >
                <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800" />
                <div className="pl-3">
                  <div className="flex items-start gap-3">
                    <div className="relative grid place-items-center w-9 h-9 shrink-0 rounded-lg
                                    bg-gradient-to-br from-zinc-200 to-zinc-100
                                    dark:from-zinc-800 dark:to-zinc-900
                                    border border-zinc-300/70 dark:border-zinc-700/70">
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">{abbr(s.name)}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{s.name}</h4>
                        <Badge level={s.level} />
                      </div>

                      {/* Proficiency bar */}
                      <div className="mt-2">
                        <div className="h-2.5 w-full rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300"
                            initial={{ width: 0 }}
                            animate={{ width: `${(s.level / 5) * 100}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span>{prettyCats(s.cats)}</span>
                          <span>{s.level}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">No skills match “{q}”.</div>
          )}

          <div className="mt-5 text-[11px] text-zinc-500 dark:text-zinc-400">
            5 = expert (production), 4 = strong, 3 = working, 2 = learning, 1 = basics
          </div>
        </motion.div>
      </div>
    </section>
  );
}
