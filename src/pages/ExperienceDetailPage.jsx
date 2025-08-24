// src/pages/ExperienceDetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import experiences from "../data/experiences_full.json";

export default function ExperienceDetailPage() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const data = experiences?.[orgId];

  // Early guard
  if (!data) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/70 dark:bg-red-900/20 p-6 text-center shadow">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">Invalid experience</h2>
          <p className="mt-1 text-sm text-red-700/80 dark:text-red-300/80">
            We could not find details for “{orgId}”.
          </p>
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(-1)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition cursor-pointer select-none"
          >
            ← Go back
          </div>
        </div>
      </div>
    );
  }

  // Defaults: first project open, first section in each project open
  const initialOpenSections = useMemo(
    () => Object.fromEntries((data.projects ?? []).map((_, i) => [i, 0])),
    [data.projects]
  );
  const [openProjectIndex, setOpenProjectIndex] = useState(0);
  const [openSections, setOpenSections] = useState(initialOpenSections);

  const isArrayOrString = (val) =>
    Array.isArray(val) || typeof val === "string" || typeof val === "number";

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="text-neutral-800 dark:text-neutral-200">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (isArrayOrString(content)) {
      return <p className="leading-relaxed">{content}</p>;
    }
    return <pre className="text-xs opacity-80">{JSON.stringify(content, null, 2)}</pre>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-8 py-16 sm:py-20
                 bg-gradient-to-br from-cyan-50 via-white to-amber-100 dark:from-black dark:via-neutral-950 dark:to-black relative"
    >
      {/* soft background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[16%] w-64 sm:w-80 aspect-square rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-[6%] bottom-[12%] w-56 sm:w-72 aspect-square rounded-full bg-fuchsia-400/15 blur-3xl" />
      </div>

      <div className="w-full max-w-4xl rounded-3xl border border-white/50 dark:border-white/10
                      bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-[0_30px_120px_-40px_rgba(0,0,0,0.45)]
                      px-6 sm:px-10 py-8 sm:py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(-1)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(-1)}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700
                       bg-white/90 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-100
                       hover:bg-neutral-50 dark:hover:bg-neutral-800 transition shadow-sm cursor-pointer select-none"
          >
            ← Back
          </div>

          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
                           bg-gradient-to-r from-cyan-100 to-emerald-100 text-cyan-900
                           dark:from-cyan-900/30 dark:to-emerald-900/30 dark:text-cyan-200 border border-cyan-200/60 dark:border-cyan-900/50">
            Experience
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text
                         bg-gradient-to-r from-cyan-700 via-sky-600 to-emerald-600
                         dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-300">
            {data.org}
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 mt-1 font-medium">
            {data.role}
          </p>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1">
            {data.date} • {data.location}
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {(data.projects ?? []).map((project, pIdx) => {
            const isProjectOpen = openProjectIndex === pIdx;
            const panelId = `project-panel-${pIdx}`;
            const btnId = `project-btn-${pIdx}`;

            return (
              <motion.section
                key={pIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-2xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70
                           bg-white/80 dark:bg-neutral-900/70 shadow-lg"
              >
                {/* Project header (div-as-button, no default button UI) */}
                <div
                  id={btnId}
                  role="button"
                  tabIndex={0}
                  aria-controls={panelId}
                  aria-expanded={isProjectOpen}
                  onClick={() => setOpenProjectIndex(isProjectOpen ? null : pIdx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenProjectIndex(isProjectOpen ? null : pIdx);
                    }
                  }}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5
                             cursor-pointer select-none
                             bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-neutral-900 dark:to-neutral-900
                             text-cyan-900 dark:text-cyan-200 font-semibold text-lg sm:text-xl
                             hover:from-cyan-100 hover:to-sky-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
                             transition flex items-center justify-between rounded-t-2xl"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition
                                  ${isProjectOpen ? "bg-emerald-500" : "bg-cyan-400"}`}
                    />
                    <span className="truncate">{project.title}</span>
                  </div>
                  {isProjectOpen ? (
                    <ChevronDownIcon className="w-5 h-5 text-cyan-500 dark:text-cyan-300" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-cyan-500 dark:text-cyan-300" />
                  )}
                </div>

                {/* Project body */}
                <AnimatePresence initial={false}>
                  {isProjectOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="px-5 sm:px-6 py-5 sm:py-6"
                    >
                      <div className="space-y-4">
                        {Object.entries(project.sections ?? {}).map(([title, content], sIdx) => {
                          const isSectionOpen = openSections[pIdx] === sIdx;
                          const secPanelId = `section-panel-${pIdx}-${sIdx}`;
                          const secBtnId = `section-btn-${pIdx}-${sIdx}`;

                          return (
                            <motion.div
                              key={`${pIdx}-${sIdx}`}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="rounded-xl border border-neutral-200/70 dark:border-neutral-800/70
                                         bg-white/70 dark:bg-neutral-900/80 shadow"
                            >
                              {/* Section header (div-as-button) */}
                              <div
                                id={secBtnId}
                                role="button"
                                tabIndex={0}
                                aria-controls={secPanelId}
                                aria-expanded={isSectionOpen}
                                onClick={() =>
                                  setOpenSections((prev) => ({
                                    ...prev,
                                    [pIdx]: isSectionOpen ? null : sIdx,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setOpenSections((prev) => ({
                                      ...prev,
                                      [pIdx]: isSectionOpen ? null : sIdx,
                                    }));
                                  }
                                }}
                                className="w-full px-4 sm:px-5 py-3 font-semibold
                                           cursor-pointer select-none
                                           bg-white/80 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100
                                           hover:bg-cyan-50 dark:hover:bg-neutral-800
                                           transition flex justify-between items-center rounded-t-xl"
                              >
                                <span className="truncate">{title}</span>
                                {isSectionOpen ? (
                                  <ChevronDownIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-300" />
                                ) : (
                                  <ChevronRightIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-300" />
                                )}
                              </div>

                              <AnimatePresence initial={false}>
                                {isSectionOpen && (
                                  <motion.div
                                    id={secPanelId}
                                    role="region"
                                    aria-labelledby={secBtnId}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.22, ease: "easeInOut" }}
                                    className="px-4 sm:px-5 py-4 text-neutral-700 dark:text-neutral-300
                                               bg-gradient-to-b from-cyan-50/60 to-transparent
                                               dark:from-neutral-900/60 dark:to-transparent rounded-b-xl"
                                  >
                                    {renderContent(content)}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
