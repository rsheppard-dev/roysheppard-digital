import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '../lib/gtm';
class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		const schemaData = {
			'@context': 'http://schema.org',
			'@type': 'LocalBusiness',
			name: 'Roy Sheppard Digital',
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
			url: 'https://www.roysheppard.digital',
			sameAs: [
				'https://www.facebook.com/roysheppard.digital',
				'https://twitter.com/rsheppard_dev',
				'https://www.instagram.com/roysheppard.digital',
				'https://www.linkedin.com/in/roysheppard-digital',
			],
		};

		return (
			<Html lang='en'>
				<Head>
					<meta name='robots' content='index, follow' />
					<meta
						property='og:title'
						content='Roy Sheppard - Freelance Web Designer and Developer'
					/>
					<meta property='og:url' content='https://www.roysheppard.digital' />
					<meta property='og:type' content='website' />
					<meta
						property='og:description'
						content='Get in touch today for a FREE website strategy call. I am Roy Sheppard, a freelance web designer and developer from Watford.'
					/>
					<meta
						property='og:image'
						content='https://www.roysheppard.digital/images/open-graph.png'
					/>

					<meta name='twitter:card' content='summary_large_image' />
					<meta
						name='twitter:title'
						content='Roy Sheppard - Freelance Web Designer and Developer'
					/>
					<meta
						name='twitter:description'
						content='Get in touch today for a FREE website strategy call. I am Roy Sheppard, a freelance web designer and developer from Watford.'
					/>
					<meta name='twitter:site' content='@rsheppard_dev' />
					<meta
						name='twitter:image'
						content='https://www.roysheppard.digital/images/twitter-card.png'
					/>
					<meta name='twitter:creator' content='@rsheppard_dev' />

					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon-16x16.png'
					/>
					<link rel='manifest' href='/site.webmanifest' />

					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
					/>
				</Head>
				<body>
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
							height='0'
							width='0'
							style={{ display: 'none', visibility: 'hidden' }}
						/>
					</noscript>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
