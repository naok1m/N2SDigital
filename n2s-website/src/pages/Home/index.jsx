import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import AboutSection from '../../components/about';

function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Services/>
            <AboutSection/>
        </>
    )
}

export default Home;