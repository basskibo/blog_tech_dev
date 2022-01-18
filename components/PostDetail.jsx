import React from "react";
import moment from "moment";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
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
          <h3
            key={index}
            className="text-xl dark:text-white font-semibold mb-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-size-sm dark:text-slate-400">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-one":
        return (
          <h1
            key={index}
            className="text-2xl font-semibold dark:text-white mb-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h1>
        );
      case "heading-two":
        return (
          <h2
            key={index}
            className="text-2xl dark:text-white font-semibold mb-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        );

      case "heading-four":
        return (
          <h4
            key={index}
            className="text-lg dark:text-white font-semibold mb-4"
          >
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
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="flex justify-center mb-8 w-full">
        <h1 className="text-3xl text-semibold dark:text-white font-bold">
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
        <div className="flex justify-center dark:text-slate-400 mb-6 mt-6 w-full">
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
            <p className="inline align-middle tdark:text-slate-400 ml-2 text-lg">
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
            <span className="align-middle dark:text-slate-400">
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
        {/* <Divider
          className="text-white border-white"
          light={true}
          sx={{ bgcolor: "#ffff" }}
          style={{
            border: "none",
            height: 1,
            marginBottom: 20,
          }}
        ></Divider> */}
        <p className="border-b pb-5 pt-5 mb-4 align-middle text-center dark:text-white">
          {" "}
          Categories{" "}
        </p>
        <span className="pt-5 mt-5 ">
          {post.categories.map((category) => (
            // <Link href={`/post/${category.slug}`}>
            <Chip
              label={category.name}
              variant="outlined"
              className="text-white lg:ml-5 sm:m-3  ml-3"
            />
            // </Link>
          ))}
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
