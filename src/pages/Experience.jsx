import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import SectionHeading from "../components/SectionHeading";
import CurrentBadge from "../components/CurrentBadge";
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Experience() {
  return (
    <section className="relative min-h-screen px-6 sm:px-12 py-24 transition-colors duration-500 overflow-hidden ml-7 sm:ml-0 lg:ml-7">
      {/* Neutral ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/40 to-transparent dark:via-zinc-900/40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),transparent)] dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Career"
          title="Experience"
          subtitle="Roles, impact, and systems I’ve shipped."
          align="center"
        />

        {/* Frosted panel */}
        <div className="mt-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/55 backdrop-blur-md backdrop-saturate-125 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] p-5 sm:p-8">
          <motion.div
            className="relative grid md:grid-cols-3 gap-8 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* DT — emphasized: span 2 columns on md+ */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-2"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <ExperienceCard
                org="Decision Theater Network (ASU)"
                role="Software Developer"
                location="Tempe, USA"
                date="June 2024 – Present"
                image="/assets/DecisionTheater.jpg"
                highlight
                imageOverlay={<CurrentBadge label="Current" />}
                imageOverlayClassName="top-3 right-3" 
                contributions={
                  <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
                    <li>Re-architected Minerva's backend for interactive visualizations across sectors.</li>
                    <li>Fixed schema drift in CuRVE’s analytics API within 24 hours.</li>
                    <li>Built real-time data layer using Flask + Redis, scaled to 1,400+ RPS.</li>
                    <li>Optimized SQL endpoints for 2x performance boost.</li>
                    <li>Automated GitHub Actions deployment with rollback support.</li>
                  </ul>
                }
              />
             
            </motion.div>

            {/* Others — stacked in the remaining column */}
            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.div variants={cardVariants} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                <ExperienceCard
                  org="KiVee Softech"
                  role="Senior Software Developer"
                  location="Surat, India"
                  date="Jan 2022 – Jul 2023"
                  contributions={
                    <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
                      <li>Designed voice authentication APIs using MFCC + TensorFlow.</li>
                      <li>Improved auth speed by 70% with secure fallback flows.</li>
                      <li>Streamlined deployment pipelines using Docker and GitHub Actions.</li>
                    </ul>
                  }
                />
              </motion.div>

              <motion.div variants={cardVariants} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                <ExperienceCard
                  org="Kintu Designs"
                  role="Software Developer"
                  location="Surat, India"
                  date="Feb 2021 – Jan 2022"
                  contributions={
                    <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
                      <li>Developed RESTful APIs and integrated payment gateway in React-native apps.</li>
                      <li>Improved load speed of dashboards by 60% through code refactoring.</li>
                    </ul>
                  }
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        </div>
      </div>
    </section>
  );
}
