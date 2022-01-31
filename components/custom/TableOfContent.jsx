import React from "react";

const TableOfContent = ({ toc }) => {
   return (
      <div className='lg:my-28 ml-5 sticky top-40'>
         <h1 className='text-white text-2xl font-bold'>Table of content</h1>
         <ul>
            {toc.map((item, index) => (
               <>
                  <li className='my-1 text-slate-400'>
                     <a
                        href={item.link}
                        className='font-medium text-lg font-semibold'>
                        {index + 1}. {item.title}
                     </a>
                  </li>
                  {item.subheading.map((subhead, index) => (
                     <li className='pl-5 text-slate-500'>
                        <a href={subhead.link} className='font- pr-5'>
                           {subhead.title}
                        </a>
                     </li>
                  ))}
               </>
            ))}
         </ul>
      </div>
   );
};

export default TableOfContent;
