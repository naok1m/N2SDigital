import React from "react";
import Header from "../../components/header";
import Services from "../../components/services";
import SEOHead from "../../components/SEOHead";

export default function ServicesPage() {
  return (
    <>
      <SEOHead 
        title="Nossos Serviços - Desenvolvimento Web, Apps e E-commerce | N2S Digital"
        description="Conheça nossos serviços especializados: Landing Pages de alta conversão, Websites Corporativos, E-commerces completos e Cardápios Digitais. Soluções digitais inovadoras para impulsionar seu negócio."
        keywords="serviços digitais, landing pages, websites corporativos, e-commerce, cardápios digitais, desenvolvimento web, aplicativos móveis, marketing digital, conversão, Fortaleza"
        url="https://n2sgroup.com.br/services"
      />
      <Header />
      <Services />
    </>
  );
}
