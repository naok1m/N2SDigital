import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';
import Footer from '../../components/footer';

function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Services/>
            <AboutSection/>
            <Footer/>
        </>
    )
}

export default Home;