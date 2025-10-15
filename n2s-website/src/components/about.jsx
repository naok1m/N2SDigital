import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faLightbulb, 
  faHeart,
  faUsers,
  faCode,
  faPalette
} from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    // Animação de entrada do hero
    const heroTl = gsap.timeline();
    
    heroTl
      .fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(".about-title", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5"
      )
      .fromTo(".about-subtitle", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3"
      );

    // Animações com ScrollTrigger para stats
    gsap.utils.toArray(".stat-card").forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Animações para valores
    gsap.utils.toArray(".value-card").forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 40, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

  }, []);

  const stats = [
    { number: "100+", label: "Clientes Satisfeitos", icon: faUsers },
    { number: "100+", label: "Projetos Concluídos", icon: faCode },
    { number: "4+", label: "Anos de Experiência", icon: faRocket },
    { number: "99%", label: "Satisfação", icon: faHeart }
  ];

  const values = [
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
  ];

  return (
    <section id="sobre" ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0f] to-[#1a0b2e] section-noise-blur">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero da Seção */}
        <div ref={heroRef} className="text-center mb-16">
          <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Sobre Nós
            </span>
          </h2>
          <p className="about-subtitle text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Somos uma empresa de tecnologia digital apaixonada por criar soluções inovadoras 
            que transformam ideias em realidade. Conectamos pessoas, fortalecemos marcas e 
            impulsionamos o crescimento através da tecnologia.
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <FontAwesomeIcon icon={stat.icon} className="text-xl text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="value-card rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon={value.icon} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
