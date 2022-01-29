import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import SyntaxHighlighter from "react-syntax-highlighter" and  import prism theme
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { PostDetail, PostBody } from "../../components/";
import Accent from "../../components/custom/Accent";
import Image from "next/image";

const ResponsiveImage = (props) => (
   <Image alt={props.alt} layout='responsive' {...props} />
);
const components = {
   h1: ({ children }) => (
      <h1 className='text-white text-4xl font-bold my-5'> {children}</h1>
   ),
   h2: ({ children }) => (
      <h2 className='text-white text-2xl font-bold my-5'> {children}</h2>
   ),
   h3: ({ children }) => (
      <h3 className='text-white text-xl font-bold my-5'> {children}</h3>
   ),
   Accent: ({ children }) => <Accent>{children}</Accent>,
   img: ResponsiveImage,
   p: ({ children }) => <p className='my-5'>{children}</p>,

   code: ({ children }) => (
      <SyntaxHighlighter
         language='jsx'
         style={a11yDark}
         showLineNumbers={true}
         showInlineLineNumbers={true}>
         {children}
      </SyntaxHighlighter>
   ),
};

import { Categories, PostWidget } from "../../components";

const PostDetails = ({ data, mdxSource }) => {
   return (
      <div className='container mx-auto sm:mt-15 lg:mt-5 sm:mt-10 px-3 lg:rounded-lg p-0 lg:p-0 text-slate-400'>
         <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
               {/* <PostDetail post={data} /> */}

               <MDXRemote {...mdxSource} components={{ ...components }} lazy />

               {/* <Author author={post.author} /> */}
               {/* <CommentsForm slug={post.slug} /> */}
               {/* <Comments slug={post.slug} /> */}
            </div>
            <div className='col-span-1 lg:col-span-4'>
               <div className='relative top-8'>
                  <PostWidget
                  // slug={post.slug}
                  // categories={post.categories.map((category) => category.slug)}
                  />
                  {/* <Categories /> */}
               </div>
            </div>
         </div>
      </div>
   );
   // return (

   // );
};

export default PostDetails;

// export async function getStaticProps({ params }) {
//   const data = await getPostDetails(params.slug);
//   return {
//     props: { post: data },
//   };
// }

// export async function getStaticPaths() {
//   console.log("$$$$### getStaticPaths ");
//   const posts = await getPosts();

//   const bla = {
//     paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
//     fallback: false,
//   };
//   console.log(JSON.stringify(bla));
//   return bla;
// }

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
