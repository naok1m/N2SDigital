import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
import Contact from '../../components/contact';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';

function Home() {
    const location = useLocation();

    // Função para fazer scroll para seção baseada no hash da URL
    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.replace('#', '');
            const element = document.getElementById(elementId);
            if (element) {
                // Aguarda um pouco para garantir que a página carregou
                setTimeout(() => {
                    const elementPosition = element.offsetTop;
                    const offsetPosition = elementPosition - 80; // Offset para o header fixo
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }, [location.hash]);

    return (
        <>
            <SEOHead 
                title="N2S Group - Soluções Digitais Inovadoras | Desenvolvimento Web, Apps e Marketing Digital"
                description="N2S Group cria soluções digitais personalizadas que conectam pessoas, fortalecem marcas e impulsionam o crescimento. Especialistas em desenvolvimento web, apps móveis, e-commerces e marketing digital em Fortaleza, CE."
                keywords="desenvolvimento web, aplicativos móveis, e-commerce, marketing digital, landing pages, sites corporativos, cardápios digitais, Fortaleza, Ceará, Brasil, tecnologia, inovação"
                url="https://n2sgroup.com.br"
            />
            <Header/>
            <Hero/>
            <Services/>
            <AboutSection/>
            <Contact/>
            <Footer/>
        </>
    )
}

export default Home;