import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faDatabase, 
  faCog, 
  faShareAlt, 
  faLock, 
  faUserCheck, 
  faCookieBite, 
  faClock, 
  faEdit, 
  faEnvelope, 
  faPhone,
  faUser,
  faBuilding,
  faGlobe,
  faEye,
  faTrash,
  faDownload,
  faInfoCircle,
  faGavel,
  faFileContract
} from '@fortawesome/free-solid-svg-icons';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead 
        title="Política de Privacidade - N2S Group | Proteção de Dados"
        description="Conheça nossa política de privacidade e como protegemos seus dados pessoais. Transparência e segurança são nossos compromissos com você."
        keywords="política de privacidade, proteção de dados, LGPD, privacidade digital, segurança de dados, N2S Group"
        url="https://n2sgroup.com.br/privacy"
      />
      
      <Header />
      
       <main className="pt-20 min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a0b2e]">
         {/* Hero Section */}
         <section className="relative py-20 px-6 overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Política de Privacidade
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Transparência e proteção dos seus dados pessoais são fundamentais para nós. 
              Conheça como coletamos, utilizamos e protegemos suas informações.
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
              
              {/* 1. Introdução */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">1</span>
                  <FontAwesomeIcon icon={faShieldAlt} className="text-purple-400" />
                  Introdução
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  A N2S Group ("nós", "nossa" ou "empresa") está comprometida com a proteção da privacidade 
                  e dos dados pessoais de nossos usuários. Esta Política de Privacidade descreve como 
                  coletamos, utilizamos, armazenamos e protegemos suas informações pessoais.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.
                </p>
              </div>

              {/* 2. Informações que Coletamos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">2</span>
                  <FontAwesomeIcon icon={faDatabase} className="text-purple-400" />
                  Informações que Coletamos
                </h2>
                
                <h3 className="text-lg font-semibold text-white mb-3">
                  2.1 Informações Fornecidas por Você
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    Nome completo e dados de contato (e-mail, telefone)
                  </li>
                  <li>
                    Informações da empresa (nome, CNPJ, endereço)
                  </li>
                  <li>
                    Mensagens e comunicações
                  </li>
                  <li>
                    Preferências de serviços
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-3">
                  2.2 Informações Coletadas Automaticamente
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                  <li>
                    Endereço IP e informações do navegador
                  </li>
                  <li>
                    Dados de uso do site (páginas visitadas, tempo de permanência)
                  </li>
                  <li>
                    Cookies e tecnologias similares
                  </li>
                  <li>
                    Informações do dispositivo
                  </li>
                </ul>
              </div>

              {/* 3. Como Utilizamos suas Informações */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">3</span>
                  <FontAwesomeIcon icon={faCog} className="text-purple-400" />
                  Como Utilizamos suas Informações
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Utilizamos suas informações pessoais para:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    Fornecer e melhorar nossos serviços
                  </li>
                  <li>
                    Comunicar-nos com você sobre projetos e propostas
                  </li>
                  <li>
                    Enviar informações relevantes sobre nossos serviços
                  </li>
                  <li>
                    Analisar o uso do site para melhorar a experiência
                  </li>
                  <li>
                    Cumprir obrigações legais e regulamentares
                  </li>
                  <li>
                    Proteger nossos direitos e prevenir fraudes
                  </li>
                </ul>
              </div>

              {/* 4. Compartilhamento de Informações */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">4</span>
                  <FontAwesomeIcon icon={faShareAlt} className="text-purple-400" />
                  Compartilhamento de Informações
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                  exceto nas seguintes situações:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Com seu consentimento explícito</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Com prestadores de serviços que nos auxiliam (sob contratos de confidencialidade)</li>
                  <li>Em caso de fusão, aquisição ou reestruturação da empresa</li>
                </ul>
              </div>

              {/* 5. Segurança dos Dados */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">5</span>
                  <FontAwesomeIcon icon={faLock} className="text-purple-400" />
                  Segurança dos Dados
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger suas 
                  informações contra acesso não autorizado, alteração, divulgação ou destruição:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Criptografia de dados sensíveis</li>
                  <li>Acesso restrito baseado em necessidade</li>
                  <li>Monitoramento regular de segurança</li>
                  <li>Backup seguro e recuperação de dados</li>
                  <li>Treinamento da equipe em proteção de dados</li>
                </ul>
              </div>

              {/* 6. Seus Direitos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">6</span>
                  <FontAwesomeIcon icon={faUserCheck} className="text-purple-400" />
                  Seus Direitos (LGPD)
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Conforme a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                  <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li><strong>Anonimização ou eliminação:</strong> Solicitar a exclusão de seus dados</li>
                  <li><strong>Portabilidade:</strong> Transferir seus dados para outro fornecedor</li>
                  <li><strong>Eliminação:</strong> Excluir dados tratados com seu consentimento</li>
                  <li><strong>Informações:</strong> Obter informações sobre compartilhamento de dados</li>
                </ul>
              </div>

              {/* 7. Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">7</span>
                  <FontAwesomeIcon icon={faCookieBite} className="text-purple-400" />
                  Cookies e Tecnologias Similares
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento do site</li>
                  <li><strong>Cookies de análise:</strong> Para entender como você usa nosso site</li>
                  <li><strong>Cookies de preferências:</strong> Para lembrar suas configurações</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Você pode gerenciar ou desabilitar cookies através das configurações do seu navegador.
                </p>
              </div>

              {/* 8. Retenção de Dados */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">8</span>
                  <FontAwesomeIcon icon={faClock} className="text-purple-400" />
                  Retenção de Dados
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                  os propósitos descritos nesta política, a menos que um período de retenção mais 
                  longo seja exigido ou permitido por lei. Dados de clientes ativos são mantidos 
                  durante o relacionamento comercial e por até 5 anos após o término, conforme 
                  obrigações legais.
                </p>
              </div>

              {/* 9. Alterações na Política */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">9</span>
                  <FontAwesomeIcon icon={faEdit} className="text-purple-400" />
                  Alterações nesta Política
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                  sobre mudanças significativas através do nosso site ou por e-mail. Recomendamos 
                  que revise esta política regularmente para se manter informado sobre como 
                  protegemos suas informações.
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
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento 
                  de seus dados pessoais, entre em contato conosco:
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
                          href="tel:+5585996941119" 
                          className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
                        >
                          +55 (85) 9 9694-1119
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
                  Ela se aplica a todos os usuários de nossos serviços.
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
