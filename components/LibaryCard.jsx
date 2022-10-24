import React from "react";
import constants from "../lib/constants";
import moment from "moment";
import clsx from "clsx";

const LibaryCard = ({ libary }) => {
   return (
      <div
         key={libary.slug}
         className={clsx(libary.inPreparation ? "text-slate-600 pointer-events-none bg-blend-hard-light bg-neutral-800 " :
         "text-white transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow",
         "w-full  py-3 px-2 text-white  shadow-lg shadow-neutral-800 rounded-md border border-gray-600 dark:bg-dark dark:border-gray-600 transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow overflow-hidden")}
         >
         <a href={`/libary/${libary.slug}`}>
         <div  className={clsx(libary.inPreparation ? " bg-gradient-to-r from-lime-500 to-teal-600 origin-top float-right mt-9 mr-9 w-52 text-center text-slate-200" : "block-hidden")} style={{transform:"translateX(50%) rotate(45deg)"}} >
                    <div className="text-sm p-1">Comming soon</div>
                </div>
            <div className='px-3 my-3 '>
               <h1 className='text-lg font-semibold'> {libary.title}</h1>
               <div className='mt-3 text-slate-400 '>
                  {" "}
                  <p className='align-middle font-bold text-slate-400 mt-1'>
                     {moment(libary.publishedAt).format("MMMM DD, YYYY")}
                  </p>
                  <div className=' text-slate-400 text-sm flex mt-3'>
                     {libary.technologies.map((techIcon) =>
                        constants.generateIcon(techIcon)
                     )}
                  </div>
                  <p className=' text-slate-400 text-sm italic mt-3'>
                     {libary.description}
                  </p>
               </div>
            </div>
         </a>
      </div>
   );
};

export default LibaryCard;
