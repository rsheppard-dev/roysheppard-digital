import Head from 'next/head';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Faq from '../components/Faq';
import Contact from '../components/Contact';

export default function Home({ faqs }) {
	const schemaData = {
		'@context': 'http://schema.org',
		'@type': 'LocalBusiness',
		name: 'Roy Sheppard',
		telephone: '07883066944',
		email: 'info@roysheppard.digital',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '43 Maytree Crescent',
			addressLocality: 'Watford',
			addressRegion: 'Hertfordshire',
			addressCountry: 'United Kingdom',
			postalCode: 'WD24 5NJ',
		},
		url: 'https://www.roysheppard.digital/web-design-watford',
	};
	return (
		<>
			<Head>
				<title>Web Design Watford - Roy Sheppard Digital</title>
				<meta
					name='description'
					content='Get in touch today for a FREE website strategy call. I am Roy Sheppard, a freelance web designer and developer from Watford.'
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
				/>
			</Head>

			<Hero />

			<About />

			<Services />

			<Faq faqs={faqs} />

			<Contact />
		</>
	);
}

export async function getStaticProps() {
	const uri = process.env.NEXT_PUBLIC_WP_GRAPHQL;
	const res = await fetch(uri, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `
              query faqQuery {
                faqs {
                  nodes {
                    faqId
                    title
                    content
                  }
                }
              }
          `,
		}),
	});

	const json = await res.json();

	return {
		props: {
			faqs: json.data.faqs,
		},
	};
}
