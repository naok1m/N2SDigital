import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCookieBite, 
  faCog, 
  faShieldAlt, 
  faEye, 
  faTrash, 
  faDownload, 
  faInfoCircle, 
  faEdit, 
  faEnvelope, 
  faPhone,
  faBuilding,
  faGlobe,
  faLock,
  faClock,
  faBan,
  faBalanceScale,
  faFileAlt,
  faClipboardCheck,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faGavel,
  faFileContract,
  faDatabase,
  faUserCheck,
  faShareAlt,
  faHandshake
} from '@fortawesome/free-solid-svg-icons';

export default function CookiesPage() {
  return (
    <>
      <SEOHead 
        title="Política de Cookies - N2S Group | Uso de Cookies e Tecnologias"
        description="Conheça nossa política de cookies e como utilizamos tecnologias para melhorar sua experiência. Transparência sobre o uso de cookies em nosso site."
        keywords="política de cookies, cookies, tecnologias de rastreamento, privacidade digital, LGPD, N2S Group"
        url="https://n2sgroup.com.br/cookies"
      />
      
      <Header />
      
       <main className="pt-20 min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a0b2e]">
         {/* Hero Section */}
         <section className="relative py-20 px-6 overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Política de Cookies
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Entenda como utilizamos cookies e tecnologias similares para melhorar sua experiência 
              em nosso site e fornecer serviços personalizados.
            </p>
            <div className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10">
              
              {/* 1. O que são Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">1</span>
                  <FontAwesomeIcon icon={faCookieBite} className="text-purple-400" />
                  O que são Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita 
                  nosso site. Eles nos ajudam a entender como você interage com nosso site e nos permitem 
                  melhorar sua experiência de navegação.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Os cookies podem ser temporários (cookies de sessão) ou permanentes (cookies persistentes), 
                  dependendo de sua duração e finalidade.
                </p>
              </div>

              {/* 2. Tipos de Cookies que Utilizamos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">2</span>
                  <FontAwesomeIcon icon={faCog} className="text-purple-400" />
                  Tipos de Cookies que Utilizamos
                </h2>
                
                <h3 className="text-lg font-semibold text-white mb-3">
                  2.1 Cookies Essenciais
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Estes cookies são necessários para o funcionamento básico do site e não podem ser desabilitados:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    <strong>Cookies de Sessão:</strong> Mantêm sua sessão ativa durante a navegação
                  </li>
                  <li>
                    <strong>Cookies de Segurança:</strong> Protegem contra ataques e fraudes
                  </li>
                  <li>
                    <strong>Cookies de Funcionalidade:</strong> Permitem recursos básicos do site
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-3">
                  2.2 Cookies de Análise
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nos ajudam a entender como você usa nosso site para melhorar a experiência:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    <strong>Google Analytics:</strong> Coleta dados sobre páginas visitadas e tempo de permanência
                  </li>
                  <li>
                    <strong>Cookies de Performance:</strong> Medem a velocidade e eficiência do site
                  </li>
                  <li>
                    <strong>Cookies de Estatísticas:</strong> Fornecem insights sobre o comportamento dos usuários
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-3">
                  2.3 Cookies de Preferências
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Lembram suas escolhas e personalizam sua experiência:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    <strong>Cookies de Idioma:</strong> Lembram seu idioma preferido
                  </li>
                  <li>
                    <strong>Cookies de Configuração:</strong> Salvam suas preferências de exibição
                  </li>
                  <li>
                    <strong>Cookies de Personalização:</strong> Adaptam o conteúdo às suas necessidades
                  </li>
                </ul>
              </div>

              {/* 3. Finalidade dos Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">3</span>
                  <FontAwesomeIcon icon={faEye} className="text-purple-400" />
                  Finalidade dos Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Utilizamos cookies para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <strong>Melhorar a Performance:</strong> Otimizar velocidade e funcionalidade do site
                  </li>
                  <li>
                    <strong>Personalizar Conteúdo:</strong> Adaptar informações às suas necessidades
                  </li>
                  <li>
                    <strong>Analisar Uso:</strong> Entender como você interage com nosso site
                  </li>
                  <li>
                    <strong>Garantir Segurança:</strong> Proteger contra atividades maliciosas
                  </li>
                  <li>
                    <strong>Facilitar Navegação:</strong> Lembrar suas preferências e configurações
                  </li>
                  <li>
                    <strong>Fornecer Suporte:</strong> Identificar e resolver problemas técnicos
                  </li>
                </ul>
              </div>

              {/* 4. Cookies de Terceiros */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">4</span>
                  <FontAwesomeIcon icon={faShareAlt} className="text-purple-400" />
                  Cookies de Terceiros
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nosso site pode conter cookies de terceiros para funcionalidades específicas:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    <strong>Google Analytics:</strong> Para análise de tráfego e comportamento
                  </li>
                  <li>
                    <strong>Redes Sociais:</strong> Para botões de compartilhamento e integração
                  </li>
                  <li>
                    <strong>Serviços de Mapas:</strong> Para localização e direções
                  </li>
                  <li>
                    <strong>Plataformas de Pagamento:</strong> Para processamento seguro de transações
                  </li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Estes cookies são controlados pelos respectivos terceiros e estão sujeitos às suas 
                  próprias políticas de privacidade.
                </p>
              </div>

              {/* 5. Gerenciamento de Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">5</span>
                  <FontAwesomeIcon icon={faCog} className="text-purple-400" />
                  Gerenciamento de Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Você tem controle sobre os cookies utilizados em nosso site:
                </p>
                
                <h3 className="text-lg font-semibold text-white mb-3">
                  5.1 Configurações do Navegador
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  A maioria dos navegadores permite que você gerencie cookies através das configurações:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li><strong>Chrome:</strong> Configurações > Privacidade e segurança > Cookies</li>
                  <li><strong>Firefox:</strong> Opções > Privacidade e Segurança > Cookies</li>
                  <li><strong>Safari:</strong> Preferências > Privacidade > Cookies</li>
                  <li><strong>Edge:</strong> Configurações > Cookies e permissões do site</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-3">
                  5.2 Ferramentas de Opt-out
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Você pode optar por não receber cookies de análise:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <strong>Google Analytics:</strong> 
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 ml-1">
                      Opt-out do Google Analytics
                    </a>
                  </li>
                  <li>
                    <strong>AdChoices:</strong> 
                    <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 ml-1">
                      Opt-out de anúncios personalizados
                    </a>
                  </li>
                </ul>
              </div>

              {/* 6. Impacto da Desabilitação */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">6</span>
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-purple-400" />
                  Impacto da Desabilitação de Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Desabilitar cookies pode afetar sua experiência em nosso site:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <strong>Funcionalidade Limitada:</strong> Algumas funcionalidades podem não funcionar corretamente
                  </li>
                  <li>
                    <strong>Experiência Personalizada:</strong> Não poderemos lembrar suas preferências
                  </li>
                  <li>
                    <strong>Análise de Performance:</strong> Não conseguiremos melhorar o site baseado no uso
                  </li>
                  <li>
                    <strong>Segurança:</strong> Algumas medidas de segurança podem ser comprometidas
                  </li>
                  <li>
                    <strong>Conteúdo Repetitivo:</strong> Você pode ver o mesmo conteúdo repetidamente
                  </li>
                </ul>
              </div>

              {/* 7. Retenção de Dados */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">7</span>
                  <FontAwesomeIcon icon={faClock} className="text-purple-400" />
                  Retenção de Dados de Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Os dados coletados através de cookies são mantidos por diferentes períodos:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <strong>Cookies de Sessão:</strong> Excluídos quando você fecha o navegador
                  </li>
                  <li>
                    <strong>Cookies Persistentes:</strong> Mantidos por até 2 anos ou conforme especificado
                  </li>
                  <li>
                    <strong>Cookies de Análise:</strong> Geralmente mantidos por 26 meses
                  </li>
                  <li>
                    <strong>Cookies de Preferências:</strong> Mantidos até serem excluídos manualmente
                  </li>
                </ul>
              </div>

              {/* 8. Conformidade Legal */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">8</span>
                  <FontAwesomeIcon icon={faGavel} className="text-purple-400" />
                  Conformidade Legal
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nossa política de cookies está em conformidade com:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    <strong>Lei Geral de Proteção de Dados (LGPD):</strong> Lei brasileira de proteção de dados
                  </li>
                  <li>
                    <strong>General Data Protection Regulation (GDPR):</strong> Regulamento europeu de proteção de dados
                  </li>
                  <li>
                    <strong>California Consumer Privacy Act (CCPA):</strong> Lei de privacidade da Califórnia
                  </li>
                  <li>
                    <strong>ePrivacy Directive:</strong> Diretiva europeia sobre privacidade eletrônica
                  </li>
                </ul>
              </div>

              {/* 9. Alterações na Política */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">9</span>
                  <FontAwesomeIcon icon={faEdit} className="text-purple-400" />
                  Alterações nesta Política
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças 
                  em nossas práticas ou por motivos legais. Notificaremos sobre mudanças significativas 
                  através do nosso site. Recomendamos que revise esta política regularmente.
                </p>
              </div>

              {/* 10. Contato */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">10</span>
                  <FontAwesomeIcon icon={faEnvelope} className="text-purple-400" />
                  Contato
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Se você tiver dúvidas sobre nossa Política de Cookies ou sobre o uso de cookies 
                  em nosso site, entre em contato conosco:
                </p>
                <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* E-mail */}
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
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
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
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
                  Esta política é efetiva a partir de {new Date().toLocaleDateString('pt-BR')}. 
                  Ela se aplica a todos os usuários de nosso site.
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
