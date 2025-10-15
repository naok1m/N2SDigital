import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faLaptop, 
  faShoppingCart, 
  faUtensils,
  faCode,
  faPalette,
  faMobile,
  faGlobe,
  faArrowRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import GlassButton from './glassButton';
import CustomCursor from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

// Componente de Card de Serviço Avançado
const ServiceCard = ({ icon, title, description, features, index, category, onLearnMore }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Removidas animações individuais - agora padronizadas no componente pai

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Desabilitar em mobile
    
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
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(cardRef.current, {
      scale: window.innerWidth >= 768 ? 1.03 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group h-full"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Card Principal */}
      <div className="service-card-advanced relative rounded-2xl p-6 overflow-hidden h-full">
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
               background: 'linear-gradient(45deg, #9C53E3, #A855F7, #9C53E3)',
               padding: '2px',
               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
               WebkitMaskComposite: 'xor',
               maskComposite: 'exclude'
             }} />

        <div ref={contentRef} className="relative z-10 h-full flex flex-col">
          {/* Header do Card */}
          <div className="flex items-center justify-between mb-6">
            <div className="service-icon-container w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FontAwesomeIcon 
                icon={icon} 
                className="text-2xl text-purple-400 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" 
              />
            </div>
            <div className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {category}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-6 leading-relaxed text-sm flex-grow">
            {description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {features.map((feature, idx) => (
              <div key={idx} className="service-feature-item flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faCheck} className="text-xs text-white" />
                </div>
                <span className="flex-1">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => onLearnMore && onLearnMore({ icon, title, description, features, category })}
            className="service-cta-button w-full text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group"
          >
            <span>Saiba Mais</span>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="text-sm transform transition-transform duration-300 group-hover:translate-x-1" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Estatísticas
const StatsSection = () => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    experience: 0
  });

  const stats = [
    { key: 'projects', number: 150, label: 'Projetos Entregues', icon: faCode },
    { key: 'clients', number: 100, label: 'Clientes Satisfeitos', icon: faGlobe },
    { key: 'satisfaction', number: 98, label: '% Satisfação', icon: faCheck },
    { key: 'experience', number: 4, label: 'Anos de Experiência', icon: faRocket }
  ];

  useEffect(() => {
    // Animação dos contadores
    stats.forEach(stat => {
      gsap.to(counts, {
        [stat.key]: stat.number,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => setCounts(prev => ({ ...prev })),
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
  }, []);

  return (
    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="stats-card rounded-2xl p-6 text-center">
          <div className="stats-icon-container w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <FontAwesomeIcon icon={stat.icon} className="text-lg text-purple-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">
            {stat.key === 'satisfaction' ? `${Math.floor(counts[stat.key])}%` : `${Math.floor(counts[stat.key])}+`}
          </div>
          <div className="text-gray-300 text-xs md:text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const nuvensRef = useRef(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const formRef = useRef(null);
  const overlayRef = useRef(null);
  const serviceModalRef = useRef(null);
  const serviceOverlayRef = useRef(null);

  const handleOpenForm = () => {
    setShowContactForm(true);
    
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    
    gsap.fromTo(formRef.current,
      { 
        scale: 0.5, 
        opacity: 0, 
        y: 100,
        rotationX: -30
      },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: 0.6, 
        ease: "back.out(1.5)",
        delay: 0.1
      }
    );
  };

  const handleCloseForm = () => {
    gsap.to(formRef.current,
      { 
        scale: 0.8, 
        opacity: 0, 
        y: 50,
        duration: 0.3, 
        ease: "power2.in" 
      }
    );
    
    gsap.to(overlayRef.current,
      { 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.out",
        onComplete: () => setShowContactForm(false)
      }
    );
  };

  const handleOpenServiceModal = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
    
    gsap.fromTo(serviceOverlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    
    gsap.fromTo(serviceModalRef.current,
      { 
        scale: 0.5, 
        opacity: 0, 
        y: 100,
        rotationX: -30
      },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: 0.6, 
        ease: "back.out(1.5)",
        delay: 0.1
      }
    );
  };

  const handleCloseServiceModal = () => {
    gsap.to(serviceModalRef.current,
      { 
        scale: 0.8, 
        opacity: 0, 
        y: 50,
        duration: 0.3, 
        ease: "power2.in" 
      }
    );
    
    gsap.to(serviceOverlayRef.current,
      { 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.out",
        onComplete: () => {
          setShowServiceModal(false);
          setSelectedService(null);
        }
      }
    );
  };

  useEffect(() => {
    // Animação de entrada padronizada - seguindo o padrão das outras seções
    const heroTl = gsap.timeline();
    
    heroTl
      .fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5"
      )
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3"
      );

    // Animações com ScrollTrigger padronizadas para stats
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

    // Animações padronizadas para cards de serviços
    gsap.utils.toArray(".service-card-advanced").forEach((card, index) => {
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

  const services = [
    {
      icon: faRocket,
      title: "Landing Pages",
      description: "Páginas de alta conversão otimizadas para capturar leads e transformar visitantes em clientes.",
      category: "Marketing",
      features: [
        "Design responsivo e moderno",
        "Otimização para conversão (CRO)",
        "Integração com ferramentas de marketing",
        "Performance e SEO otimizados"
      ]
    },
    {
      icon: faLaptop,
      title: "Websites Corporativos",
      description: "Sites profissionais que transmitem credibilidade e fortalecem a presença digital da sua empresa.",
      category: "Corporativo",
      features: [
        "Design personalizado e único",
        "Sistema de gerenciamento de conteúdo",
        "Múltiplos idiomas e acessibilidade",
        "Analytics e métricas detalhadas"
      ]
    },
    {
      icon: faShoppingCart,
      title: "E-commerces",
      description: "Lojas virtuais completas e escaláveis para impulsionar suas vendas online.",
      category: "E-commerce",
      features: [
        "Carrinho e checkout otimizados",
        "Integração com gateways de pagamento",
        "Gestão de estoque e pedidos",
        "Sistema de cupons e promoções"
      ]
    },
    {
      icon: faUtensils,
      title: "Cardápios Digitais",
      description: "Solução moderna e interativa para restaurantes modernizarem seu atendimento.",
      category: "Gastronomia",
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
      <CustomCursor />
      
      <section
        ref={sectionRef}
        id="servicos"
        className="relative min-h-screen py-20 overflow-hidden section-noise-blur"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #2d1b69 100%)'
        }}
      >
        {/* Nuvens invertidas no background - Layer 2 */}
        <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none z-[5]">
          <img 
            ref={nuvensRef}
            src="/nuvens.png" 
            alt="Nuvens" 
            className="w-full h-full object-cover opacity-[0.5]"
            style={{
              filter: 'contrast(1.4) brightness(0.6) blur(3px)',
              mixBlendMode: 'multiply',
              transform: 'scaleY(-1)' // Inversão vertical
            }}
          />
        </div>


        {/* Nuvens na parte inferior - Layer 4 */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none z-[6]">
          <img 
            ref={nuvensRef}
            src="/nuvens.png" 
            alt="Nuvens" 
            className="w-full h-full object-cover opacity-[0.5]"
            style={{
              filter: 'contrast(1.4) brightness(0.6) blur(3px)',
              mixBlendMode: 'multiply'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 px-4"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Nossos Serviços
              </span>
            </h2>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Soluções digitais completas para transformar seu negócio e 
              conquistar resultados extraordinários
            </p>
          </div>

          {/* Estatísticas */}
          <StatsSection />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                index={index}
                onLearnMore={handleOpenServiceModal}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[rgba(156,83,227,0.1)] to-[rgba(168,85,247,0.1)] backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FontAwesomeIcon icon={faRocket} className="text-2xl text-white" />
                <h3 className="text-2xl font-bold text-white">
                  Pronto para decolar?
              </h3>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Entre em contato e descubra como podemos transformar sua presença digital
              </p>
              <div className="flex justify-center">
              <GlassButton onClick={handleOpenForm}>
                Fale Conosco Agora
              </GlassButton>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {showServiceModal && selectedService && (
        <div 
          ref={serviceOverlayRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleCloseServiceModal}
        >
          <div 
            ref={serviceModalRef}
            className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-8 max-w-4xl w-full border border-purple-500/30 relative mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseServiceModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <span className="text-white text-xl">×</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                <FontAwesomeIcon 
                  icon={selectedService.icon} 
                  className="text-2xl text-purple-400" 
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {selectedService.title}
                </h2>
                <div className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-block">
                  {selectedService.category}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {selectedService.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">O que está incluído:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon icon={faCheck} className="text-xs text-white" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 mb-8 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-6 text-center">Por que escolher este serviço?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FontAwesomeIcon icon={faRocket} className="text-xl text-purple-400" />
                  </div>
                  <div className="text-gray-300">Entrega rápida</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FontAwesomeIcon icon={faCheck} className="text-xl text-purple-400" />
                  </div>
                  <div className="text-gray-300">Foco em resultados</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FontAwesomeIcon icon={faGlobe} className="text-xl text-purple-400" />
                  </div>
                  <div className="text-gray-300">Suporte completo</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCloseServiceModal}
                className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleCloseServiceModal();
                  handleOpenForm();
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      )}
            
      {/* Contact Form Modal */}
{showContactForm && (
  <div 
    ref={overlayRef}
    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    onClick={handleCloseForm}
  >
    <div 
      ref={formRef}
            className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-purple-500/30 relative mx-4"
      onClick={(e) => e.stopPropagation()}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Close Button */}
      <button
        onClick={handleCloseForm}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
      >
        <span className="text-white text-xl">×</span>
      </button>

            <h3 className="text-3xl font-bold text-white mb-2">
        Vamos conversar! 💬
      </h3>
            <p className="text-gray-400 mb-6 text-sm">
        Preencha o formulário e entraremos em contato
      </p>

            <form className="space-y-4">
        <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Nome</label>
          <input
            type="text"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-sm"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-sm"
            placeholder="seu@email.com"
          />
        </div>

        <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Telefone</label>
          <input
            type="tel"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-sm"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Mensagem</label>
          <textarea
            rows="4"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none text-sm"
            placeholder="Conte-nos sobre seu projeto..."
          ></textarea>
        </div>

        <button
          type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-sm"
        >
          Enviar Mensagem 🚀
        </button>
      </form>
    </div>
  </div>
)}
    </>
  );
}