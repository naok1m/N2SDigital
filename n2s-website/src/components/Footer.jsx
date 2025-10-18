import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faGlobe,
  faCode,
  faRocket,
  faChevronUp,
  faExternalLinkAlt,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, 
  faInstagram,
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logoN2S.png';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dados das seções do footer
  const companyInfo = {
    name: "N2S Group",
    description: "Transformamos ideias em soluções digitais inovadoras. Conectamos pessoas, fortalecemos marcas e impulsionamos o crescimento através da tecnologia.",
    founded: "2022",
    location: "Fortaleza, CE - Brasil"
  };

  const services = [
    { name: "Landing Pages", href: "#servicos" },
    { name: "Websites Corporativos", href: "#servicos" },
    { name: "E-commerces", href: "#servicos" },
    { name: "Aplicativos Mobile", href: "#servicos" }
  ];

  const quickLinks = [
    { name: "Início", href: "#hero" },
    { name: "Serviços", href: "#servicos" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" }
  ];

  const socialLinks = [
    { name: "WhatsApp", icon: faWhatsapp, href: "https://wa.me/5585996941119", color: "#25D366" },
    { name: "Instagram", icon: faInstagram, href: "https://instagram.com/n2sgroup", color: "#E4405F" },
    { name: "Facebook", icon: faFacebook, href: "https://facebook.com/n2sgroup", color: "#1877F2" },
    { name: "Twitter", icon: faTwitter, href: "https://twitter.com/n2sgroup", color: "#1DA1F2" }
  ];

  const contactInfo = [
    { icon: faEnvelope, text: "contato@n2sgroup.com.br", href: "mailto:contato@n2sgroup.com.br" },
    { icon: faPhone, text: "+55 (85) 9 9694-1119", href: "tel:+5585996941119" },
    { icon: faMapMarkerAlt, text: "Fortaleza, CE - Brasil", href: "#" },
    { icon: faGlobe, text: "www.n2sgroup.com.br", href: "https://n2sgroup.com.br" }
  ];


  // Função para scroll para o topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para scroll para seção
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80;
      window.scrollTo(0, offsetPosition);
    }
  };

  useEffect(() => {
    // Controle do botão scroll to top
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (
    <>
      {/* Botão WhatsApp */}
      <a
        href="https://wa.me/5585996941119"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 group"
        aria-label="Contato via WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
      </a>

      {/* Botão Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-gradient-to-r from-[#0d0519] to-[#1a0b2e] hover:from-[#1a0b2e] hover:to-[#0d0519] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 border border-purple-500/30"
          aria-label="Voltar ao topo"
        >
          <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5" />
        </button>
      )}

      <footer 
        ref={footerRef}
        className="relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              #0a0a0f 0%, 
              #0b0b12 15%, 
              #0d0d16 25%, 
              #0f0a1a 40%, 
              #120c1e 55%, 
              #150d22 70%, 
              #170e26 85%, 
              #1a0b2e 100%
            )
          `
        }}
      >
        {/* Divisor Superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        {/* Noise texture sutil */}
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'url("/noise.png")',
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}></div>
        
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/5"></div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
        
        {/* Grid pattern muito sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.6) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              
              {/* Company Info & Logo */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={logo} alt="N2S Group" className="w-12 h-12" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                      {companyInfo.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {companyInfo.description}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCode} className="text-purple-400" />
                  Serviços
                </h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(service.href)}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {service.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faRocket} className="text-purple-400" />
                  Links Rápidos
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link.name}
                        {link.href.startsWith('http') && (
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-purple-400" />
                  Contato
                </h4>
                <ul className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <li key={index}>
                      <a
                        href={contact.href}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-3 group"
                      >
                        <FontAwesomeIcon 
                          icon={contact.icon} 
                          className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" 
                        />
                        {contact.text}
                      </a>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faShareAlt} className="text-purple-400" />
                  Redes Sociais
                </h4>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <div key={index}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-3 group"
                      >
                        <FontAwesomeIcon 
                          icon={social.icon} 
                          className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" 
                        />
                        {social.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Copyright */}
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">{companyInfo.name}</span>. 
                    Todos os direitos reservados.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Fundada em {companyInfo.founded} • {companyInfo.location}
                  </p>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center md:justify-end gap-6">
                  <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm">
                    Política de Privacidade
                  </a>
                  <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm">
                    Termos de Uso
                  </a>
                  <a href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm">
                    Cookies
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
