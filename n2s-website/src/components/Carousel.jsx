import React from 'react';

const TechCarousel = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Docker', icon: '🔷' },
    { name: 'PostgreSQL', icon: '🗄️' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Next.js', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5 py-10">
      <div className="w-full">
        <h2 className="text-white text-4xl font-light text-center mb-16 tracking-widest">
          TECNOLOGIAS
        </h2>
        
        <div className="relative overflow-hidden py-5">
          <div className="flex gap-10 animate-scroll hover:pause">
            {/* Primeiro conjunto */}
            {technologies.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="min-w-[100px] h-[100px] bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-5 transition-all duration-300 hover:bg-neutral-800 hover:border-neutral-700 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-6xl grayscale group-hover:grayscale-0 transition-all duration-300">
                  {tech.icon}
                </div>
                <div className="text-neutral-400 text-base font-medium tracking-wider group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </div>
              </div>
            ))}
            
            {/* Segundo conjunto (duplicado para efeito infinito) */}
            {technologies.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="min-w-[100px] h-[100px] bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-5 transition-all duration-300 hover:bg-neutral-800 hover:border-neutral-700 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-300">
                  {tech.icon}
                </div>
                <div className="text-neutral-400 text-base font-medium tracking-wider group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;