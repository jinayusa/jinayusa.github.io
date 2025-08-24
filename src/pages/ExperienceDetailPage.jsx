import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import experiences from "../data/experiences_full.json";

export default function ExperienceDetailPage() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const data = experiences[orgId];

  const [openProjectIndex, setOpenProjectIndex] = useState(null);
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(data.projects.map((_, i) => [i, 0]))
  );

  if (!data) {
    return (
      <p className="text-red-500 text-center mt-10">Invalid Experience</p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-8 py-20 bg-gradient-to-br from-cyan-50 via-white to-amber-100 dark:from-black dark:via-neutral-900 dark:to-black text-black dark:text-white"
    >
      <div className="w-full max-w-3xl rounded-3xl bg-white/80 dark:bg-neutral-900/90 shadow-2xl border border-neutral-200 dark:border-neutral-800 px-6 sm:px-10 py-10 flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium px-4 py-2 bg-white/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-lg hover:bg-cyan-100 dark:hover:bg-neutral-700 transition shadow"
          >
            ← Back
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cyan-700 dark:text-cyan-300 mb-2">
            {data.org}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
            {data.role}
          </p>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-1">
            {data.date} &bull; {data.location}
          </p>
        </div>

        <div className="space-y-8 w-full">
          {data.projects.map((project, pIdx) => {
            const isProjectOpen = openProjectIndex === pIdx;

            return (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-cyan-200 dark:border-cyan-900 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg transition duration-300"
              >
                <button
                  onClick={() =>
                    setOpenProjectIndex(isProjectOpen ? null : pIdx)
                  }
                  className="w-full text-left px-6 py-5 bg-cyan-50 dark:bg-neutral-800 text-cyan-900 dark:text-cyan-200 font-semibold text-xl sm:text-2xl hover:bg-cyan-100 dark:hover:bg-neutral-700 transition rounded-t-2xl flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    {project.title}
                  </div>
                  {isProjectOpen ? (
                    <ChevronDownIcon className="w-5 h-5 text-cyan-500 dark:text-cyan-300" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-cyan-500 dark:text-cyan-300" />
                  )}
                </button>

                <AnimatePresence>
                  {isProjectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 px-6 py-5"
                    >
                      {Object.entries(project.sections).map(
                        ([title, content], sIdx) => {
                          const isSectionOpen = openSections[pIdx] === sIdx;

                          return (
                            <motion.div
                              key={sIdx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22 }}
                              className="border border-cyan-100 dark:border-cyan-900 rounded-xl overflow-hidden bg-white/80 dark:bg-neutral-900/90 shadow"
                            >
                              <button
                                onClick={() =>
                                  setOpenSections((prev) => ({
                                    ...prev,
                                    [pIdx]: isSectionOpen ? null : sIdx,
                                  }))
                                }
                                className="w-full text-left px-5 py-3 font-semibold bg-white dark:bg-neutral-900 hover:bg-cyan-50 dark:hover:bg-neutral-800 text-cyan-900 dark:text-cyan-200 transition flex justify-between items-center rounded-t-xl"
                              >
                                <span>{title}</span>
                                {isSectionOpen ? (
                                  <ChevronDownIcon className="w-4 h-4 text-cyan-400" />
                                ) : (
                                  <ChevronRightIcon className="w-4 h-4 text-cyan-400" />
                                )}
                              </button>

                              <AnimatePresence>
                                {isSectionOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -3 }}
                                    transition={{ duration: 0.25 }}
                                    className="px-5 py-4 text-base text-neutral-700 dark:text-neutral-300 bg-cyan-50 dark:bg-neutral-900 rounded-b-xl"
                                  >
                                    {content}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        }
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
