import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
import Footer from '../../components/footer';
import Contact from '../../components/contact';
import SEO from '../../components/SEO';
import { organizationSchema, localBusinessSchema, websiteSchema } from '../../utils/schema';

function Home() {
    return (
        <>
            <SEO 
                title="N2S Digital - Desenvolvimento Web e Marketing Digital em Fortaleza"
                description="Agência digital especializada em desenvolvimento web, aplicativos mobile, design UI/UX e marketing digital. Transformamos ideias em realidade digital em Fortaleza, CE."
                keywords="desenvolvimento web, aplicativo mobile, design UI/UX, marketing digital, Fortaleza, agência digital, website, e-commerce, landing page, sistema web"
                url="https://n2sdigital.com"
                structuredData={[organizationSchema, localBusinessSchema, websiteSchema]}
            />
            <Header/>
            <Hero/>
            <Services/>
            <AboutSection/>
            <Contact>
            </Contact>
            
        </>
    )
}

export default Home;