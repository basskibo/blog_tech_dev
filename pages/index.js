import React, { useState, useEffect } from "react";
import Head from "next/head";
import { async } from "regenerator-runtime";
import { BlogScreen } from "../components";
const numberPerPage = 1;
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto lg:px-10 sm:px-0 xs:px-0  mb-8 ">
      <Head>
        <title>IguDev Tech Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogScreen posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts(numberPerPage)) || [];
  return {
    props: { posts },
  };
}
