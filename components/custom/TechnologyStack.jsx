import React from "react";

import constants from "../../lib/constants";
import ReactTooltip from "react-tooltip";

const BEtechArray = constants.BEtechArray,
   FEtechArray = constants.FEtechArray,
   ideOstechArray = constants.ideOstechArray;

const TechnologyStack = () => {
   return (
      <div>
         {" "}
         <h2 className='mb-3'>
            {" "}
            Backend frameworks and services I preffer and mostly use{" "}
         </h2>
         <span className='flex'>
            {BEtechArray.map((tech, index) => (
               <div className='h-12 mb-3 gap-5 text-white text-3xl mr-3'>
                  <tech.icon data-tip data-for={tech.name} />

                  <ReactTooltip
                     id={tech.name}
                     type='dark'
                     className='absolute bg-neutral-700'>
                     <h1>Name: {tech.name}</h1>
                     <p>Descripton: {tech.desc}</p>
                  </ReactTooltip>
               </div>
            ))}
         </span>
         <h2 className='mb-3'>
            {" "}
            Frontend and hybrid mobile frameworks I preffer and mostly use :
         </h2>
         <span className='flex'>
            {FEtechArray.map((tech, index) => (
               <div className='h-12 mb-3 gap-5 text-white text-3xl mr-3'>
                  <tech.icon data-tip data-for={tech.name} />

                  <ReactTooltip
                     id={tech.name}
                     type='dark'
                     className='absolute bg-neutral-700'>
                     <h1>Name: {tech.name}</h1>
                     <p>Descripton: {tech.desc}</p>
                  </ReactTooltip>
               </div>
            ))}
         </span>
         <h2 className='mb-3'> IDEs and OS I preffer and mostly use :</h2>
         <span className='flex'>
            {ideOstechArray.map((tech, index) => (
               <div className='h-12 mb-3 gap-5 text-white text-3xl mr-3'>
                  <tech.icon data-tip data-for={tech.name} />

                  <ReactTooltip
                     id={tech.name}
                     type='dark'
                     className='absolute bg-neutral-700'>
                     <h1>Name: {tech.name}</h1>
                     <p>Descripton: {tech.desc}</p>
                  </ReactTooltip>
               </div>
            ))}
         </span>
      </div>
   );
};

export default TechnologyStack;
