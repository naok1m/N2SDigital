import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import GlassButton from './glassButton';
import CustomCursor from './CustomCursor';
import Footer from './footer';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  // Refs para animações
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const backgroundRef = useRef(null);

  // Animações de entrada
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 0.8, duration: 1, ease: "power3.out" }, "-=0.8"
    )
    .fromTo(formRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.6"
    )
    .fromTo(infoRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=1.2"
    );

    // Animação do background
    gsap.fromTo(backgroundRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power2.out", delay: 0.5 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const generateProjectSummary = () => {
    const summary = `
*OLA! QUERO INICIAR UM NOVO PROJETO*

*SERVICOS QUE PRECISO:*
${selectedServices.map(service => `- ${service}`).join('\n')}

*TOTAL:* ${selectedServices.length} servico(s)

*MEUS DADOS:*
- Nome: ${formData.name || '[Nao informado]'}
- Email: ${formData.email || '[Nao informado]'}
- Telefone: ${formData.phone || '[Nao informado]'}

*AGUARDO SEU RETORNO PARA CONVERSARMOS SOBRE O PROJETO!*
    `.trim();

    return summary;
  };

  const handleProjectSubmission = () => {
    const summary = generateProjectSummary();
    const whatsappMessage = encodeURIComponent(summary);
    const whatsappUrl = `https://wa.me/5585996941119?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setShowProjectModal(false);
    setSelectedServices([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Preparar mensagem para WhatsApp
      const whatsappMessage = `
*NOVO CONTATO - FORMULARIO DO SITE*

*DADOS DO CLIENTE:*
- Nome: ${formData.name}
- Email: ${formData.email}
- Empresa: ${formData.company || 'Nao informado'}
- Telefone: ${formData.phone || 'Nao informado'}
- Servico de interesse: ${formData.service || 'Nao especificado'}

*MENSAGEM:*
${formData.message}

*Data:* ${new Date().toLocaleString('pt-BR')}

---
Enviado através do formulario de contato do site N2S Digital
      `.trim();

      // Codificar mensagem para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Número do WhatsApp da N2S Digital
      const whatsappNumber = '5585996941119';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Mostrar sucesso
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        service: ''
      });

    } catch (error) {
      console.error('Erro ao enviar para WhatsApp:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'contato@n2sdigital.com',
      link: 'mailto:contato@n2sdigital.com'
    },
    {
      icon: faPaperPlane,
      title: 'WhatsApp',
      value: '+55 (85) 9 9694-1119',
      link: 'https://wa.me/5585996941119'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Localização',
      value: 'Fortaleza, CE - Brasil',
      link: '#'
    },
    {
      icon: faClock,
      title: 'Horário',
      value: 'Seg - Sex: 9h às 18h',
      link: '#'
    }
  ];

  const services = [
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Design UI/UX',
    'Marketing Digital',
    'Consultoria',
    'Outro'
  ];

  const projectServices = [
    { id: 'website', name: 'Website Institucional', description: 'Site profissional para sua empresa' },
    { id: 'ecommerce', name: 'E-commerce/Loja Virtual', description: 'Loja online para vender produtos' },
    { id: 'app', name: 'Aplicativo Mobile', description: 'App para iOS e Android' },
    { id: 'sistema', name: 'Sistema Web', description: 'Sistema personalizado para gestão' },
    { id: 'design', name: 'Design & Branding', description: 'Identidade visual e materiais' },
    { id: 'marketing', name: 'Marketing Digital', description: 'Estratégias de crescimento online' },
    { id: 'seo', name: 'SEO & Otimização', description: 'Aparecer no Google' },
    { id: 'consultoria', name: 'Consultoria Digital', description: 'Análise e estratégias' },
    { id: 'redes', name: 'Redes Sociais', description: 'Gestão e conteúdo' },
    { id: 'automatizacao', name: 'Automação', description: 'Automatizar processos' }
  ];

  return (
    <>
      <CustomCursor />
      
      <section 
        ref={sectionRef}
        className="relative min-h-screen py-20 overflow-hidden"
      >
        {/* Background com efeitos visuais */}
        <div className="absolute inset-0">
          {/* Gradiente de fundo */}
          <div 
            className="absolute inset-0"
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
          />
          
          {/* Efeito de blur sutil */}
          <div className="absolute inset-0 backdrop-blur-[0.5px]" />
          
          {/* Noise texture */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("/noise.png")',
              backgroundSize: '256px 256px',
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
          
          {/* Grid pattern sutil */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0)`,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Elementos decorativos animados */}
          <div 
            ref={backgroundRef}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Círculos flutuantes */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-5xl md:text-7xl font-black leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
                Entre em contato
              </span>
            </h2>
            
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Pronto para transformar sua ideia em realidade? Vamos conversar sobre seu projeto e descobrir como podemos ajudar seu negócio a crescer no mundo digital.
            </p>
          </div>

          {/* Grid principal */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            
            {/* Formulário de contato */}
            <div ref={formRef} className="space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Envie sua mensagem</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome e Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  {/* Empresa e Telefone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Nome da empresa"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        placeholder="(85) 9 9694-1119"
                      />
                    </div>
                  </div>

                  {/* Serviço */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Serviço de interesse
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-gray-800 text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm resize-none"
                      placeholder="Conte-nos sobre seu projeto, objetivos e como podemos ajudar..."
                    />
                  </div>

                  {/* Status do envio */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center">
                      ✅ WhatsApp aberto! Envie sua mensagem para finalizar o contato.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
                      ❌ Erro ao enviar mensagem. Tente novamente.
                    </div>
                  )}

                  {/* Botão de envio */}
                  <div className="pt-4 flex justify-center">
                    <GlassButton
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="py-4 px-8 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Preparando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
                          Enviar via WhatsApp
                        </span>
                      )}
                    </GlassButton>
                  </div>
                </form>
              </div>
            </div>

            {/* Informações de contato */}
            <div ref={infoRef} className="space-y-8">
              {/* Cards de informação */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon 
                          icon={info.icon} 
                          className="text-xl text-purple-400" 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {info.title}
                        </h4>
                        <a
                          href={info.link}
                          className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white/10 shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon icon={faRocket} className="text-2xl text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pronto para começar?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Inicie seu projeto conosco e vamos transformar sua ideia em realidade.
                  </p>
                  <div className="flex justify-center">
                    <GlassButton 
                      onClick={() => setShowProjectModal(true)}
                    >
                      Iniciar meu projeto
                    </GlassButton>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Footer/>
        </div>
     
      </section>

      {/* Modal do Checklist de Projeto */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header do Modal */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Iniciar Meu Projeto
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Selecione os serviços que você precisa para seu projeto
                  </p>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
                
              </div>

              {/* Checklist de Serviços */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {projectServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      selectedServices.includes(service.name)
                        ? 'bg-purple-500/20 border-purple-500/50 scale-105'
                        : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                        selectedServices.includes(service.name)
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-white/40'
                      }`}>
                        {selectedServices.includes(service.name) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {service.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo */}
              {selectedServices.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                  <h3 className="text-white font-semibold mb-3">
                    Serviços Selecionados ({selectedServices.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((service) => (
                      <span
                        key={service}
                        className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <GlassButton
                  onClick={handleProjectSubmission}
                  disabled={selectedServices.length === 0}
                  className="flex-1 py-3 px-6 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                >
                  Enviar Briefing
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
}
