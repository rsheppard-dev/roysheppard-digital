import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='robots' content='index, follow' />
					<meta
						property='og:title'
						content='Roy Sheppard - Freelance Web Designer and Developer'
					/>
					<meta
						property='og:url'
						content='https://www.roysheppard.digital/web-design-watford'
					/>
					<meta property='og:type' content='website' />
					<meta
						property='og:description'
						content='Get in touch today for a FREE website strategy call. I am Roy Sheppard, a freelance web designer and developer from Watford.'
					/>
					<meta
						property='og:image'
						content='https://www.roysheppard.digital/images/facebook-og.png'
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
						dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-PTDWD92');`,
						}}
					/>
				</Head>
				<body>
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTDWD92" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
						}}
					></noscript>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
