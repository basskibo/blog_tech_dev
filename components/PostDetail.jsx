import React from "react";
import moment from "moment";
import CategoryChip from "./CategoryChip";
import { Link } from "next/link";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="lg:text-xl text-white font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 lg:text-size-sm text-slate-400">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-one":
        return (
          <h1 key={index} className="lg:text-2xl font-semibold text-white mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h1>
        );
      case "heading-two":
        return (
          <h2 key={index} className="lg:text-2xl text-white font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        );

      case "heading-four":
        return (
          <h4 key={index} className="lg:text-lg text-white font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-slate-900 shadow-lg lg:rounded-lg lg:p-8 pb-12 mb-8 lg:mt-5 sm:mt-10 xs:mt-10">
      <div className="flex justify-center mb-8 w-full pt-5 lg:pt-1 mt-0 lg:mt-0">
        <h1 className="lg:text-3xl text-xl  text-semibold text-white font-bold">
          {post.title}
        </h1>
      </div>
      <div className="relative overflow-hidden shadow-md md-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full "
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex justify-center text-slate-400 mb-6 mt-6 w-full">
          <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            {/* <p className="align-middle lg:mr-2">Author: </p> */}
            <img
              alt={post.author.name}
              height="30px"
              width="30px"
              // className="align-middle rounded-full"
              className="inline-block h-12 w-12 rounded-full ring-2 ring-orange-600"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-slate-400 ml-2 lg:text-lg sm:text-md">
              {post.author.name}
            </p>
          </div>
          <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-3">
            {/* <p className="align-middle mr-2">Publish: </p> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-orange-600"
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
            <span className="align-middle text-slate-400 lg:text-lg">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          );
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
      <div className="mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-3">
        <p className="border-b pb-5 pt-5 mb-4 align-middle text-center text-white">
          {" "}
        </p>
        <span className="pt-5 mt-5 ">
          <CategoryChip categories={post.categories} />
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
