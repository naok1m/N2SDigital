import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLightbulb, 
  faHeart,
  faUsers,
  faCode,
  faGlobe,
  faCheck,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import StatCard from './StatCard';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    // Animações de entrada removidas
  }, []);

  // Otimizar dados com useMemo para evitar re-renders desnecessários
  const stats = useMemo(() => [
    { number: "150+", label: "Projetos Entregues", icon: faCode },
    { number: "100+", label: "Clientes Satisfeitos", icon: faGlobe },
    { number: "98%", label: "Satisfação", icon: faCheck },
    { number: "4+", label: "Anos de Experiência", icon: faRocket }
  ], []);

  const values = useMemo(() => [
    {
      icon: faLightbulb,
      title: "Inovação",
      description: "Sempre buscamos as melhores tecnologias para entregar soluções únicas e modernas."
    },
    {
      icon: faHeart,
      title: "Paixão",
      description: "Amamos o que fazemos e isso se reflete na qualidade de cada projeto desenvolvido."
    },
    {
      icon: faUsers,
      title: "Colaboração",
      description: "Acreditamos que os melhores resultados vêm do trabalho em equipe e parcerias sólidas."
    }
  ], []);

  return (
    <section id="sobre" ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{backgroundColor: '#000001'}}>
      {/* Black Hole Background */}
      <div className="absolute inset-0 flex items-center justify-center pt-64 pointer-events-none z-0">
        <img 
          src="/images/backgrounds/blackhole.webp" 
          alt="Buraco negro no background" 
          className="w-[1200px] h-[1200px] md:w-[1400px] md:h-[1400px] lg:w-[1600px] lg:h-[1600px] xl:w-[1800px] xl:h-[1800px] opacity-[0.15] 
                     mix-blend-mode-screen 
                     pointer-events-none
                     select-none"
          loading="lazy"
          decoding="async"
          style={{
            filter: 'brightness(1.3) contrast(1.2) blur(8px)',
            willChange: 'transform'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero da Seção */}
        <div ref={heroRef} className="text-center mb-16">
          <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Sobre Nós
            </span>
          </h2>
          <p className="about-subtitle text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Somos uma empresa de tecnologia digital apaixonada por criar soluções inovadoras 
            que transformam ideias em realidade. Conectamos pessoas, fortalecemos marcas e 
            impulsionamos o crescimento através da tecnologia.
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              index={index}
            />
          ))}
        </div>


        {/* Values Section */}
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="stats-card value-card rounded-2xl p-6 text-center">
              <div className="stats-icon-container w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <FontAwesomeIcon icon={value.icon} className="text-lg text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
