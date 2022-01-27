import React from "react";
import { BlogScreen } from "../../components";
import { getPostFiles } from "../../services/indexv2";
const numberPerPage = 1;
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

const blog = ({ posts }) => {
  const blogData = posts[0];
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
