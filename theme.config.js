export default {
  github: 'https://github.com/bingomanatee/forest',
  docsRepositoryBase: 'https://github.com/bingomanatee/forest-docs',
  titleSuffix: ' – Forest',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Forest</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        The state management engine for real world apps
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Forest: state management for real world apps" />
      <meta name="og:description" content="Forest: State Management" />
      {/*  <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://nextra.vercel.app/og.png" />
      <meta name="twitter:site:domain" content="nextra.vercel.app" />
      <meta name="twitter:url" content="https://nextra.vercel.app" /> */ }
      <meta name="og:title" content="Forest: State Management" />
      { /* <meta name="og:image" content="https://nextra.vercel.app/og.png" /> */ }
      <meta name="apple-mobile-web-app-title" content="Forest" />
      <link rel="stylesheet" href="/example-style.css"/>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>MIT {new Date().getFullYear()} © Wonderland Labs.</>,
  unstable_faviconGlyph: '👋',
}
