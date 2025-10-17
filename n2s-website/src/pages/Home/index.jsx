import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
import Contact from '../../components/contact';
import SEOHead from '../../components/SEOHead';

function Home() {
    return (
        <>
            <SEOHead 
                title="N2S Digital - Soluções Digitais Inovadoras | Desenvolvimento Web, Apps e Marketing Digital"
                description="N2S Digital cria soluções digitais personalizadas que conectam pessoas, fortalecem marcas e impulsionam o crescimento. Especialistas em desenvolvimento web, apps móveis, e-commerces e marketing digital em Fortaleza, CE."
                keywords="desenvolvimento web, aplicativos móveis, e-commerce, marketing digital, landing pages, sites corporativos, cardápios digitais, Fortaleza, Ceará, Brasil, tecnologia, inovação"
                url="https://n2sgroup.com.br"
            />
            <Header/>
            <Hero/>
            <Services/>
            <AboutSection/>
            <Contact/>
        </>
    )
}

export default Home;