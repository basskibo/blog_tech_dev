import React, { useState, useEffect } from "react";
import Head from "next/head";
import Accent from "../components/custom/Accent";
import Landing from "../components/Landing";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export default function Home({ posts }) {
   // const [numberOfPages, setnumberOfPages] = useState(0)
   // const postNum = posts.length
   // const [numberOfPosts, setNumberOfPosts] = useState(postNum)
   // const [pageNumber, setpageNumber] = useState(1)
   // // console.log(posts);
   // useEffect(() => {
   // 	const offset = (pageNumber - 1) * numberPerPage + 1
   // 	const calculatedPages = Math.ceil(posts.length / numberPerPage)
   // 	setnumberOfPages(calculatedPages)
   // 	setpageNumber(offset)
   // }, [])

   return (
      // <div className='container mx-auto sm:px-5 sm:mx-5 xs:px-5'>
      <div>
         <Head>
            <meta property='og:url' content='https://bojanjagetic.com/' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content='Bojan Jagetic Blog' />
            <meta property="og:site_name" content="Blogtech" />
            <meta property="og:locale" content="en_US" />

            <meta
               property='og:description'
               content='Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.'
            />
            <meta
               property='og:image'
               content='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg'
            />
            <meta property='fb:app_id' content='3881343925425006' />
            <title>Bojan Jagetic</title>
            <link rel='icon' href='/favicon.ico' />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
            {/* <script
               async
               defer
               data-website-id='450f4336-3ad9-4ab9-8bd2-f4961ec74b8d'
               src='https://blogtech-umami.herokuapp.com/umami.js'></script> */}
            <script async defer data-website-id="ad2da36d-df11-4b49-a551-6aea0bf95f30" src="https://blogtech-umami.herokuapp.com/umami.js"></script>
            {/* <script async src="https://cdn.splitbee.io/sb.js"></script> */}

         </Head>
         {/* <div className='text-center mt-10 mb-10  text-white'> */}
         <Landing />
         {/* </div> */}
      </div>
   );
}

export const getStaticProps = async () => {
   const files = fs.readdirSync(path.join("posts/blog"));
   const posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
         path.join("posts/blog", filename),
         "utf-8"
      );
      const { data: postData } = matter(markdownWithMeta);
      const data = { ...postData, slug: filename.split(".")[0] };
      return {
         data,
      };
   });
   return {
      props: {
         posts,
      },
   };
};
