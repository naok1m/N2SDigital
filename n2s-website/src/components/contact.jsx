import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPaperPlane, 
  faMapMarkerAlt, 
  faClock, 
  faRocket,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from './Analytics';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const formRef = useRef(null);
    const contactCardsRef = useRef(null);
    const ctaRef = useRef(null);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        empresa: '',
        telefone: '',
        servico: '',
        mensagem: ''
    });

    // Estados para o modal de projeto
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    // Dados dos serviços para o modal
    const projectServices = [
        {
            id: 1,
            name: "Website Institucional",
            description: "Site profissional para sua empresa"
        },
        {
            id: 2,
            name: "Landing Page",
            description: "Página de alta conversão para capturar leads"
        },
        {
            id: 3,
            name: "Sistema Web",
            description: "Sistema personalizado para gestão"
        },
        {
            id: 4,
            name: "SEO & Otimização",
            description: "Aparecer no Google"
        },
        {
            id: 5,
            name: "Outros",
            description: "Solução personalizada para sua necessidade"
        },
        {
            id: 6,
            name: "E-commerce/Loja Virtual",
            description: "Loja online para vender produtos"
        },
        {
            id: 7,
            name: "Aplicativo Mobile",
            description: "App para iOS e Android"
        },
        {
            id: 8,
            name: "Linktree",
            description: "Página de links para redes sociais"
        },
        {
            id: 9,
            name: "Automação",
            description: "Automatizar processos"
        }
    ];

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        // Track form submission
        trackEvent('form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form',
            service_interest: formData.servico,
            has_company: !!formData.empresa,
            has_phone: !!formData.telefone
        });
        
        const message = `Olá! Gostaria de mais informações sobre os serviços da N2S Digital.

Nome: ${formData.nome}
Email: ${formData.email}
Empresa: ${formData.empresa}
Telefone: ${formData.telefone}
Serviço de interesse: ${formData.servico}

Mensagem: ${formData.mensagem}`;
        
        const whatsappUrl = `https://wa.me/5585996941119?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Track WhatsApp click
        trackEvent('whatsapp_click', {
            event_category: 'engagement',
            event_label: 'contact_form_whatsapp',
            service_interest: formData.servico
        });
    }, [formData]);

    // Funções para o modal de projeto
    const handleServiceToggle = useCallback((serviceName) => {
        setSelectedServices(prev => {
            if (prev.includes(serviceName)) {
                return prev.filter(name => name !== serviceName);
            } else {
                return [...prev, serviceName];
            }
        });
    }, []);

    const handleProjectSubmission = useCallback(() => {
        if (selectedServices.length === 0) return;

        // Track project submission
        trackEvent('project_modal_submit', {
            event_category: 'engagement',
            event_label: 'project_briefing',
            selected_services: selectedServices,
            services_count: selectedServices.length
        });

        const message = `Olá! Gostaria de iniciar um projeto com a N2S Digital.

Serviços de interesse:
${selectedServices.map(service => `• ${service}`).join('\n')}

