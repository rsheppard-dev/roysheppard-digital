const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = withCss(withPurgeCss());

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/web-design-watford',
        permanent: true
      }
    ]
  },
  reactStrictMode: true,
}
