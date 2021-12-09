import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '../lib/gtm';
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
							__html: `(function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:2733262,hjsv:6};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');
                            r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
						}}
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
