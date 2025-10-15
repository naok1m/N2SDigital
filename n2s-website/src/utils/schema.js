// Schema.org structured data para N2S Digital
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "N2S Digital",
  "alternateName": "N2S",
  "url": "https://n2sdigital.com",
  "logo": "https://n2sdigital.com/logo.png",
  "description": "Agência digital especializada em desenvolvimento web, aplicativos mobile, design UI/UX e marketing digital em Fortaleza, CE.",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Fortaleza",
    "addressLocality": "Fortaleza",
    "addressRegion": "CE",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-85-99694-1119",
    "contactType": "customer service",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  },
  "email": "contato@n2sdigital.com",
  "sameAs": [
    "https://www.instagram.com/n2sdigital",
    "https://www.linkedin.com/company/n2sdigital",
    "https://wa.me/5585996941119"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Brazil"
  },
  "knowsAbout": [
    "Desenvolvimento Web",
    "Aplicativos Mobile", 
    "Design UI/UX",
    "Marketing Digital",
    "E-commerce",
    "Landing Pages"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "N2S Digital",
  "image": "https://n2sdigital.com/logo.png",
  "description": "Agência digital especializada em desenvolvimento web, aplicativos mobile, design UI/UX e marketing digital em Fortaleza, CE.",
  "url": "https://n2sdigital.com",
  "telephone": "+55-85-99694-1119",
  "email": "contato@n2sdigital.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Fortaleza",
    "addressLocality": "Fortaleza", 
    "addressRegion": "CE",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-3.7319",
    "longitude": "-38.5267"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "currenciesAccepted": "BRL"
};

export const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desenvolvimento Web",
    "description": "Criação de websites institucionais, sistemas web personalizados e aplicações web modernas.",
    "provider": {
      "@type": "Organization",
      "name": "N2S Digital"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    },
    "serviceType": "Desenvolvimento Web"
  },
  {
    "@context": "https://schema.org", 
    "@type": "Service",
    "name": "Aplicativos Mobile",
    "description": "Desenvolvimento de aplicativos mobile para iOS e Android com tecnologias modernas.",
    "provider": {
      "@type": "Organization",
      "name": "N2S Digital"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    },
    "serviceType": "Desenvolvimento Mobile"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service", 
    "name": "Design UI/UX",
    "description": "Criação de interfaces intuitivas e experiências de usuário excepcionais.",
    "provider": {
      "@type": "Organization",
      "name": "N2S Digital"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    },
    "serviceType": "Design"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marketing Digital", 
    "description": "Estratégias de marketing digital para aumentar visibilidade e conversões online.",
    "provider": {
      "@type": "Organization",
      "name": "N2S Digital"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    },
    "serviceType": "Marketing Digital"
  }
];

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "N2S Digital",
  "url": "https://n2sdigital.com",
  "description": "Agência digital especializada em desenvolvimento web, aplicativos mobile, design UI/UX e marketing digital em Fortaleza, CE.",
  "publisher": {
    "@type": "Organization",
    "name": "N2S Digital"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://n2sdigital.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
