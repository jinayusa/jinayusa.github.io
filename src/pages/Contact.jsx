// src/pages/Contact.jsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Copy } from "lucide-react";

// 🔗 Update these
const LINKS = {
  github: "https://github.com/jinayusa",
  linkedin: "https://www.linkedin.com/in/jinay24",
  email: "mailto:jinay.y.shah@outlook.com?subject=Hello%20Jinay",
};

export default function Contact() {
  const formRef = useRef();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_ka8aok7", "template_df3rbmv", formRef.current, "cERZCU1KqPnd5C7Dt")
      .then(
        () => {
          setShowThankYou(true);
          formRef.current?.reset();
          setTimeout(() => setShowThankYou(false), 2200);
        },
        (err) => {
          console.error("EmailJS failed:", err?.text || err);
          alert("Oops! Something went wrong.");
        }
      );
  };

  const copyEmail = async () => {
    try {
      const email = (LINKS.email.match(/^mailto:([^?]+)/) || [, ""])[1];
      if (!email) return;
      await navigator.clipboard.writeText(email);
      alert("Email copied!");
    } catch {}
  };

  // Animations
  const linksContainer = {
    hidden: { opacity: 0, x: -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const linkItem = {
    hidden: { opacity: 0, x: -18, scale: 0.98 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };
  const formContainer = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
    },
  };
  const formField = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section className="min-h-screen px-6 py-12 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-gray-900 dark:via-black dark:to-zinc-900 transition-colors duration-500 relative overflow-hidden flex items-center justify-center">
      {/* background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-80 h-80 bg-cyan-300 opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-60 h-60 bg-purple-300 opacity-20 blur-2xl rounded-full animate-ping" />
      </div>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="mx-auto text-4xl sm:text-5xl font-semibold text-center text-cyan-500 dark:text-cyan-300 drop-shadow-md dark:drop-shadow-lg z-10"
          >
            Thank you for visiting!
          </motion.div>
        ) : showThankYou ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="mx-auto text-4xl sm:text-5xl font-semibold text-center text-cyan-500 dark:text-cyan-300 drop-shadow-md dark:drop-shadow-lg z-10"
            aria-live="polite"
          >
            Thank you for contacting me!
          </motion.div>
        ) : (
          <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT — animated contact info */}
            <motion.aside
              variants={linksContainer}
              initial="hidden"
              animate="show"
              className="order-1 lg:order-none"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Find me online
              </h2>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 max-w-prose">
                Prefer a quick DM or a code peek before emailing? Here are my active profiles and
                direct email. Everything below expands with details as it slides in.
              </p>

              <ul className="space-y-3">
                {/* GitHub */}
                <motion.li variants={linkItem}>
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/30 bg-white/70 dark:bg-white/10 backdrop-blur-md px-4 py-3 hover:shadow-md transition"
                    aria-label="GitHub"
                  >
                    <span className="shrink-0 rounded-lg p-2 bg-black text-white dark:bg-white dark:text-black">
                      <Github size={18} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">GitHub</div>
                      <div className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        github.com/jinayusa
                      </div>
                    </div>
                  </a>
                </motion.li>

                {/* LinkedIn */}
                <motion.li variants={linkItem}>
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/30 bg-white/70 dark:bg-white/10 backdrop-blur-md px-4 py-3 hover:shadow-md transition"
                    aria-label="LinkedIn"
                  >
                    <span className="shrink-0 rounded-lg p-2 bg-[#0A66C2] text-white">
                      <Linkedin size={18} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">LinkedIn</div>
                      <div className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        linkedin.com/in/jinay24
                      </div>
                    </div>
                  </a>
                </motion.li>

                {/* Email */}
                <motion.li variants={linkItem}>
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/70 dark:bg-white/10 backdrop-blur-md px-4 py-3 hover:shadow-md transition">
                    <span className="shrink-0 rounded-lg p-2 bg-cyan-600 text-white">
                      <Mail size={18} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Email</div>
                      <div className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {(LINKS.email.match(/^mailto:([^?]+)/) || [, "jinay.y.shah@outlook.com"])[1]}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={LINKS.email}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/80 dark:hover:bg-white/20 transition text-gray-900 dark:text-white"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="p-2 rounded-lg border border-white/30 hover:bg-white/80 dark:hover:bg-white/20 transition text-gray-900 dark:text-white"
                        aria-label="Copy email"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </motion.li>
              </ul>
            </motion.aside>

            {/* RIGHT — form card */}
            <motion.div
              key="contact-form"
              variants={formContainer}
              initial="hidden"
              animate="show"
              className="w-full max-w-2xl lg:max-w-none lg:justify-self-end p-8 sm:p-10 rounded-3xl 
                         bg-gradient-to-br from-white/70 to-white/55 dark:from-white/10 dark:to-white/5
                         backdrop-blur-xl border border-white/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white tracking-tight">
                Get in Touch
              </h3>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <motion.div variants={formField} className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-transparent text-black dark:text-white focus:outline-none 
                               focus:border-cyan-500 transition"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm 
                                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                                    peer-focus:top-0 peer-focus:text-sm transition-all">
                    Name
                  </label>
                </motion.div>

                <motion.div variants={formField} className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-transparent text-black dark:text-white focus:outline-none 
                               focus:border-cyan-500 transition"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm 
                                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                                    peer-focus:top-0 peer-focus:text-sm transition-all">
                    Email
                  </label>
                </motion.div>

                <motion.div variants={formField} className="relative">
                  <textarea
                    rows="4"
                    name="message"
                    required
                    className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-transparent text-black dark:text-white focus:outline-none 
                               focus:border-cyan-500 transition"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm 
                                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                                    peer-focus:top-0 peer-focus:text-sm transition-all">
                    Message
                  </label>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-6 rounded-xl bg-cyan-600 text-white font-semibold 
                             shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
