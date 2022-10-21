import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import moment from "moment";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import matter from "gray-matter";
import ReactTooltip from "react-tooltip";
import MdxComponents from "../../components/custom/MdxComponents";
import TableOfContent from "../../components/custom/TableOfContent";
import ReadTime from "../../components/ReadTime";
import SocialNetworkShare from "../../components/custom/SocialNetworkShare";
import constants from "../../lib/constants";


function getTableOfContents(content) {
   const regexp = new RegExp(/^(### |## )(.*)\n/, "gm");
   const headings = [...content.matchAll(regexp)];

   let tableOfContents = [];

   let lastElType;
   if (headings.length) {
      headings.forEach((heading) => {
         const headingText = heading[2].trim();
         const headingType = heading[1].trim() === "##" ? "h2" : "h3";
         const headingLink = slugify(headingText, {
            lower: true,
            strict: true,
         });

         lastElType = headingType;
         const head = {
            title: headingType === "h2" ? headingText : `${headingText}`,
            headerType: headingType,
            subheading: [],
            link: `#${headingLink}`,
         };
         if (headingType === "h3") {
            // let lastEl = tableOfContents.at(-1) // vercel does not support .at method currently
            let lastEl = tableOfContents[tableOfContents.length - 1];
            if (lastElType === "h2") {
               tableOfContents.pop();
               lastEl.subheading.push(head);
               tableOfContents.push(lastEl);
            } else {
               tableOfContents.pop();
               lastEl.subheading.push(head);
               tableOfContents.push(lastEl);
            }
         } else {
            tableOfContents.push(head);
         }
      });
   }
   return tableOfContents;
}

const components = {
   h1: MdxComponents.h1,
   h2: MdxComponents.h2,
   h3: MdxComponents.h3,
   img: MdxComponents.img,
   CloudinaryImage: MdxComponents.img,
   p: MdxComponents.p,
   a: MdxComponents.a,
   code: MdxComponents.code,
   LgList: MdxComponents.ulLg,
   SmList: MdxComponents.ulSm,
   Link: MdxComponents.a,
   b: MdxComponents.b,
   Accent: MdxComponents.Accent,
   Adjusted: MdxComponents.Adjusted,
   QouteComponent: MdxComponents.QouteComponent,
   GithubCardRepo: MdxComponents.GithubCardRepo,
};

const LibaryDetails = ({ data, mdxSource, toc }) => {
   // data.technologies.forEach((tech) => {
   //    console.log(tech);
   //    React.createElement(
   //       tech,
   //       { className: "some-class" },
   //       <div className='some-class'>some content</div>
   //    );
   // });

   return (
      <div className='container mx-auto sm:mt-15 lg:mt-5 sm:mt-10 px-5 md:px-10 mb-10 lg:rounded-lg p-0  text-slate-400'>
         <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-12'>
            <div className='col-span-1 lg:col-span-9'>
               {/* <PostDetail post={data} content={mdxSource} /> */}
               <div className=' my-10 '>
                  <h1 className='lg:text-4xl text-2xl lg:my-5 text-semibold text-white font-bold break-words'>
                     {" "}
                     {data.title}
                  </h1>
                  <div className='lg:px-0 prose'>
                     <div className=' text-slate-400  my-6 w-full mb-2 lg:ml-2 mr-8'>
                        <div className='flex-1  mb-2 w-full lg:w-auto '>
                           <p className='text-slate-400  lg:text-md sm:text-sm'>
                              Writen on{" "}
                              <span className='font-semibold hidden lg:inline'>
                                 {moment(data.publishedAt).format(
                                    "MMMM DD, YYYY"
                                 )}
                              </span>{" "}
                              <span className='font-semibold lg:hidden inline'>
                                 {moment(data.publishedAt).format("DD.MM.YYYY")}
                              </span>{" "}
                              by{" "}
                              <span className='font-semibold'>
                                 {data.author}
                              </span>
                           </p>
                        </div>
                        <span className='flex mb-2'>
                           <ReadTime className=' w-28  flex-initial    lg:text-md sm:text-sm'>
                              {mdxSource.compiledSource}
                           </ReadTime>
                           <div
                              className='w-1 h-1 mt-3 mr-6 rounded-full flex-initial'
                              style={{ backgroundColor: "#FFF" }}></div>
                           {/* <span className='mr-2 text-white'>
                              Technology stack used:{" "}
                           </span> */}
                           {data.technologies.map((Tech, index) =>
                              constants.generateIcon(Tech)
                           )}
                        </span>

                        <blockquote className='mt-0 mb-4'>
                           <p className='text-slate-400 mt-0'>
                              {data.description}
                           </p>
                        </blockquote>

                        <div className='flex flex-inline mb-2'>
                           {/* <span className='lg:text-lg sm:text-md mr-3 p-0'>Share: </span> */}
                           <span className='mr-2 text-white'>Share:</span>
                           <SocialNetworkShare post={data} type='libary' />
                        </div>
                     </div>
                  </div>
               </div>
               <p className='border-b  mb-4 align-middle text-center text-white'>
                  {" "}
               </p>
               <MDXRemote {...mdxSource} components={{ ...components }} lazy />
            </div>
            <div className='hidden lg:block col-span-1 lg:col-span-3 place-content-center'>
               <TableOfContent toc={toc} />
            </div>
         </div>
      </div>
   );
};

export default LibaryDetails;

export const getStaticProps = async ({ params: { slug } }) => {
   const markdownWithMeta = fs.readFileSync(
      path.join("posts/libaries", slug + ".mdx"),
      "utf-8"
   );

   let { content, data } = matter(markdownWithMeta);

   data = { ...data, slug };
   const toc = getTableOfContents(content);
   console.log(toc)
   const mdxSource = await serialize(content);

   return {
      props: {
         data,
         mdxSource,
         toc,
      },
   };
};
export const getStaticPaths = async () => {
   const files = fs.readdirSync(path.join("posts/libaries"));
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
