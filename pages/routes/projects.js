import Accent from "../../components/custom/Accent";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { motion } from "framer-motion";
// import { GithubCard } from "github-user-repo-card";

import "react-loading-skeleton/dist/skeleton.css";
const Projects = () => {
   return (
      <div className='container mx-auto my-10 px-3 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
         <div className='my-10'>
            <h1 className='mb-5'>
               <Accent className='font-extrabold text-5xl'>Projects</Accent>
            </h1>
            <p className='display-4 '>Showcase of my works on my projects</p>
            <p className=''>
               This projects consists of backend, frontend and devops parts{" "}
            </p>
         </div>
         {/* <GithubCard /> */}
         {/* <iframe
				style='border: 1px solid rgba(0, 0, 0, 0.1)'
				width='640'
				height='480'
				src='https://framer.com/embed/Smart-Components--azBkgRvY174PZLDhxFuX/Kz5wfC2Wk?highlights=0'
				allowfullscreen
			></iframe> */}

         {/* <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-14 '>
				<div className='bg-sky-800 h-56 '>
					<h3>Title</h3>01
				</div> */}
         <motion.div animate={{ y: [190, 0, 0] }} transition={{ duration: 2 }}>
            <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-14 '>
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
               <Skeleton baseColor='#202020' highlightColor='#444' count={6} />
            </div>
            \
         </motion.div>
      </div>

      // </div>
   );
};
export default Projects;
