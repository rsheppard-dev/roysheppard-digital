import CookieConsent from 'react-cookie-consent';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
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
