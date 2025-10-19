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
    { name: "WhatsApp", icon: faWhatsapp, href: "https://wa.me/5585991120816", color: "#25D366" },
    { name: "Instagram", icon: faInstagram, href: "https://instagram.com/n2sgroup", color: "#E4405F" },
    { name: "Facebook", icon: faFacebook, href: "https://facebook.com/n2sgroup", color: "#1877F2" },
    { name: "Twitter", icon: faTwitter, href: "https://twitter.com/n2sgroup", color: "#1DA1F2" }
  ];

  const contactInfo = [
    { icon: faEnvelope, text: "contato@n2sgroup.com.br", href: "mailto:contato@n2sgroup.com.br" },
    { icon: faPhone, text: "+55 (85) 9 9112-0816", href: "tel:+5585991120816" },
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
        href="https://wa.me/5585991120816"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 group"
        aria-label="Contato via WhatsApp"
      >
        <svg 
          className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
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
          backgroundImage: 'url("/noise.webp")',
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
                  <div className="flex items-center gap-3 mb-6">
                    <img src={logo} alt="N2S Group" className="w-12 h-12" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
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
                <div className="flex flex-wrap justify-center md:justify-end gap-6 items-center">
                  <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm">
                    Política de Privacidade
                  </a>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm">
                    Termos de Uso
                  </a>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
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
