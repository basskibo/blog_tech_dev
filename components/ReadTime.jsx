import React from "react";
import Accent from "./custom/Accent";
const readingTime = require("reading-time");
import { IoTimeOutline } from "react-icons/io5";
import cslx from "clsx";

const ReadTime = ({ children, className }) => {
   const stats = readingTime(JSON.stringify(children[1]));
   return (
      <p className={cslx(className, "inline-flex mt-1")}>
         <IoTimeOutline className='h-full mt-0.5 text-lg' />{" "}
         <span className='ml-2 pb-1'>{stats.text}</span>
      </p>
   );
};

export default ReadTime;
