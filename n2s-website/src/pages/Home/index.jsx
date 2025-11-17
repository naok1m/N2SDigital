import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
import Contact from '../../components/contact';
import Footer from '../../components/Footer';

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