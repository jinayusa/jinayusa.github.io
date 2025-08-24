import React from "react";

export default function Credits({
  name = "Jinay Shah",
  licenseUrl = "https://creativecommons.org/licenses/by-nc/4.0/",
  year = new Date().getFullYear(),
  className = "",
}) {
  return (
    <footer className={"py-8 " + className}>
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center gap-3 justify-between text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">
          © {year} {name}
        </span>

        <a
          href={licenseUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full
                     border border-zinc-300/50 dark:border-zinc-700/50
                     bg-white/55 dark:bg-white/[0.07] backdrop-blur-sm
                     px-3 py-1.5 text-zinc-800 dark:text-zinc-200
                     hover:bg-white/75 dark:hover:bg-white/[0.10]
                     transition"
          title="Creative Commons BY-NC 4.0"
        >
          {/* Minimal CC pill */}
          <span className="font-semibold">CC</span>
          <span className="text-xs">BY-NC 4.0</span>
        </a>
      </div>
    </footer>
  );
}
