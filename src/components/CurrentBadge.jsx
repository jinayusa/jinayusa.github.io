// src/components/CurrentBadge.jsx
import React from "react";

export default function CurrentBadge({
  label = "Current",
  tone = "emerald",        // "emerald" | "cyan" | "rose" | "amber"
  size = "sm",             // "xs" | "sm"
  blink = true,            // turn the blink/pulse on/off
  className = "",
}) {
  const tones = {
    emerald: { dot: "bg-emerald-500", halo: "bg-emerald-400/50" },
    cyan:    { dot: "bg-cyan-500",    halo: "bg-cyan-400/50" },
    rose:    { dot: "bg-rose-500",    halo: "bg-rose-400/50" },
    amber:   { dot: "bg-amber-500",   halo: "bg-amber-400/50" },
  };
  const t = tones[tone] || tones.emerald;
  const pad = size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[10px]";

  return (
    <span
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-md border border-white/15
                  bg-zinc-900/70 text-white shadow-sm backdrop-blur-sm ring-1 ring-white/10
                  ${pad} ${className}`}
    >
      <span className="relative inline-flex h-2 w-2">
        {/* soft pulse halo */}
        {blink && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${t.halo}
                        motion-safe:animate-ping`}
          />
        )}
        {/* blinking core dot */}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${t.dot}
                      ${blink ? "motion-safe:animate-pulse" : ""}`}
        />
      </span>
      {label}
    </span>
  );
}
