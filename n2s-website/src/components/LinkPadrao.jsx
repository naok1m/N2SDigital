// components/LinkPadrao.jsx
import React from "react";

export default function LinkPadrao({ href, children }) {
  return (
    <a
      href={href}
      className="text-white font-medium hover:text-white 
      transition-all duration-300 transform hover:scale-105 relative z-10 
      px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.2)] 
      text-sm md:text-base"
    >
      {children}
    </a>
  );
}
