import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import DecisionTheaterImg from "../assets/DecisionTheater.jpg";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Experience() {
  return (
    <section className="relative min-h-screen px-6 sm:px-12 py-24 bg-gradient-to-br from-white/30 to-gray-100/30 dark:from-black/30 dark:to-gray-900/30 transition-colors duration-500 overflow-hidden">
     

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white z-10"
      >
        Experience
      </motion.h2>

      <motion.div
        className="relative grid md:grid-cols-3 gap-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={cardVariants}>
          <ExperienceCard
            org="Decision Theater Network (ASU)"
            role="Software Developer"
            location="Tempe, USA"
            date="June 2024 – Present"
            image={DecisionTheaterImg}
            highlight
            contributions={
              <ul className="list-disc list-inside space-y-1">
                <li>Re-architected Minerva's backend for interactive visualizations across sectors.</li>
                <li>Fixed schema drift in CuRVE’s analytics API within 24 hours.</li>
                <li>Built real-time data layer using Flask + Redis, scaled to 1,400+ RPS.</li>
                <li>Optimized SQL endpoints for 2x performance boost.</li>
                <li>Automated GitHub Actions deployment with rollback support.</li>
              </ul>
            }
          />
        </motion.div>

        <motion.div className="md:col-span-2 space-y-8" variants={containerVariants}>
          <motion.div variants={cardVariants}>
            <ExperienceCard
              org="KiVee Softech"
              role="Senior Software Developer"
              location="Surat, India"
              date="Jan 2022 – Jul 2023"
              contributions={
                <ul className="list-disc list-inside space-y-1">
                  <li>Designed voice authentication APIs using MFCC + TensorFlow.</li>
                  <li>Improved auth speed by 70% with secure fallback flows.</li>
                  <li>Streamlined deployment pipelines using Docker and GitHub Actions.</li>
                </ul>
              }
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <ExperienceCard
              org="Kintu Designs"
              role="Software Developer"
              location="Surat, India"
              date="Feb 2021 – Jan 2022"
              contributions={
                <ul className="list-disc list-inside space-y-1">
                  <li>Developed RESTful APIs and integrated payment gateway in React-native apps.</li>
                  <li>Improved load speed of dashboards by 60% through code refactoring.</li>
                </ul>
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
