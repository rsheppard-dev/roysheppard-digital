import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return(
            <Html lang="en">
                <Head>
                    <meta name="robots" content="index, follow" />
                    <meta property="og:title" content="Roy Sheppard - Freelance Web Designer + Developer" />
                    <meta property="og:url" content="https://www.roysheppard.digital/web-design-watford" />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="Are you looking to increase traffic to your website? Or are you trying get your business online? My name is Roy Sheppard and I am a freelance web designer and developer based in Watford. Click the link to find out more about my services." />
                    <meta property="og:image" content="https://www.roysheppard.digital/images/og.jpg" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument