import Script from 'next/script';
import CookieConsent from 'react-cookie-consent';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			{/* Google Tag Manager - Global base code */}
			<Script
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];
                            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                            j.async=true;
                            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');`,
				}}
			/>

			<CookieConsent
				buttonClasses='button'
				buttonStyle={{
					background: '#ffc300',
				}}
			>
				This website uses cookies to analyse site usage in order to improve the
				user experience.
			</CookieConsent>

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
