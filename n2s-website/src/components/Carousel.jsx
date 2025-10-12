import React from "react";

export default function TechCarousel() {
  return (
    <section className="bg-gray-900 text-white flex flex-col items-center justify-center py-20 overflow-hidden">

      <div className="overflow-hidden w-full max-w-6xl">
        <div className="flex animate-scroll">
          {/* Primeiro grupo */}
          <div className="flex gap-16 px-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-16 h-16" alt="HTML" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-16 h-16" alt="CSS" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-16 h-16" alt="JavaScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-16 h-16" alt="Node.js" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-16 h-16" alt="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-16 h-16" alt="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className="w-16 h-16" alt="PHP" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-16 h-16" alt="MySQL" />
          </div>

          {/* Segundo grupo (pra fazer o loop contínuo) */}
          <div className="flex gap-16 px-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-16 h-16" alt="HTML" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-16 h-16" alt="CSS" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-16 h-16" alt="JavaScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-16 h-16" alt="Node.js" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-16 h-16" alt="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-16 h-16" alt="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className="w-16 h-16" alt="PHP" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-16 h-16" alt="MySQL" />
          </div>
        </div>
      </div>
    </section>
  );
}
