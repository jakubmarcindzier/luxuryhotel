export default defineNuxtConfig({
	modules: [
		'@nuxt/image-edge',
    '@pinia/nuxt',
		'nuxt-directus',
		'nuxt-jsonld',
		'nuxt-delay-hydration',
		'nuxt-font-loader'
	],
	runtimeConfig: {
		FRONT_URL: process.env.FRONT_URL,
    CMS_URL: process.env.CMS_URL,
    CMS_TOKEN: process.env.CMS_TOKEN,
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
    public: {
      FRONT_URL: process.env.FRONT_URL,
      CMS_URL: process.env.CMS_URL,
      CMS_TOKEN: process.env.CMS_TOKEN,
      RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
      RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
    }
  },
	app: {
		head: {
			htmlAttrs: {
				lang: 'en-US'
			},
		  meta: [
			  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
			  { name: 'robots', content: process.env.NUXT_INDEXABLE == 'true' ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex' }
		  ],
			link: [
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' },
				{ rel: 'preconnect', href: `${process.env.CMS_URL}` },
				{ rel: 'dns-prefetch', href: `${process.env.CMS_URL}` },
				{ rel: 'preconnect', href: '//cf.bstatic.com' },
				{ rel: 'dns-prefetch', href: '//cf.bstatic.com' },
		 	],
		}
	},
  fontLoader: {
    local: [
			{
        src: '/fonts/wotfard-light-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '300',
        display: 'swap'
      },
      {
        src: '/fonts/wotfard-regular-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '400',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-semibold-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '600',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-bold-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '700',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-lightitalic-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '300',
        style: 'italic',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-regularitalic-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '400',
        style: 'italic',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-medium-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '500',
        style: 'italic',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-mediumitalic-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '500',
        style: 'italic',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-semibolditalic-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '600',
        style: 'italic',
        display: 'swap'
      },
			{
        src: '/fonts/wotfard-bolditalic-webfont.woff2',
        family: 'Wotfard',
        fallback: 'sans-serif',
        weight: '700',
        style: 'italic',
        display: 'swap'
      }
    ]
  },
  css: [
    '@/assets/css/theme.scss'
  ],
	nitro: {
		compressPublicAssets: { 
      gzip: true,
      brotli: true
    },
    minify: false,
    serveStatic: true,
    storage: {
      'lh-redis': {
        driver: 'redis',
        url: 'redis://:R3disP@ss@127.0.0.1:6379',
      },
    },
		routeRules: {
			'/pages/**': { swr: 60 },
			'/guides/**': { swr: 60 },
			'/hotels/**': { swr: 60 },
			'/in/**': { swr: 60 },
			'/css/**': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/js/**': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/fonts/**': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/img/**': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/_nuxt/**': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/_ipx/**': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/**/*.js': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/**/*.css': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/**/*.json': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/**/*.html': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/**/*.xml': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
			'/**/*.svg': { headers: { 'Cache-Control': 'max-age=31536000, immutable' } },
		},
	},
	directus: {
		url: `${process.env.CMS_URL}`, 
	},
	image: {
    domains: [`${process.env.CMS_URL}`],
  },
	delayHydration: {
    mode: 'mount',
    idleCallbackTimeout: 15000,
  },
  build: {
    transpile: ['@vuepic/vue-datepicker', 'nuxt-directus'],
  },
});