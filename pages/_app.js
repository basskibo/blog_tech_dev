import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from "../components";
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import * as ga from "../lib/analytics";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";

import NextHead from "next/head";

function IguanaDevelopmentTech({ Component, pageProps }) {
   const router = useRouter();
   const title = pageProps.data ? `${pageProps.data.title}` : "Bojan Jagetic";
   const ogUrl = pageProps.data
      ? pageProps.data.featuredImage
      : "https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg";
   useEffect(() => {
      const handleRouteChange = (url) => {
         console.log(url);
         ga.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
         router.events.off("routeChangeComplete", handleRouteChange);
      };
   }, [router.events]);

   return (
      <>
         <NextHead>
            <title>{title}</title>
            <meta property='og:image' content={ogUrl} />
            <meta
               property='og:description'
               content={
                  pageProps.data
                     ? pageProps.data.excerpt
                     : "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away "
               }
            />
         </NextHead>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </>
   );
}

export default IguanaDevelopmentTech;
