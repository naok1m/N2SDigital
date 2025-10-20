import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileContract, 
  faGavel, 
  faUser, 
  faShieldAlt, 
  faHandshake, 
  faExclamationTriangle, 
  faCheckCircle, 
  faTimesCircle, 
  faInfoCircle, 
  faEdit, 
  faEnvelope, 
  faPhone,
  faBuilding,
  faGlobe,
  faLock,
  faCog,
  faClock,
  faBan,
  faBalanceScale,
  faFileAlt,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';

export default function TermsPage() {
  const [show, setShow] = useState(false);
  
  // Refs para animações
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const updateRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!show) return;

    // Configurar elementos iniciais
    gsap.set([titleRef.current, subtitleRef.current, updateRef.current, contentRef.current], {
      opacity: 0,
      y: 50
    });

    // Timeline principal com animações escalonadas
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(updateRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [show]);

  return (
    <>
      <SEOHead 
        title="Termos de Uso - N2S Group | Condições de Serviço"
        description="Conheça nossos termos de uso e condições de serviço. Entenda seus direitos e obrigações ao utilizar nossos serviços digitais."
        keywords="termos de uso, condições de serviço, contratos digitais, direitos e obrigações, N2S Group"
        url="https://n2sgroup.com.br/terms"
      />
      
      <Header />
      
       <main className="pt-20 min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a0b2e]">
         {/* Hero Section */}
         <section className="relative py-20 px-6 overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Termos de Uso
              </span>
            </h1>
            <p ref={subtitleRef} className="text-lg text-gray-400 mb-8 leading-relaxed">
              Estes termos estabelecem as condições para utilização de nossos serviços digitais. 
              Leia atentamente antes de contratar nossos serviços.
            </p>
            <div ref={updateRef} className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div ref={contentRef} className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10">
              
              {/* 1. Aceitação dos Termos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">1</span>
                  <FontAwesomeIcon icon={faFileContract} className="text-purple-400" />
                  Aceitação dos Termos
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ao contratar os serviços da N2S Group ("nós", "nossa" ou "empresa"), você concorda 
                  em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer 
                  parte destes termos, não deve utilizar nossos serviços.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Estes termos constituem um acordo legal entre você e a N2S Group e regem o uso de 
                  todos os nossos serviços digitais.
                </p>
              </div>

              {/* 2. Descrição dos Serviços */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">2</span>
                  <FontAwesomeIcon icon={faCog} className="text-purple-400" />
                  Descrição dos Serviços
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  A N2S Group oferece os seguintes serviços digitais:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    <strong>Desenvolvimento de Websites:</strong> Sites corporativos, institucionais e landing pages
                  </li>
                  <li>
                    <strong>E-commerce:</strong> Lojas virtuais completas com sistema de pagamento
                  </li>
                  <li>
                    <strong>Aplicativos Mobile:</strong> Apps nativos para iOS e Android
                  </li>
                  <li>
                    <strong>Marketing Digital:</strong> Estratégias de marketing online e SEO
                  </li>
                  <li>
                    <strong>Consultoria Tecnológica:</strong> Assessoria em transformação digital
                  </li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer serviço 
                  a qualquer momento, com aviso prévio quando possível.
                </p>
              </div>

              {/* 3. Obrigações do Cliente */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">3</span>
                  <FontAwesomeIcon icon={faUser} className="text-purple-400" />
                  Obrigações do Cliente
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ao utilizar nossos serviços, você se compromete a:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
                  <li>Respeitar os prazos estabelecidos para fornecimento de materiais</li>
                  <li>Não utilizar nossos serviços para atividades ilegais ou prejudiciais</li>
                  <li>Respeitar os direitos de propriedade intelectual de terceiros</li>
                  <li>Manter a confidencialidade de informações sensíveis compartilhadas</li>
                  <li>Efetuar os pagamentos nos prazos acordados</li>
                  <li>Comunicar mudanças relevantes que possam afetar o projeto</li>
                </ul>
              </div>

              {/* 4. Propriedade Intelectual */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">4</span>
                  <FontAwesomeIcon icon={faShieldAlt} className="text-purple-400" />
                  Propriedade Intelectual
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Todos os direitos de propriedade intelectual relacionados aos nossos serviços 
                  pertencem à N2S Group, exceto quando especificamente acordado em contrato:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li><strong>Código-fonte:</strong> Permanece propriedade da N2S Group</li>
                  <li><strong>Designs originais:</strong> Transferidos ao cliente após pagamento integral</li>
                  <li><strong>Conteúdo fornecido pelo cliente:</strong> Permanece propriedade do cliente</li>
                  <li><strong>Bibliotecas e frameworks:</strong> Sujeitos às licenças de terceiros</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  O cliente recebe uma licença de uso não exclusiva para o projeto desenvolvido, 
                  conforme especificado no contrato de prestação de serviços.
                </p>
              </div>

              {/* 5. Pagamentos e Preços */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">5</span>
                  <FontAwesomeIcon icon={faHandshake} className="text-purple-400" />
                  Pagamentos e Preços
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Os preços dos serviços são estabelecidos conforme proposta comercial e podem variar 
                  conforme a complexidade e escopo do projeto:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Pagamentos devem ser efetuados nos prazos acordados</li>
                  <li>Atraso no pagamento pode resultar na suspensão dos serviços</li>
                  <li>Alterações no escopo podem gerar custos adicionais</li>
                  <li>Preços não incluem taxas de terceiros (domínios, hospedagem, etc.)</li>
                  <li>Reembolsos são avaliados caso a caso</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Reservamo-nos o direito de ajustar preços com aviso prévio de 30 dias.
                </p>
              </div>

              {/* 6. Limitação de Responsabilidade */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">6</span>
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-purple-400" />
                  Limitação de Responsabilidade
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nossa responsabilidade é limitada conforme estabelecido abaixo:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>Não nos responsabilizamos por perdas indiretas ou consequenciais</li>
                  <li>Nossa responsabilidade máxima é limitada ao valor pago pelos serviços</li>
                  <li>Não garantimos resultados específicos de marketing ou vendas</li>
                  <li>Cliente é responsável por backup de dados importantes</li>
                  <li>Não nos responsabilizamos por ações de terceiros</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Esta limitação não se aplica a danos causados por negligência grosseira ou dolo.
                </p>
              </div>

              {/* 7. Suspensão e Cancelamento */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">7</span>
                  <FontAwesomeIcon icon={faBan} className="text-purple-400" />
                  Suspensão e Cancelamento
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Podemos suspender ou cancelar os serviços nas seguintes situações:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li><strong>Por parte do cliente:</strong> Atraso no pagamento superior a 15 dias</li>
                  <li><strong>Por parte do cliente:</strong> Violação destes termos de uso</li>
                  <li><strong>Por parte da N2S:</strong> Impossibilidade técnica de continuidade</li>
                  <li><strong>Por parte da N2S:</strong> Mudanças regulamentares que impeçam o serviço</li>
                  <li><strong>Por acordo mútuo:</strong> Cancelamento consensual</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Em caso de cancelamento, o cliente terá 30 dias para migrar seus dados.
                </p>
              </div>

              {/* 8. Confidencialidade */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">8</span>
                  <FontAwesomeIcon icon={faLock} className="text-purple-400" />
                  Confidencialidade
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ambas as partes se comprometem a manter a confidencialidade das informações:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Informações comerciais e estratégicas do cliente</li>
                  <li>Dados técnicos e processos internos</li>
                  <li>Informações financeiras e contratuais</li>
                  <li>Dados pessoais conforme LGPD</li>
                  <li>Qualquer informação marcada como confidencial</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Esta obrigação permanece válida mesmo após o término do contrato.
                </p>
              </div>

              {/* 9. Alterações nos Termos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">9</span>
                  <FontAwesomeIcon icon={faEdit} className="text-purple-400" />
                  Alterações nos Termos
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                  Alterações significativas serão comunicadas com antecedência mínima de 30 dias. 
                  O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.
                </p>
              </div>

              {/* 10. Lei Aplicável */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">10</span>
                  <FontAwesomeIcon icon={faBalanceScale} className="text-purple-400" />
                  Lei Aplicável e Foro
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Estes Termos de Uso são regidos pelas leis brasileiras. Para resolução de 
                  controvérsias, as partes elegem o foro da comarca de Fortaleza/CE.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Em caso de conflito, tentaremos resolver amigavelmente antes de recorrer 
                  ao judiciário.
                </p>
              </div>

              {/* 11. Contato */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">11</span>
                  <FontAwesomeIcon icon={faEnvelope} className="text-purple-400" />
                  Contato
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Para dúvidas sobre estes Termos de Uso ou nossos serviços, entre em contato conosco:
                </p>
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* E-mail */}
                    <div className="flex items-start gap-4 p-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-purple-400 text-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-2 text-lg">E-mail</h4>
                        <p className="text-gray-300 mb-2">Entre em contato por e-mail</p>
                        <a 
                          href="mailto:contato@n2sgroup.com.br" 
                          className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
                        >
                          contato@n2sgroup.com.br
                        </a>
                      </div>
                    </div>

                    {/* Telefone */}
                    <div className="flex items-start gap-4 p-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faPhone} className="text-purple-400 text-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-2 text-lg">Telefone</h4>
                        <p className="text-gray-300 mb-2">Ligue para nós diretamente</p>
                        <a 
                          href="tel:+5585991120816" 
                          className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
                        >
                          +55 (85) 9 9112-0816
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer da página */}
              <div className="border-t border-white/10 pt-8 mt-8 text-center">
                <p className="text-gray-400 text-sm">
                  Estes termos são efetivos a partir de {new Date().toLocaleDateString('pt-BR')}. 
                  Eles se aplicam a todos os contratos de prestação de serviços.
                </p>
                <div className="mt-8">
                  <p className="text-gray-500 text-xs">
                    Última atualização: 18/10/2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
