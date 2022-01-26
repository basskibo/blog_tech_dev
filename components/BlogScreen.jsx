import React, { useState, useEffect } from "react";
import { PostCard, PostWidget, Categories, Pagination } from "../components";
const numberPerPage = 1;

const BlogScreen = ({ posts }) => {
  console.log(posts);
  const [numberOfPages, setnumberOfPages] = useState(0);
  const postNum = posts.length;
  const [numberOfPosts, setNumberOfPosts] = useState(postNum);
  const [pageNumber, setpageNumber] = useState(1);

  useEffect(() => {
    const offset = (pageNumber - 1) * numberPerPage + 1;
    const calculatedPages = Math.ceil(posts.length / numberPerPage);
    setnumberOfPages(calculatedPages);
    setpageNumber(offset);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 col-span-1">
        {posts.map((post, index) => (
          <PostCard post={post.node} key={post.title} />
        ))}

        <Pagination
          pageNumber={pageNumber}
          numberOfPosts={numberOfPosts}
          numberOfPages={numberOfPages}
        />
      </div>
      <div className="lg:col-span-4 col-span-1">
        <div className=" top-8">
          <PostWidget />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default BlogScreen;
