import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faCheck, 
  faClock, 
  faDollarSign,
  faRocket,
  faLaptop,
  faShoppingCart,
  faMobile
} from '@fortawesome/free-solid-svg-icons';
import GlassButton from './glassButton';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Dados detalhados dos serviços
  const serviceDetails = {
    "Landing Pages": {
      icon: service.icon,
      title: "Landing Pages",
      subtitle: "Sua ponte para conversões extraordinárias",
      description: "Landing pages são páginas web estrategicamente projetadas para converter visitantes em leads ou clientes. Elas são o coração de qualquer campanha de marketing digital eficaz.",
      benefits: [
        "Taxa de conversão até 3x maior que sites tradicionais",
        "Foco total na ação desejada (sem distrações)",
        "Otimizadas para dispositivos móveis",
        "Integração perfeita com campanhas de marketing"
      ],
      process: [
        "Análise do público-alvo e objetivos",
        "Criação do design e copy persuasivo",
        "Desenvolvimento técnico otimizado",
        "Testes A/B para máxima conversão"
      ],
      examples: [
        "Páginas de captura de leads",
        "Lançamentos de produtos/serviços",
        "Páginas de agendamento",
        "Páginas de webinar/eventos"
      ]
    },
    "Websites Corporativos": {
      icon: service.icon,
      title: "Websites Corporativos",
      subtitle: "Sua marca digital profissional",
      description: "Um website corporativo é a vitrine digital da sua empresa, transmitindo credibilidade, profissionalismo e confiança para seus clientes e parceiros.",
      benefits: [
        "Presença digital profissional 24/7",
        "Credibilidade e confiança da marca",
        "Facilita o relacionamento com clientes",
        "Suporte a múltiplos idiomas e acessibilidade"
      ],
      process: [
        "Planejamento estratégico e arquitetura",
        "Design personalizado e único",
        "Desenvolvimento responsivo",
        "Integração com sistemas e ferramentas"
      ],
      examples: [
        "Sites institucionais",
        "Portais corporativos",
        "Sites de portfólio",
        "Plataformas de apresentação"
      ]
    },
    "E-commerces": {
      icon: service.icon,
      title: "E-commerces",
      subtitle: "Sua loja virtual de alta performance",
      description: "E-commerces são plataformas de vendas online completas que transformam visitantes em clientes, oferecendo uma experiência de compra excepcional.",
      benefits: [
        "Vendas 24 horas por dia, 7 dias por semana",
        "Alcance global de clientes",
        "Automação de processos de venda",
        "Análises detalhadas de performance"
      ],
      process: [
        "Análise do modelo de negócio",
        "Design da experiência de compra",
        "Integração de pagamentos e logística",
        "Otimização para conversão"
      ],
      examples: [
        "Lojas de produtos físicos",
        "Marketplaces digitais",
        "Assinaturas e serviços recorrentes",
        "E-commerces B2B"
      ]
    },
    "Aplicativos Mobile": {
      icon: service.icon,
      title: "Aplicativos Mobile",
      subtitle: "Conecte-se com seus clientes na palma da mão",
      description: "Aplicativos mobile são soluções nativas que colocam sua marca literalmente na palma da mão dos seus clientes, oferecendo experiências únicas e personalizadas.",
      benefits: [
        "Acesso direto e personalizado aos usuários",
        "Notificações push para engajamento",
        "Funcionalidades offline e online",
        "Integração com recursos do dispositivo"
      ],
      process: [
        "Análise de requisitos e UX/UI",
        "Desenvolvimento nativo ou híbrido",
        "Testes e otimização de performance",
        "Publicação nas app stores"
      ],
      examples: [
        "Apps de e-commerce mobile",
        "Aplicativos de serviços",
        "Apps de produtividade empresarial",
        "Plataformas de conteúdo"
      ]
    }
  };

  const currentService = serviceDetails[service.title] || service;

  useEffect(() => {
    if (isOpen) {
      // Animação de entrada do modal
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current,
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 50 
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: "back.out(1.7)" 
        }
      );
    } else {
      // Animação de saída do modal
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(contentRef.current, 
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 50, 
          duration: 0.3 
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
      >
        {/* Header */}
        <div className="mb-8">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                <FontAwesomeIcon 
                  icon={currentService.icon} 
                  className="text-2xl text-purple-400" 
                />
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 border border-gray-600/50"
              >
                <FontAwesomeIcon icon={faTimes} className="text-white text-lg" />
              </button>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {currentService.title}
              </h2>
              <p className="text-purple-300 text-lg">
                {currentService.subtitle}
              </p>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                <FontAwesomeIcon 
                  icon={currentService.icon} 
                  className="text-2xl text-purple-400" 
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentService.title}
                </h2>
                <p className="text-purple-300 text-lg">
                  {currentService.subtitle}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-purple-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 border border-gray-600/50"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            {currentService.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
              <FontAwesomeIcon icon={faCheck} className="text-purple-400 text-sm" />
            </div>
            Principais Benefícios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentService.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30 flex-shrink-0 mt-1">
                  <FontAwesomeIcon icon={faCheck} className="text-purple-400 text-xs" />
                </div>
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
              <FontAwesomeIcon icon={faClock} className="text-purple-400 text-sm" />
            </div>
            Nosso Processo
          </h3>
          <div className="space-y-3">
            {currentService.process.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
              <FontAwesomeIcon icon={faRocket} className="text-purple-400 text-sm" />
            </div>
            Exemplos de Aplicação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentService.examples.map((example, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="text-gray-300 text-sm">{example}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Notice */}
        <div className="bg-gradient-to-r from-[rgba(168,85,247,0.1)] to-[rgba(168,85,247,0.05)] border border-purple-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30 flex-shrink-0 mt-1">
              <FontAwesomeIcon icon={faDollarSign} className="text-purple-400 text-sm" />
            </div>
            <div>
              <p className="text-purple-300 font-medium mb-1">Investimento e Prazo</p>
              <p className="text-gray-400 text-sm">
                O prazo e o valor variam de projeto para projeto, dependendo da complexidade, 
                funcionalidades e requisitos específicos. Entre em contato para um orçamento personalizado.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <GlassButton onClick={onClose}>
            Entendi! Vamos conversar
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
