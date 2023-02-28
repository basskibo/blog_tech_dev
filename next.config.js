/** @type {import('next').NextConfig} */
const shouldAnalyzeBundles = process.env.ANALYZE === true

module.exports = {
  productionBrowserSourceMaps: true,
  // experimental: {
  // runtime: "nodejs",
  // },
  reactStrictMode: true,
  // experimental: { esmExternals: true },
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
  images: {
    domains: [
      'tailwindui.com',
      'images.pexels.com',
      'res.cloudinary.com',
      'avatars.githubusercontent.com'
    ]
  },
  eslint: {
    dirs: ['pages', 'components', 'posts', 'services'] // Only run ESLint on the 'pages', 'components', 'posts' and 'services' directories during production builds (next build)
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
