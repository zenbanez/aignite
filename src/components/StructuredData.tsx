import React from 'react';

export default function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Project AIgnite",
    "url": "https://aignite.banezglobal.com",
    "description": "The Digital Atelier for professional growth for Filipino educators."
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "The Scholarly Mentor: AI for Educators",
    "description": "A comprehensive guide and toolkit for Filipino educators to master AI in the classroom.",
    "image": "https://aignite.banezglobal.com/ebook-cover-wide-v2.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Project AIgnite"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://zenbanez3.gumroad.com/l/olxtbb",
      "priceCurrency": "PHP",
      "price": "499",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
