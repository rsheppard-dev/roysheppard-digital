type Faq = { question: string; answer: string };

/** FAQPage structured data — kept as a shared piece so it always matches the FAQs actually rendered on the page (Google requires the two to agree for FAQ rich results). */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
