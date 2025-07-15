// src/components/SocialLinks.jsx
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function SocialLinks() {
  /* 1. Add / update items here */
  const links = [
    { href: "https://github.com/jinayusa",     icon: <Github   size={20} /> },
    { href: "https://linkedin.com/in/jinay24",icon: <Linkedin size={20} /> },
    { href: "https://twitter.com/JinaySh35827446",    icon: <Twitter  size={20} /> },
    { href: "mailto:jinay.y.shah@outlook.com",          icon: <Mail     size={20} /> },
  ];

  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-3 z-40">
      {links.map(({ href, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300
                     hover:text-brand-500 dark:hover:text-brand-400
                     transition"
          aria-label="social link"
        >
          {icon}
        </a>
      ))}

      {/* subtle vertical line for style */}
      <span className="w-px h-20 bg-gray-400/50 dark:bg-gray-500/50 mx-auto mt-2" />
    </div>
  );
}
