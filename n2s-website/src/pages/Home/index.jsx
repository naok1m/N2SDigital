import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
<<<<<<< HEAD
import Footer from '../../components/footer';
import Contact from '../../components/contact';
import SEO from '../../components/SEO';
import { organizationSchema, localBusinessSchema, websiteSchema } from '../../utils/schema';
=======
import Contact from '../../components/contact';
import SEOHead from '../../components/SEOHead';
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994

function Home() {
    return (
        <>
<<<<<<< HEAD
            <SEO 
                title="N2S Digital - Desenvolvimento Web e Marketing Digital em Fortaleza"
                description="Agência digital especializada em desenvolvimento web, aplicativos mobile, design UI/UX e marketing digital. Transformamos ideias em realidade digital em Fortaleza, CE."
                keywords="desenvolvimento web, aplicativo mobile, design UI/UX, marketing digital, Fortaleza, agência digital, website, e-commerce, landing page, sistema web"
                url="https://n2sdigital.com"
                structuredData={[organizationSchema, localBusinessSchema, websiteSchema]}
=======
            <SEOHead 
                title="N2S Group - Soluções Digitais Inovadoras | Desenvolvimento Web, Apps e Marketing Digital"
                description="N2S Group cria soluções digitais personalizadas que conectam pessoas, fortalecem marcas e impulsionam o crescimento. Especialistas em desenvolvimento web, apps móveis, e-commerces e marketing digital em Fortaleza, CE."
                keywords="desenvolvimento web, aplicativos móveis, e-commerce, marketing digital, landing pages, sites corporativos, cardápios digitais, Fortaleza, Ceará, Brasil, tecnologia, inovação"
                url="https://n2sgroup.com.br"
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994
            />
            <Header/>
            <Hero/>
            <Services/>
            <AboutSection/>
<<<<<<< HEAD
            <Contact>
            </Contact>
            
=======
            <Contact/>
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994
        </>
    )
}

export default Home;