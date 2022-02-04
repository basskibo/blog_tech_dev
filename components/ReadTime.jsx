import React from "react";
import Accent from "./custom/Accent";
const readingTime = require("reading-time");
import { IoMdTime } from "react-icons/io";
//   "$$51 5125 21 51258125 218 5y2185 128h5 129h59 125h12958 h21h hfhadfuiahfuashfsuahfusaihfaiushfusahfuisahfhsuahfusahu fs  hsaufhuashu hf uhfash fh sfhs ahfuhuashf uhas"
// );
const ReadTime = ({ children }) => {
   console.log(children[1]);
   const stats = readingTime(JSON.stringify(children[1]));
   console.log("Reading time is ....", stats);
   return (
      <p className='inline-flex mt-1'>
         <IoMdTime className='h-full mt-0.5' />{" "}
         <span className='ml-2'>
            <Accent className='text-md'>{stats.text}</Accent>
         </span>
      </p>
   );
};

export default ReadTime;
