//ExperienceCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ExperienceCard({
  org,
  role,
  location,
  date,
  highlight = false,
  image,
  contributions,
}) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const navigate = useNavigate();

  const handleRedirect = () => {
    const path = `/experience/${org.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "").replace(/[^a-z\-]/g, "")}`;
    navigate(path);
  };

  const isDecisionTheater = org === "Decision Theater Network (ASU)";

  const CardContent = () => (
    <div className="space-y-2 sm:space-y-1">
      <p className={
        isDecisionTheater
          ? "text-cyan-400 dark:text-cyan-300 font-medium text-sm sm:text-xs"
          : "text-cyan-500 dark:text-cyan-300 font-medium text-sm sm:text-xs"
      }>
        {date}
      </p>
      <h3 className={`text-xl sm:text-2xl font-bold ${highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
        {org}
      </h3>
      <p className={
        isDecisionTheater
          ? "text-gray-400 dark:text-gray-400 text-sm sm:text-base"
          : "text-gray-600 dark:text-gray-400 text-sm sm:text-base"
      }>
        {role}
      </p>

      <div className="flex items-center justify-between pt-3">
        <button
          onClick={handleRedirect}
          className={
            isDecisionTheater
              ? "backdrop-blur-md bg-white/15 dark:bg-white/10 px-4 py-1.5 rounded-lg shadow text-cyan-400 dark:text-cyan-300 font-medium hover:scale-105 transition-all text-sm sm:text-base"
              : "backdrop-blur-md bg-white/30 dark:bg-white/10 px-4 py-1.5 rounded-lg shadow text-cyan-700 dark:text-cyan-300 font-medium hover:scale-105 transition-all text-sm sm:text-base"
          }
        >
          <span>›</span> Contributions
        </button>
        <span className={
          isDecisionTheater
            ? "text-gray-400 dark:text-gray-300 text-sm"
            : "text-gray-600 dark:text-gray-400 text-sm"
        }>
          {location}
        </span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white/70 dark:bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/30 text-sm text-gray-700 dark:text-gray-300 shadow-lg"
          >
            {contributions}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return highlight ? (
    <div
      className="relative rounded-3xl overflow-hidden bg-cover bg-center min-h-[280px] text-white p-4 sm:p-4"
      style={{
        backgroundImage: `linear-gradient(to top right, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${image})`,
      }}
    >
      <CardContent />
    </div>
  ) : (
    <div className="border-t border-gray-300 dark:border-gray-700 py-6 px-6 sm:px-4">
      <CardContent />
    </div>
  );
}
