import React, { useRef, useEffect } from "react";
import { Rocket, Briefcase, ShoppingCart, Smartphone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassButton from "./glassButton";
import Footer from "./footer";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const handleOpenForm = () => {
    const contato = document.getElementById("contato");
    if (contato) contato.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      icon: <Rocket className="w-12 h-12 text-purple-400" />,
      title: "Landing Pages",
      description:
        "Páginas de alta conversão otimizadas para capturar leads e transformar visitantes em clientes.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      features: [
        "Design responsivo e moderno",
        "Otimização para conversão (CRO)",
        "Integração com ferramentas de marketing",
        "Performance e SEO otimizados",
      ],
    },
    {
      icon: <Briefcase className="w-12 h-12 text-purple-400" />,
      title: "Websites Corporativos",
      description:
        "Sites profissionais que transmitem credibilidade e fortalecem a presença digital da sua empresa.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      features: [
        "Design personalizado e único",
        "Sistema de gerenciamento de conteúdo",
        "Múltiplos idiomas e acessibilidade",
        "Analytics e métricas detalhadas",
      ],
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-purple-400" />,
      title: "E-commerces",
      description:
        "Lojas virtuais completas e escaláveis para impulsionar suas vendas online.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      features: [
        "Carrinho e checkout otimizados",
        "Integração com gateways de pagamento",
        "Gestão de estoque e pedidos",
        "Sistema de cupons e promoções",
      ],
    },
    {
      icon: <Smartphone className="w-12 h-12 text-purple-400" />,
      title: "Cardápios Digitais",
      description:
        "Solução moderna e interativa para restaurantes modernizarem seu atendimento.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop",
      features: [
        "Interface intuitiva e atrativa",
        "Atualização em tempo real",
        "QR Code para acesso rápido",
        "Painel administrativo completo",
      ],
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="servicos"
        className="relative min-h-screen py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #2d1b69 100%)",
        }}
      >
        {/* Textured Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("/noise.png")',
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-purple-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-white px-4"
            >
              Nossos Serviços
            </h2>
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Soluções digitais completas para transformar seu negócio e
              conquistar resultados extraordinários.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-2xl font-bold mt-4 mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="text-gray-400 text-sm space-y-2 mb-4 text-left">
                    {service.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center px-4">
            <div className="inline-block bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 max-w-lg w-full">
              <h3 className="text-2xl font-bold text-white mb-3">
                Pronto para decolar? 🚀
              </h3>
              <p className="text-gray-300 mb-6 text-sm">
                Entre em contato e descubra como podemos transformar sua presença
                digital.
              </p>
              <GlassButton onClick={handleOpenForm}>
                Fale Conosco Agora
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer fora da section */}
      <Footer />
    </>
  );
}
