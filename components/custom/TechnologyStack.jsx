import React from "react";
import {
   SiJenkins,
   SiJavascript,
   SiMarkdown,
   SiMongodb,
   SiNextdotjs,
   SiNodedotjs,
   SiNotion,
   SiRedis,
   SiReact,
   SiDocker,
   SiAmazonaws,
   SiTailwindcss,
   SiTypescript,
} from "react-icons/si";

const TechnologyStack = () => {
   return (
      <div>
         {" "}
         <h3 className='mb-3'> Technology Stack I mostly use : </h3>
         <p className='flex flex-inline h-12 mb-10 gap-5 text-white text-3xl'>
            <SiNodedotjs />
            <SiAmazonaws />
            <SiNextdotjs />

            <SiDocker />
            <SiReact />
            <SiMongodb />
            <SiRedis />

            <SiJenkins />
         </p>
      </div>
   );
};

export default TechnologyStack;
