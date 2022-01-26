import React, { useState, useEffect } from "react";
import Head from "next/head";
import { async } from "regenerator-runtime";
import { PostCard, PostWidget, Categories, Pagination } from "../components";
const numberPerPage = 1;
// import { getPosts } from "../services";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export default function Home({ posts }) {
  const [numberOfPages, setnumberOfPages] = useState(0);
  const postNum = posts.length;
  const [numberOfPosts, setNumberOfPosts] = useState(postNum);
  const [pageNumber, setpageNumber] = useState(1);
  console.log(posts);
  useEffect(() => {
    const offset = (pageNumber - 1) * numberPerPage + 1;
    const calculatedPages = Math.ceil(posts.length / numberPerPage);
    setnumberOfPages(calculatedPages);
    setpageNumber(offset);
  }, []);

  return (
    <div className="container mx-auto  sm:px-0 xs:px-0  mb-8 bg-gradient-to-tr">
      <Head>
        <meta property="og:url" content="https://igutech.vercel.app" />
        <meta property="og:type" content="site" />
        <meta property="og:title" content="Start your journey" />
        <meta
          property="og:description"
          content="Everything you need to know about Development."
        />
        <meta
          property="og:image"
          content="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
        />
        <meta property="fb:app_id" content="3881343925425006" />
        <title>IguDev Tech Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.postData} key={post.title} />
          ))}
          <Pagination
            pageNumber={pageNumber}
            numberOfPosts={numberOfPosts}
            numberOfPages={numberOfPages}
          />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const posts = (await getPosts(numberPerPage)) || [];
//   return {
//     props: { posts },
//   };
// }

// export default function Home({ posts }) {
//   return (
//     <div className="mt-5 text-white">
//       {posts.map((post, index) => (
//         <Link href={"/post/" + post.slug} passHref key={index}>
//           <div className="card mb-3 pointer" style={{ maxWidth: "540px" }}>
//             <div className="row g-0">
//               <div className="col-md-8">
//                 <div className="card-body">
//                   <h5 className="card-title">{post.frontMatter.title}</h5>
//                   <p className="card-text">{post.frontMatter.description}</p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       {post.frontMatter.date}
//                     </small>
//                   </p>
//                 </div>
//               </div>
//               <div className="col-md-4 m-auto">
//                 <Image
//                   src={post.frontMatter.thumbnailUrl}
//                   className="img-fluid mt-1 rounded-start"
//                   alt="thumbnail"
//                   width={500}
//                   height={400}
//                   objectFit="cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts/blog"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts/blog", filename),
      "utf-8"
    );

    const { data: postData } = matter(markdownWithMeta);

    return {
      postData,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
};
