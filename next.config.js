/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
   // experimental: {
   // 	runtime: "nodejs",
   // },
   reactStrictMode: true,
   // experimental: { esmExternals: true },
   pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
   // Support loading `.md`, `.mdx`:
   webpack(config, options) {
      config.module.rules.push(
         {
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
         },
         {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
         }
      );

      return config;
   },
   images: {
      domains: [
         "tailwindui.com",
         "images.pexels.com",
         "res.cloudinary.com",
         "avatars.githubusercontent.com",
      ],
   },
   eslint: {
      dirs: ["pages", "components", "posts", "services"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
   },
};

const sentryWebpackPluginOptions = {
   // Additional config options for the Sentry Webpack plugin. Keep in mind that
   // the following options are set automatically, and overriding them is not
   // recommended:
   //   release, url, org, project, authToken, configFile, stripPrefix,
   //   urlPrefix, include, ignore

   silent: true, // Suppresses all logs
   // For all available options, see:
   // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
