import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Services from '../../components/services';
import Footer from '../../components/footer';

function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Services/>
            {/* Other components and     content can be added here */}
        </>
    )
}

export default Home;