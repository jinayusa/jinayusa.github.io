// EducationPage.jsx
import { motion } from "framer-motion";

export default function EducationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-start bg-gradient-to-br from-neutral-100 via-white to-neutral-200 dark:from-black dark:via-neutral-900 dark:to-black px-6 py-24 sm:px-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full px-4 sm:px-8 py-10 text-black dark:text-white flex justify-center items-start"
        >
        <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 px-6 sm:px-10 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Education</h1>
            <div className="space-y-6 text-sm sm:text-base">
            <div>
                <h2 className="font-semibold">Arizona State University</h2>
                <p>MS in Information Technology, 2023 – 2025</p>
                <p className="text-neutral-500 dark:text-neutral-400">Tempe, AZ, USA</p>
            </div>
            <div>
                <h2 className="font-semibold">Gujarat Technological University</h2>
                <p>Bachelor of Engineering in Information Technology, 2018 – 2022</p>
                <p className="text-neutral-500 dark:text-neutral-400">Surat, India</p>
            </div>
            </div>
        </div>
        </motion.div>
    </motion.div>
  );
}
