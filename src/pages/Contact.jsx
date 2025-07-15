import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [showWelcome, setShowWelcome] = useState(true);
const [showThankYou, setShowThankYou] = useState(false);
  useEffect(() => {
  const timer = setTimeout(() => {
    setShowWelcome(false);
  }, 1500);
  return () => clearTimeout(timer);
}, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ka8aok7',    
        'template_df3rbmv',   
        formRef.current,
        'cERZCU1KqPnd5C7Dt'
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setShowThankYou(true);
          formRef.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Oops! Something went wrong.");
        }
      );
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-gray-900 dark:via-black dark:to-zinc-900 transition-colors duration-500 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-80 h-80 bg-cyan-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-60 h-60 bg-purple-300 opacity-20 blur-2xl rounded-full animate-ping"></div>
      </div>

      <AnimatePresence mode="wait">
        {showWelcome ? (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7 }}
      className="text-4xl sm:text-5xl font-semibold text-center text-cyan-500 dark:text-cyan-300 z-10"
      style={{
        textShadow: '0 0 6px rgba(34,211,238,0.6), 0 0 20px rgba(34,211,238,0.4)',
        backdropFilter: 'blur(6px)',
        color: 'rgba(255, 255, 255, 0.85)',
      }}
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
            className="text-4xl sm:text-5xl font-semibold text-center text-cyan-500 dark:text-cyan-300 z-10"
            style={{
              textShadow: '0 0 6px rgba(34,211,238,0.6), 0 0 20px rgba(34,211,238,0.4)',
              backdropFilter: 'blur(6px)',
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            Thank you for contacting me!
          </motion.div>
        ) : (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-2xl p-8 sm:p-10 rounded-3xl bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.2)] z-10"
          >
            <h2
              className="text-3xl sm:text-4xl font-semibold mb-8 text-center z-10 tracking-tight"
              style={{
                color: 'rgba(255, 255, 255, 0.88)',
                textShadow: '0 0 1px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.25)',
              }}
            >
              Get in Touch
            </h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b border-gray-400 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:border-cyan-500 transition"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b border-gray-400 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:border-cyan-500 transition"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Message"
                  required
                  className="peer w-full px-4 pt-5 pb-2 bg-transparent border-b border-gray-400 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:border-cyan-500 transition"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-white/80 dark:bg-white/10 border border-white/30 text-gray-900 dark:text-white font-semibold rounded-xl shadow-sm hover:shadow-md hover:scale-[1.015] active:scale-[0.98] transition-all duration-200 ease-in-out backdrop-blur-md tracking-wide"
                style={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  letterSpacing: "0.5px",
                }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
