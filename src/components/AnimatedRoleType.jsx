// src/components/AnimatedRoleType.jsx
import { useEffect, useState } from "react";

export default function AnimatedRoleType({
  words = ["UI/UX Designer", "Scientist", "Product Thinker"],
  typeSpeed = 110,      // ms per letter
  eraseSpeed = 60,
  pause = 1500,         // pause when word is complete
  className = "",
}) {
  const [word, setWord]       = useState(0);
  const [chars, setChars]     = useState(0);
  const [deleting, setDel]    = useState(false);

  useEffect(() => {
    const current = words[word];
    const delay   = deleting ? eraseSpeed : typeSpeed;

    const timer = setTimeout(() => {
      /* typing forward */
      if (!deleting && chars < current.length) {
        setChars(chars + 1);
      }
      /* finished typing → pause */
      else if (!deleting && chars === current.length) {
        setDel(true);
      }
      /* erasing backward */
      else if (deleting && chars > 0) {
        setChars(chars - 1);
      }
      /* finished erasing → next word */
      else if (deleting && chars === 0) {
        setDel(false);
        setWord((word + 1) % words.length);
      }
    }, chars === current.length && !deleting ? pause : delay);

    return () => clearTimeout(timer);
  }, [chars, deleting, word, words, typeSpeed, eraseSpeed, pause]);

  return (
    <span className={`relative inline-flex items-baseline ${className}`}>
      {words[word].slice(0, chars)}
      {/* blinking cursor */}
      <span className="ml-2 border-current animate-pulse ml-0.5" />
    </span>
  );
}
