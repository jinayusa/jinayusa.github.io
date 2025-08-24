// src/pages/MonitorScreen.jsx
// Clean 2-phase screen with guaranteed visible chart bars (inline gradients):
// 1) Type Python code that loads a CSV and aggregates
// 2) Crossfade to an in-screen bar chart (animated)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MonitorScreen({
  className = "",
  codeSpeed = 16,
  pauseAfterCodeMs = 700,
  accent = "cyan", // "cyan" | "violet" | "amber" | "emerald"
}) {
  const frameClass =
    "rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]";
  const glassClass =
    "rounded-2xl bg-gradient-to-b from-white/40 to-white/5 dark:from-white/10 dark:to-white/0";

  // Palette with HEX colors for inline gradients (avoids Tailwind JIT issues)
  const PALETTES = {
    cyan:   { bar: "bg-cyan-400",   text: "text-cyan-300",   grid: "rgba(103,232,249,0.12)", barFrom: "#22d3ee", barTo: "#06b6d4" },
    violet: { bar: "bg-violet-400", text: "text-violet-300", grid: "rgba(196,181,253,0.12)", barFrom: "#a78bfa", barTo: "#8b5cf6" },
    amber:  { bar: "bg-amber-400",  text: "text-amber-300",  grid: "rgba(252,211,77,0.12)",  barFrom: "#f59e0b", barTo: "#d97706" },
    emerald:{ bar: "bg-emerald-400",text: "text-emerald-300",grid: "rgba(110,231,183,0.12)", barFrom: "#34d399", barTo: "#10b981" },
  };
  const palette = PALETTES[accent] || PALETTES.cyan;

  const code = useMemo(
    () => `# chart_demo.py
import pandas as pd
import matplotlib.pyplot as plt

# 1) Load CSV
df = pd.read_csv('sales.csv')

# 2) Parse and aggregate
df['date'] = pd.to_datetime(df['date'])
daily = df.groupby('date', as_index=False)['revenue'].sum().sort_values('date')

# 3) Inspect last few rows
print(daily.tail(3))

# 4) Plot
ax = daily.set_index('date')['revenue'].plot(kind='line', title='Revenue by Day')
plt.tight_layout(); plt.show()
`,
    []
  );

  // --- STATE ---
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // "typing" | "chart"

  // Demo data for chart phase (so the chart always renders)
  const data = useMemo(
    () => [
      { label: "Mon", value: 12.4 },
      { label: "Tue", value: 18.2 },
      { label: "Wed", value: 15.1 },
      { label: "Thu", value: 22.8 },
      { label: "Fri", value: 26.4 },
      { label: "Sat", value: 19.7 },
      { label: "Sun", value: 14.3 },
    ],
    []
  );
  const maxVal = useMemo(() => Math.max(...data.map(d => d.value)), [data]);

  // Typewriter + phase switch
  useEffect(() => {
    if (phase !== "typing") return;
    if (idx >= code.length) {
      const t = setTimeout(() => setPhase("chart"), pauseAfterCodeMs);
      return () => clearTimeout(t);
    }
    const timer = setTimeout(() => setIdx(i => i + 1), codeSpeed);
    return () => clearTimeout(timer);
  }, [idx, phase, code.length, codeSpeed, pauseAfterCodeMs]);

  // Restart animation every 15 seconds
  useEffect(() => {
    if (phase === "chart") {
      const restartTimer = setTimeout(() => {
        setIdx(0);
        setPhase("typing");
      }, 10000);
      return () => clearTimeout(restartTimer);
    }
  }, [phase]);

  // Auto-scroll for typing
  const codeRef = useRef(null);
  useEffect(() => {
    if (phase !== "typing") return;
    const el = codeRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [idx, phase]);

  return (
    <div className={"relative w-full max-w-[680px] mx-auto " + className}>
      {/* Monitor frame */}
      <div className={"relative " + frameClass}>
        {/* Subtle glass bevel */}
        <div className={"absolute inset-0 pointer-events-none " + glassClass} />

        {/* Screen surface (16:9) */}
        <div className="relative m-3 rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {/* Base screen tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#0a0f1d] dark:from-[#0b1220] dark:via-[#0a0f1c] dark:to-black" />
          {/* Micro texture + vignette */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_120px_rgba(0,0,0,0.45)]" />

          {/* Phase 1: typing code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "typing" ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 p-4 sm:p-6"
          >
            <div
              ref={codeRef}
              className="h-full w-full overflow-y-auto pr-2 font-mono text-[12px] sm:text-[14px] leading-relaxed text-cyan-200/90 whitespace-pre-wrap"
            >
              <pre className="whitespace-pre-wrap">{code.slice(0, idx)}</pre>
              <span className="inline-block w-2 h-4 align-[-0.15em] bg-cyan-300/90 animate-pulse ml-0.5" />
            </div>
          </motion.div>

          {/* Phase 2: chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "chart" ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 p-4 sm:p-6"
          >
            <div className="h-full w-full rounded-lg bg-white/5 border border-white/10 p-4 sm:p-5">
              {/* Title */}
              <div className={`text-xs sm:text-sm ${palette.text} tracking-wide`}>Revenue by Day</div>
              <div className="mt-1 text-[11px] sm:text-xs text-zinc-400/80">Aggregated from sales.csv</div>

              {/* Grid + bars */}
              <div className="relative mt-3 h-[65%] min-h-[160px] mb-6">
                {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px"
                    style={{ top: `${g * 100}%`, backgroundColor: palette.grid }}
                  />
                ))}

                <div className="absolute inset-x-0 bottom-0 top-0 flex items-end gap-2 sm:gap-3 px-2 overflow-x-auto py-6">
                  {data.map((d, i) => {
                    const pct = (d.value / maxVal) * 100;
                    return (
                      <div key={i} className="flex-1 h-full flex flex-col items-center justify-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
                          className="w-full rounded-t-md shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)]"
                          style={{
                            backgroundImage: `linear-gradient(to bottom, ${palette.barFrom}, ${palette.barTo})`,
                          }}
                        />
                        <div className="mt-2 text-[10px] sm:text-[11px] text-zinc-300/80">{d.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-3 flex items-center gap-2 text-[11px] sm:text-xs text-zinc-300/80">
                <span className={`inline-block w-3 h-3 rounded-sm ${palette.bar}`} />
                Revenue (k)
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ground shadow */}
      <div className="absolute -bottom-6 left-10 right-10 h-6 rounded-full blur-2xl bg-black/20 dark:bg-black/40" />
    </div>
  );
}
