import React, { useEffect, useState } from "react";
import { Layout, Pagination } from "../components";
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";

function IguanaDevelopmentTech({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Pagination />
    </Layout>
  );
}

export default IguanaDevelopmentTech;
