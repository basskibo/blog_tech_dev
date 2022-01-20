import React, { useState, useEffect } from "react";
import moment from "moment";

import Link from "next/link";
import { getRecentPosts, getSimiliarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimiliarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-slate-900 shadow-lg lg:mt-5 sm:mt-3 xs:mt-3  rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-white">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4 ">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="30px"
              width="30px"
              className="inline-block h-12 w-12 rounded-full ring-2 ring-orange-600"
              src={post.featuredImage.url}
            ></img>
          </div>
          <div className="flex-grow ml-2 ">
            <p className="text-slate-400 font-xs">
              {moment(post.createdAt).format("MMMM DD, YYYY")}
            </p>
            <span className="hover:cursor-pointer hover:underline-offset-1	 focus-within:shadow-lg">
              <Link
                href={`/post/${post.slug}`}
                key={post.title}
                className=" text-md "
              >
                <span className="text-white hover:text-slate-400">
                  {post.title}
                </span>
              </Link>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