Por favor, entre em contato para discutirmos os detalhes do projeto.`;

        const whatsappUrl = `https://wa.me/5585996941119?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Close modal after submission
        setShowProjectModal(false);
        setSelectedServices([]);
        
        // Track WhatsApp click from modal
        trackEvent('whatsapp_click', {
            event_category: 'engagement',
            event_label: 'project_modal_whatsapp',
            source: 'project_modal',
            services: selectedServices.join(', ')
        });
    }, [selectedServices]);

    useEffect(() => {
        // Animação de entrada da seção
        const contactTl = gsap.timeline();
        
        contactTl
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

        // Animações para cards de contato
        gsap.utils.toArray(".contact-card").forEach((card, index) => {
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

        // Animações para formulário e CTA
        gsap.utils.toArray(".contact-form, .contact-cta").forEach((element, index) => {
            gsap.fromTo(element, 
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
        <section 
            ref={sectionRef}
            className="relative min-h-screen py-20 overflow-hidden section-noise-blur bg-gradient-to-b from-[#000002] to-[#190B2E]"
        >
            {/* Background com arco.png e efeitos */}
                   <div 
                       className="absolute inset-0"
                       style={{
                           background: `
                               linear-gradient(rgba(10, 10, 15, 0.8), rgba(10, 10, 15, 0.8)),
                               url('/arco2.png')
                           `,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           backgroundRepeat: 'no-repeat',
                           filter: 'blur(1px) brightness(0.7) contrast(1.1)',
                           transform: 'scaleY(-1)'
                       }}
                       aria-hidden="true"
                   />
            
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 px-4"
                    >
                        <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            Entre em contato
                        </span>
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4"
                    >
                        Pronto para transformar sua ideia em realidade? Vamos conversar sobre seu projeto e descobrir como podemos ajudar seu negócio a crescer no mundo digital.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
                    {/* Formulário de Contato */}
                    <div ref={formRef} className="contact-form bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
                        <h3 className="text-2xl font-bold text-white mb-6">Envie sua mensagem</h3>
                    
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Nome completo *</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    placeholder="Seu nome completo"
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gradient-to-br focus:from-[rgba(255,255,255,0.12)] focus:to-[rgba(255,255,255,0.05)] transition-all duration-300 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="seu@email.com"
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gradient-to-br focus:from-[rgba(255,255,255,0.12)] focus:to-[rgba(255,255,255,0.05)] transition-all duration-300 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Empresa</label>
                                <input
                                    type="text"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleInputChange}
                                    placeholder="Nome da empresa"
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gradient-to-br focus:from-[rgba(255,255,255,0.12)] focus:to-[rgba(255,255,255,0.05)] transition-all duration-300 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Telefone</label>
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    placeholder="(85) 9 9694-1119"
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gradient-to-br focus:from-[rgba(255,255,255,0.12)] focus:to-[rgba(255,255,255,0.05)] transition-all duration-300 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Serviço de interesse</label>
                                <select
                                    name="servico"
                                    value={formData.servico}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.06)] backdrop-blur-sm border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500/60 focus:bg-gradient-to-br focus:from-[rgba(255,255,255,0.15)] focus:to-[rgba(255,255,255,0.08)] transition-all duration-300 text-sm"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                    }}
                                >
                                    <option value="" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Selecione um serviço</option>
                                    <option value="Landing Pages" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Landing Pages</option>
                                    <option value="Websites Corporativos" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Websites Corporativos</option>
                                    <option value="E-commerces" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>E-commerces</option>
                                    <option value="Cardápios Digitais" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Cardápios Digitais</option>
                                    <option value="Consultoria" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Consultoria</option>
                                    <option value="Outro" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Outro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm font-medium">Mensagem *</label>
                                <textarea
                                    name="mensagem"
                                    value={formData.mensagem}
                                    onChange={handleInputChange}
                                    placeholder="Conte-nos sobre seu projeto, objetivos e como podemos ajudar..."
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.03)] backdrop-blur-sm border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gradient-to-br focus:from-[rgba(255,255,255,0.12)] focus:to-[rgba(255,255,255,0.05)] transition-all duration-300 resize-none text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-3
                                           bg-gradient-to-r from-[rgba(196,181,253,0.4)] via-[rgba(196,181,253,0.25)] to-[rgba(196,181,253,0.4)]
                                           border border-[rgba(196,181,253,0.6)]
                                           backdrop-blur-[20px]
                                           shadow-[0_8px_32px_rgba(196,181,253,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                                           rounded-full px-6 py-3
                                           relative overflow-hidden
                                           text-white font-semibold text-sm
                                           cursor-pointer
                                           hover:shadow-[0_12px_40px_rgba(196,181,253,0.25),inset_0_1px_0_rgba(255,255,255,0.3)]
                                           transition-all duration-300
                                           hover:scale-105 hover:rotate-y-1"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 relative z-10" />
                                <span className="relative z-10">Enviar via WhatsApp</span>
                            </button>
                        </form>
                </div>

                    {/* Cards de Informações e CTA */}
                    <div ref={contactCardsRef} className="space-y-6">
                        {/* Cards de Informações de Contato */}
                        <div className="space-y-4">
                            {/* Email */}
                            <div className="contact-card bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 flex items-center gap-4 transition-all duration-300 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-[rgba(255,255,255,0.07)] hover:to-[rgba(255,255,255,0.04)]">
                                <div className="contact-icon-container w-12 h-12 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-lg text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Email</h4>
                                    <p className="text-gray-400">contato@n2sgroup.com.br</p>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="contact-card bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 flex items-center gap-4 transition-all duration-300 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-[rgba(255,255,255,0.07)] hover:to-[rgba(255,255,255,0.04)]">
                                <div className="contact-icon-container w-12 h-12 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-lg text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">WhatsApp</h4>
                                    <p className="text-gray-400">+55 (85) 9 9694-1119</p>
                                </div>
                            </div>

                            {/* Localização */}
                            <div className="contact-card bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 flex items-center gap-4 transition-all duration-300 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-[rgba(255,255,255,0.07)] hover:to-[rgba(255,255,255,0.04)]">
                                <div className="contact-icon-container w-12 h-12 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Localização</h4>
                                    <p className="text-gray-400">Fortaleza, CE - Brasil</p>
                                </div>
                            </div>

                            {/* Horário */}
                            <div className="contact-card bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 flex items-center gap-4 transition-all duration-300 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-[rgba(255,255,255,0.07)] hover:to-[rgba(255,255,255,0.04)]">
                                <div className="contact-icon-container w-12 h-12 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={faClock} className="text-lg text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Horário</h4>
                                    <p className="text-gray-400">Seg - Sex: 9h às 18h</p>
                                </div>
                            </div>
                        </div>

                        {/* Card de Call to Action */}
                        <div ref={ctaRef} className="contact-cta bg-gradient-to-r from-[rgba(156,83,227,0.1)] to-[rgba(168,85,247,0.1)] backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 text-center">
                            <div className="contact-icon-container w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <FontAwesomeIcon icon={faRocket} className="text-2xl text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Inicie seu projeto conosco e vamos transformar sua ideia em realidade.
                            </p>
                                   <button 
                                       onClick={useCallback(() => {
                                           // Track CTA button click
                                           trackEvent('cta_click', {
                                               event_category: 'engagement',
                                               event_label: 'start_project_cta',
                                               button_location: 'contact_section'
                                           });
                                           
                                           // Open project modal
                                           setShowProjectModal(true);
                                       }, [])}
                                       className="flex items-center justify-center gap-3 mx-auto
                                                  bg-gradient-to-r from-[rgba(196,181,253,0.4)] via-[rgba(196,181,253,0.25)] to-[rgba(196,181,253,0.4)]
                                                  border border-[rgba(196,181,253,0.6)]
                                                  backdrop-blur-[20px]
                                                  shadow-[0_8px_32px_rgba(196,181,253,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                                                  rounded-full px-8 py-4
                                                  relative overflow-hidden
                                                  text-white font-semibold
                                                  cursor-pointer
                                                  hover:shadow-[0_12px_40px_rgba(196,181,253,0.25),inset_0_1px_0_rgba(255,255,255,0.3)]
                                                  transition-all duration-300
                                                  hover:scale-105 hover:rotate-y-1"
                                   >
                                       <span className="relative z-10">Iniciar meu projeto</span>
                                   </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Modal do Checklist de Projeto */}
        {showProjectModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
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
                                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform ${
                                        selectedServices.includes(service.name)
                                            ? 'bg-purple-500/20 border-purple-500/50 scale-[1.02] shadow-lg shadow-purple-500/20'
                                            : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10 hover:scale-[1.01]'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-200 ${
                                            selectedServices.includes(service.name)
                                                ? 'bg-purple-500 border-purple-500 scale-110'
                                                : 'border-white/40 hover:border-white/60'
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
                                <h3 className="text-white font-semibold mb-4">
                                    Serviços Selecionados ({selectedServices.length})
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {selectedServices.map((service, index) => (
                                        <span
                                            key={service}
                                            className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm border border-purple-500/30 
                                                       flex items-center justify-center text-center
                                                       transition-all duration-300 hover:bg-purple-500/30 hover:scale-105
                                                       animate-fade-in"
                                            style={{
                                                animationDelay: `${index * 100}ms`
                                            }}
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
                            <button
                                onClick={handleProjectSubmission}
                                disabled={selectedServices.length === 0}
                                className={`flex-1 py-3 px-6 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed ${
                                    selectedServices.length > 0
                                        ? 'bg-gradient-to-r from-[rgba(196,181,253,0.4)] via-[rgba(196,181,253,0.25)] to-[rgba(196,181,253,0.4)] border border-[rgba(196,181,253,0.6)] backdrop-blur-[20px] shadow-[0_8px_32px_rgba(196,181,253,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(196,181,253,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-105'
                                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Enviar Briefing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Contact;
