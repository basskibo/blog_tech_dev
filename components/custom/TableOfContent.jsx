import React from "react";

import Link from "next/link";
import AnchorLink from "react-anchor-link-smooth-scroll";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const anchorOffset = 75;
const TableOfContent = ({ toc }) => {
   return (
      <div className='lg:my-28 ml-5 mb-5 sticky top-40'>
         <h1 className='text-white text-2xl font-bold mb-3'>
            Table of content
         </h1>
         <ul>
            {toc.map((item, index) => (
               <>
                  <li className='my-1 text-slate-400' key={Math.random()}>
                     <AnchorLink
                        key={Math.random()}
                        offset={() => anchorOffset}
                        href={item.link}
                        className='font-medium text-lg font-semibold hover:cursor-pointer hover:text-white hover:underline'>
                        {index + 1}. {item.title}
                     </AnchorLink>
                  </li>
                  {item.subheading.map((subhead, index) => (
                     <li className='pl-5 text-slate-500 ' key={Math.random()}>
                        <AnchorLink
                           key={Math.random()}
                           offset={() => anchorOffset}
                           href={subhead.link}
                           className='font- pr-5 hover:text-white'>
                           {subhead.title}
                        </AnchorLink>
                     </li>
                  ))}
               </>
            ))}
         </ul>
      </div>
   );
};

export default TableOfContent;
