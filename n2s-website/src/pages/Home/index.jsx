import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import Footer from '../../components/footer';
import Contact from '../../components/contact';

function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Services/>
            <Contact/>
            {/* Other components and     content can be added here */}
        </>
    )
}

export default Home;