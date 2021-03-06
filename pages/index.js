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
            <meta property='og:url' content='https://igutech.vercel.app' />
            <meta property='og:type' content='site' />
            <meta property='og:title' content='Start your journey' />
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
            <script
               async
               defer
               data-website-id='450f4336-3ad9-4ab9-8bd2-f4961ec74b8d'
               src='https://blogtech-umami.herokuapp.com/umami.js'></script>
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
