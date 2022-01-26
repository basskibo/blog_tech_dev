/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // experimental: { esmExternals: true },
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  // Support loading `.md`, `.mdx`:
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            /* jsxImportSource: …, otherOptions… */
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: [""],
  },
};
