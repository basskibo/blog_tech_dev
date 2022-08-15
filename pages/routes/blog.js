import React from "react";
import { BlogScreen } from "../../components";
import Accent from "../../components/custom/Accent";
import { getPostFiles } from "../../services/indexv2";
const numberPerPage = 1;
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import "react-loading-skeleton/dist/skeleton.css";

const blog = ({ posts }) => {
   return <BlogScreen posts={posts} />;
};

export default blog;

export const getStaticProps = async () => {
   const files = getPostFiles();
   const posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
         path.join("posts/blog", filename),
         "utf-8"
      );

      let { content, data } = matter(markdownWithMeta);
      data = { ...data, slug: filename.split(".")[0] };
      // const mdxSource = await serialize(content);

      return {
         props: {
            data,
            content,
         },
      };
   });
   return {
      props: {
         posts,
      },
   };
};
