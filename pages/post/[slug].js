import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
   PostDetail,
   PostBody,
   PostWidget,
   CategoryChip,
} from "../../components/";

import MdxComponents from "../../components/MdxComponents";

import Image from "next/image";

const ResponsiveImage = (props) => (
   <Image alt={props.alt} layout='responsive' {...props} />
);

const parseLanguageByClass = (className) => {
   return className.split("-")[1];
};

const components = {
   h1: MdxComponents.h1,
   h2: MdxComponents.h2,
   h3: MdxComponents.h3,
   img: MdxComponents.img,
   p: MdxComponents.p,
   code: MdxComponents.code,
   Accent: MdxComponents.Accent,
   TestComponent: MdxComponents.TestComponent,
};

// const components = { wrapper: Wrapper };
// function Wrapper({ children }) {
//    const titles = React.Children.toArray(children)
//       .filter((child) => child.props.mdxType === "h1")
//       .map((child) => child.props.children);

//    return (
//       <main>
//          Table of contents:
//          <ul className='text-white'>
//             {titles.map((title) => (
//                <li className='text-white'>{title} </li>
//             ))}
//          </ul>
//          <hr />
//          {children}
//       </main>
//    );
// }
// const components = {
//    //  h1: MdxComponents.h1,
//    //  h1: MdxComponents.h1,
//    TestComponent: dynamic(() => import("../../components/TestComponent")),
// };

const PostDetails = ({ data, mdxSource }) => {
   return (
      <div className='container mx-auto sm:mt-15 lg:mt-5 sm:mt-10 px-3 lg:rounded-lg p-0 lg:p-0 text-slate-400'>
         <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-9'>
               <PostDetail post={data} />

               <MDXRemote {...mdxSource} components={{ ...components }} lazy />

               <div className='mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-3'>
                  <p className='border-b pb-5 pt-5 mb-4 align-middle text-center text-white'>
                     {" "}
                  </p>
                  <span className='pt-5 mt-5 '>
                     <CategoryChip categories={data.tags} />
                  </span>
               </div>
               {/* <Author author={post.author} /> */}
               {/* <CommentsForm slug={post.slug} /> */}
               {/* <Comments slug={post.slug} /> */}
            </div>
            <div className='sticky absolute col-span-1 lg:col-span-3'>
               <h2>Table of Content</h2>
               <ul>
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default PostDetails;

export const getStaticProps = async ({ params: { slug } }) => {
   const markdownWithMeta = fs.readFileSync(
      path.join("posts/blog", slug + ".mdx"),
      "utf-8"
   );

   let { content, data } = matter(markdownWithMeta);
   data = { ...data, slug };
   const mdxSource = await serialize(content);

   return {
      props: {
         data,
         mdxSource,
      },
   };
};
export const getStaticPaths = async () => {
   const files = fs.readdirSync(path.join("posts/blog"));
   const paths = files.map((filename) => ({
      params: {
         slug: filename.replace(".mdx", ""),
      },
   }));

   return {
      paths,
      fallback: false,
   };
};
