import React from 'react';
import Header from '../../components/header';
import Hero from '../../components/hero';
import Caurosel from '../../components/Carousel';

function Home() {
    return (
        <>
            <Header/>
            <Hero/>
            <Caurosel/>
            {/* Other components and content can be added here */}
        </>
    )
}

export default Home;