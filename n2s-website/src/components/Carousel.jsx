import React, { useRef, useEffect } from 'react';
import { gsap from 'gsap';

export default function TechCarousel() {
  const ribbon1Ref = useRef(null);
  const ribbon2Ref = useRef(null);

  useEffect(() => {
    // Animação da primeira fita (da direita para esquerda)
    gsap.to(ribbon1Ref.current, {
      x: "-100%",
      duration: 20,
      ease: "none",
      repeat: -1
    });

    // Animação da segunda fita (da esquerda para direita)
    gsap.to(ribbon2Ref.current, {
      x: "100%",
      duration: 25,
      ease: "none",
      repeat: -1
    });

    // Animação de hover nos ícones
    const icons = document.querySelectorAll('.tech-icon');
    icons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  const technologies = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "text-blue-400" },
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", color: "text-green-400" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg", color: "text-red-400" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "text-green-500" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "text-yellow-400" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "text-blue-500" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "text-green-600" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "text-blue-600" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "text-blue-500" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", color: "text-orange-400" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "text-purple-400" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "text-orange-500" }
  ];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Primeira fita - movendo da direita para esquerda */}
      <div ref={ribbon1Ref} className="flex gap-8 whitespace-nowrap">
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={`ribbon1-${index}`} className="tech-item flex items-center gap-3 tech-ribbon rounded-full px-6 py-3 group">
            <img 
              src={tech.icon} 
              className="w-8 h-8 tech-icon" 
              alt={tech.name}
            />
            <span className={`text-sm font-semibold ${tech.color} group-hover:scale-105 transition-transform duration-300`}>
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Segunda fita - movendo da esquerda para direita */}
      <div ref={ribbon2Ref} className="flex gap-8 whitespace-nowrap mt-4">
        {[...technologies.reverse(), ...technologies].map((tech, index) => (
          <div key={`ribbon2-${index}`} className="tech-item flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
            <img 
              src={tech.icon} 
              className="w-8 h-8 tech-icon" 
              alt={tech.name}
            />
            <span className={`text-sm font-semibold ${tech.color} group-hover:scale-105 transition-transform duration-300`}>
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Efeito de gradiente nas bordas */}
      <div className="absolute inset-y-0 left-0 w-20 carousel-fade-left pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 carousel-fade-right pointer-events-none z-10"></div>
    </div>
  );
}
