import React from "react";
import { BlogScreen } from "../../components";
import Accent from "../../components/custom/Accent";
import { getPostFiles } from "../../services/indexv2";
const numberPerPage = 1;
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
const loading = true;

const blog = ({ posts }) => {
   const blogData = posts[0];
   return (
      <div>
         {posts.length < 1 ? (
            <div className='container mx-auto my-14 px-3 sm:px-2 xs:px-3 lg:px-3 bg-gradient-to-tr text-slate-400'>
               <div className='my-10'>
                  <h1 className='mb-5'>
                     <Accent className='font-extrabold text-6xl'>Blog</Accent>
                  </h1>
                  <p className='display-4'>
                     Thoughts, mental models, and tutorials about all kind of
                     web development, devOps and hybrid mobile applications .
                  </p>
               </div>

               <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-14 '>
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
                  <Skeleton
                     baseColor='#202020'
                     highlightColor='#444'
                     count={5}
                  />
               </div>
            </div>
         ) : (
            <BlogScreen posts={posts} />
         )}
      </div>
   );
};

export default blog;

export const getStaticProps = async () => {
   const files = getPostFiles();
   const posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
         path.join("posts/blog", filename),
         "utf-8"
      );

      let { data } = matter(markdownWithMeta);
      data = { ...data, slug: filename.split(".")[0] };

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
