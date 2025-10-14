import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ icon, title, description, features, delay, index, image }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    // Animação de entrada com scroll
    gsap.fromTo(card,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: -15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: delay,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animação do conteúdo interno
    gsap.fromTo(content.children,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: delay + 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(cardRef.current, {
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleImageClick = () => {
    setShowImage(!showImage);
    if (!showImage) {
      gsap.fromTo(imageRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(imageRef.current,
        { scale: 0, opacity: 0, rotation: 180, duration: 0.3, ease: "power2.in" }
      );
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      className="relative group"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 overflow-hidden transition-all duration-500 h-full">
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background: 'linear-gradient(45deg, #a855f7, #ec4899, #a855f7)',
               padding: '2px',
               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
               WebkitMaskComposite: 'xor',
               maskComposite: 'exclude'
             }} />

        <div ref={contentRef} className="relative z-10">
          {/* Icon and Image Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-5xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {icon}
            </div>
            <button 
              onClick={handleImageClick}
              className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 border border-purple-500/30"
            >
              {showImage ? '✕ Fechar' : '🖼️ Ver Exemplo'}
            </button>
          </div>

          {/* Image Preview */}
          {showImage && (
            <div 
              ref={imageRef}
              className="mb-4 rounded-lg overflow-hidden border-2 border-purple-500/30 cursor-pointer"
              onClick={handleImageClick}
            >
              <img 
                src={image} 
                alt={title}
                className="w-full h-40 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-4 leading-relaxed text-sm">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                <span className="text-purple-400 mt-1">✦</span>
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-sm">
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl px-2 md:px-4 opacity-90">
      <nav className="flex items-center justify-center gap-2 md:gap-3
                      bg-gradient-to-r from-[rgba(255,255,255,0.25)] via-[rgba(255,255,255,0.18)] to-[rgba(255,255,255,0.25)]
                      border border-[rgba(255,255,255,0.3)]
                      backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                      rounded-full px-3 md:px-8 py-1.5 relative overflow-hidden">
        
        <a href="/" className="text-white font-medium hover:text-white transition-all duration-300 transform hover:scale-105 px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.2)] text-sm md:text-base">
          Início
        </a>
        <a href="#servicos" className="text-white font-medium hover:text-white transition-all duration-300 transform hover:scale-105 px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.2)] text-sm md:text-base">
          Serviços
        </a>
        
        <a href="/" className="w-8 md:w-10 h-6 md:h-8 flex items-center justify-center 
                        bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.15)]
                        border border-[rgba(255,255,255,0.4)] rounded-full
                        backdrop-blur-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
                        relative z-10 hover:scale-105 transition-all duration-300">
          <span className="text-white font-bold text-xs md:text-sm">N2S</span>
        </a>
        
        <a href="#sobre" className="text-white font-medium hover:text-white transition-all duration-300 transform hover:scale-105 px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.2)] text-sm md:text-base">
          Sobre
        </a>
        <a href="#contato" className="text-white font-medium hover:text-white transition-all duration-300 transform hover:scale-105 px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.2)] text-sm md:text-base">
          Contato
        </a>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0f] to-[#050508] border-t border-gray-800/50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N2S</span>
            </div>
            <span className="text-white font-semibold text-lg">N2S Digital</span>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              Início
            </a>
            <a href="#servicos" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              Serviços
            </a>
            <a href="#sobre" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              Sobre
            </a>
            <a href="#contato" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              Contato
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <span className="text-white text-sm">📧</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <span className="text-white text-sm">💼</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <span className="text-white text-sm">🐦</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 N2S Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animação do título com efeito de letras
    const titleText = titleRef.current;
    const text = titleText.textContent;
    titleText.textContent = '';
    
    text.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      titleText.appendChild(span);
    });

    gsap.fromTo(titleRef.current.children,
      {
        y: -80,
        opacity: 0,
        rotationX: -90,
        scale: 0.5
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animação do subtítulo
    gsap.fromTo(subtitleRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animação de partículas flutuantes
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });
  }, []);

  const services = [
    {
      icon: "🚀",
      title: "Landing Pages",
      description: "Páginas de alta conversão otimizadas para capturar leads e transformar visitantes em clientes.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      features: [
        "Design responsivo e moderno",
        "Otimização para conversão (CRO)",
        "Integração com ferramentas de marketing",
        "Performance e SEO otimizados"
      ]
    },
    {
      icon: "💼",
      title: "Websites Corporativos",
      description: "Sites profissionais que transmitem credibilidade e fortalecem a presença digital da sua empresa.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      features: [
        "Design personalizado e único",
        "Sistema de gerenciamento de conteúdo",
        "Múltiplos idiomas e acessibilidade",
        "Analytics e métricas detalhadas"
      ]
    },
    {
      icon: "🛒",
      title: "E-commerces",
      description: "Lojas virtuais completas e escaláveis para impulsionar suas vendas online.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      features: [
        "Carrinho e checkout otimizados",
        "Integração com gateways de pagamento",
        "Gestão de estoque e pedidos",
        "Sistema de cupons e promoções"
      ]
    },
    {
      icon: "📱",
      title: "Cardápios Digitais",
      description: "Solução moderna e interativa para restaurantes modernizarem seu atendimento.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop",
      features: [
        "Interface intuitiva e atrativa",
        "Atualização em tempo real",
        "QR Code para acesso rápido",
        "Painel administrativo completo"
      ]
    }
  ];

  return (
    <>
      <Header />
      
      <section
        ref={sectionRef}
        id="servicos"
        className="relative min-h-screen py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #2d1b69 100%)'
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30"
             style={{
               backgroundImage: 'url("/noise.png")',
               backgroundSize: '256px 256px',
               backgroundRepeat: 'repeat',
               mixBlendMode: 'overlay'
             }} />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-purple-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl font-black mb-6 text-white"
            >
              Nossos Serviços
            </h2>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Soluções digitais completas para transformar seu negócio e 
              conquistar resultados extraordinários
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                delay={index * 0.15}
                index={index}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-3">
                Pronto para decolar? 🚀
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Entre em contato e descubra como podemos transformar sua presença digital
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Fale Conosco Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}