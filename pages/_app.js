import React, { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Layout } from "../components";
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import MdxComponents from "../components/MdxComponents";
const components = { MdxComponents };

function IguanaDevelopmentTech({ Component, pageProps }) {
   return (
      <Layout>
         <Component {...pageProps} />
      </Layout>
   );
}

export default IguanaDevelopmentTech;
