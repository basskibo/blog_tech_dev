import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoStar, GoOrganization, GoEye, GoRepoForked } from "react-icons/go";
import { SiGithub } from "react-icons/si";
import moment from "moment";

const GithubCardProfile = ({ children }) => {
   const [repository, setRepository] = useState(null);

   useEffect(() => {
      const url = `https://api.github.com/repos/${children}`;
      const fetchData = async () => {
         try {
            const response = await axios.get(
               url
               // , {
               // 	headers: {
               // 		Authorization: "token 6888b5336f1fbc75edb8de9961846462e0e1c218",
               // 	},
               // }
            );

            setRepository(response.data);
         } catch (error) {
            console.log("error", error);
         }
      };

      fetchData();
   }, []);

   return (
      <div className='container mt-3 lg:mt-10  w-1/1  lg:w-2/3'>
         <p className='my-3'>
            You can check the code directly in the github repository
         </p>
         {repository ? (
            <div className='border border-neutral-600 rounded bg-neutral-800'>
               <a href={repository.html_url} target='_blank' rel='noreferrer'>
                  <div className='relative ...'>
                     <div className='absolute h-32 w-32 -left-2 -top-2 ...'>
                        <SiGithub className='' />
                     </div>
                  </div>
                  <p className='text-blue-500 font-bold text-xl inline-flex p-3'>
                     {/* <SiGithub className='' />  */}
                     {repository.name}
                  </p>
                  {/* <div>
                     <img
                        alt='profile avatar'
                        // layout="fill"
                        // width="50" height="50"
                        src={repository.owner.avatar_url}
                        className='w-full h-40 lg:h-64 border border-gray-400'
                     />
                  </div> */}
                  <div className=' p-2'>
                     {/* <FiMapPin className='h-full mt-0.1 inline-flex' />{" "} */}
                     <span className='font-normal'>
                        {repository.description}
                     </span>
                  </div>
                  <div
                     className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2
                   sm:grid-cols-2 gap-1 p-2'>
                     <span className=''>
                        <GoStar className='h-full mt-0.1 inline-flex' />
                        <b>{repository.stargazers_count}</b>
                     </span>
                     <span className=''>
                        <GoRepoForked className='h-full mt-0.1 inline-flex' />{" "}
                        <b>{repository.forks_count}</b>
                     </span>
                     <span className=''>
                        <GoEye className='h-full mt-0.1 inline-flex' />{" "}
                        <b>{repository.watchers}</b>
                     </span>
                     <span>
                        <GoOrganization className='h-full mt-0.1 inline-flex' />{" "}
                        <b>{repository.subscribers_count}</b>
                     </span>
                  </div>
                  {/* <div className='grid xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 p-2'>
                     <span className='mr-3'>
                        <GoStar className='h-full mt-0.1 inline-flex' /> Stars:{" "}
                        <b>{repository.stargazers_count}</b>
                     </span>
                     <span className='mr-3'>
                        <GoRepoForked className='h-full mt-0.1 inline-flex' />{" "}
                        Forks: <b>{repository.forks_count}</b>
                     </span>
                     <span className='mr-3'>
                        <GoEye className='h-full mt-0.1 inline-flex' />{" "}
                        Watchers: <b>{repository.watchers}</b>
                     </span>
                     <span>
                        <GoOrganization className='h-full mt-0.1 inline-flex' />{" "}
                        Subscribers: <b>{repository.subscribers_count}</b>
                     </span>
                  </div> */}
                  <div className='grid  lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2'>
                     <span className=''>
                        Language: <b> {repository.language}</b>
                     </span>
                     <span className='italic'>
                        Updated {moment(repository.updated_at).fromNow()}
                     </span>
                  </div>
                  {/* <div class='relative h-32 w-32 ...'>
                     <div class=' bottom-0 right-0 h-16 w-16 ...'>
                        <SiGithub />{" "}
                     </div>
                  </div> */}

                  {/* <div className='  mt-1'>
                     <RiGitRepositoryCommitsLine className='h-full mt-0.1 inline-flex' />{" "}
                     <span className='mx-3'>
                        Public repositories <b>{profile.public_repos}</b>
                     </span>
                  </div>
                  <div className='  mt-1'>
                     <RiGitRepositoryPrivateLine className='h-full mt-0.1 inline-flex' />{" "}
                     <span className='mx-3'>
                        Private repositories{" "}
                        <b>{profile.total_private_repos || 6}</b>
                     </span>
                  </div> */}
               </a>
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default GithubCardProfile;
