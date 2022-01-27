import React from "react";
import { BlogScreen } from "../../components";
// import { getPosts } from "../../services/index";
const numberPerPage = 1;
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

const blog = ({ posts }) => {
  return <BlogScreen posts={posts} />;
};

export default blog;

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
