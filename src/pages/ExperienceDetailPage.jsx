import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import experiences from "../data/experiences_full.json";

export default function ExperienceDetailPage() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const data = experiences[orgId];

  const [openProjectIndex, setOpenProjectIndex] = useState(null); // all closed by default
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
      className="min-h-screen px-4 sm:px-8 py-20 bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-black dark:via-neutral-900 dark:to-black text-black dark:text-white flex justify-center items-start"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 px-6 sm:px-10 py-10">
        <div className="flex justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          >
            ← 
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold">{data.org}</h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-1">
            {data.role}, {data.date} • {data.location}
          </p>
        </div>

        <div className="space-y-6">
          {data.projects.map((project, pIdx) => {
            const isProjectOpen = openProjectIndex === pIdx;

            return (
              <div
                key={pIdx}
                className="rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-lg transition duration-300"
              >
                <button
                  onClick={() =>
                    setOpenProjectIndex(isProjectOpen ? null : pIdx)
                  }
                  className="w-full text-left px-4 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 font-semibold text-xl sm:text-2xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition rounded-t-xl flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    {project.title}
                  </div>
                  {isProjectOpen ? (
                    <ChevronDownIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isProjectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 px-4 py-4"
                    >
                      {Object.entries(project.sections).map(
                        ([title, content], sIdx) => {
                          const isSectionOpen = openSections[pIdx] === sIdx;

                          return (
                            <div
                              key={sIdx}
                              className="border border-neutral-200 dark:border-neutral-700 rounded"
                            >
                              <button
                                onClick={() =>
                                  setOpenSections((prev) => ({
                                    ...prev,
                                    [pIdx]: isSectionOpen ? null : sIdx,
                                  }))
                                }
                                className="w-full text-left px-4 py-2 font-medium bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white transition rounded-t flex justify-between items-center"
                              >
                                <span>{title}</span>
                                {isSectionOpen ? (
                                  <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
                                ) : (
                                  <ChevronRightIcon className="w-4 h-4 text-neutral-500" />
                                )}
                              </button>

                              <AnimatePresence>
                                {isSectionOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -3 }}
                                    transition={{ duration: 0.25 }}
                                    className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 rounded-b"
                                  >
                                    {content}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
