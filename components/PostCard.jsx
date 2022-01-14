import React from "react";
import moment from "moment";

import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 md-8 mb-12 lg:md-14">
      <div
        className="relative overflow-hidden shadow-md pb-80 md-6"
        alt="image"
      >
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rouded-lg"
        />
      </div>
      <h1 className="transition duration-800 pt-4 text-center mb-8 cursor-pointer hover:text-red-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            alt={post.authors.name}
            height="50px"
            width="50px"
            className="align-middle rounded-full"
            src={post.authors[0].photo.url}
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.authors[0].name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-3 lg:px-20 mb-4">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          {/* <button class="trasition duration-300 bg-transparent hover:bg-red-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Continue reading */}
          {/* </button> */}
          <span className="transition  duration-500 transform hover:-translate-y-1 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-8 py-3 mt-3 cursor-pointer">
            Continue reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
