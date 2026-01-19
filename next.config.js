/** @type {import('next').NextConfig} */
const shouldAnalyzeBundles = process.env.ANALYZE === false

// const withPWA = require('next-pwa')({
// 	dest: 'public'
// })
const NextConfiguration = {
	// Disable source maps in production for better performance
	productionBrowserSourceMaps: false,
	// Enable compression
	compress: true,
	// Enable React strict mode
	reactStrictMode: true,
	// Optimize page extensions
	pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
	// Support loading `.md`, `.mdx`:
	webpack (config, options) {
		config.module.rules.push(
			{
				test: /\.mdx?$/,
				use: [
					// The default `babel-loader` used by Next:
					options.defaultLoaders.babel,
					{
						loader: '@mdx-js/loader',
						/** @type {import('@mdx-js/loader').Options} */
						options: {
							/* jsxImportSource: …, otherOptions… */
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack']
			}
		)
		if (shouldAnalyzeBundles) {
			const withNextBundleAnalyzer =
        require('next-bundle-analyzer')(/* options come there */)
			config = withNextBundleAnalyzer(config)
		}

		return config
	},
	// Optimize images configuration
	images: {
		domains: [
			'tailwindui.com',
			'images.pexels.com',
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
			'images.unsplash.com',
			'thepracticaldev.s3.amazonaws.com',
			'dev-to-uploads.s3.amazonaws.com'
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	// Optimize ESLint
	eslint: {
		dirs: ['pages', 'components', 'posts', 'services'] // Only run ESLint on the 'pages', 'components', 'posts' and 'services' directories during production builds (next build)
	},
	// Headers for better caching and security
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on'
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin'
					}
				]
			},
			{
				source: '/images/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	},
	async rewrites () {
		return [
			{
				source: '/api/views',
				destination: 'http://localhost:3000'
			}
		]
	}
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })
// module.exports = withBundleAnalyzer({ NextConfiguration })
module.exports = NextConfiguration
// module.exports = withPWA(NextConfiguration)
