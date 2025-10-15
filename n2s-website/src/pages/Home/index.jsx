import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
import Footer from '../../components/footer';
import Contact from '../../components/contact';

function Home() {
    return (
        <>
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