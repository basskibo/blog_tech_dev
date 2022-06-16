import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiMapPin } from "react-icons/fi";
import {
   RiGitRepositoryCommitsLine,
   RiGitRepositoryPrivateLine,
} from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { IoStarOutline } from "react-icons/io5";
import { GoStar, GoPerson, GoEye, GoRepoForked } from "react-icons/go";
import Image from "next/image";
import moment from "moment";

const GithubCardProfile = ({ children }) => {
   console.log(children);
   const [repository, setRepository] = useState(null);

   useEffect(() => {
      const url = `https://api.github.com/repos/${children}`;
      const fetchData = async () => {
         try {
            // const profileInLocaleStorage = localStorage.getItem("profile");
            // let profileFetched;
            // if (!profileInLocaleStorage) {
            const response = await axios.get(
               url
               // , {
               // 	headers: {
               // 		Authorization: "token 6888b5336f1fbc75edb8de9961846462e0e1c218",
               // 	},
               // }
            );
            console.log("response");
            console.log(response);
            // localStorage.setItem("profile", JSON.stringify(response.data));
            // profileFetched = response.data;
            console.log(response);
            // } else {
            //    profileFetched = JSON.parse(profileInLocaleStorage);
            // }
            setRepository(response.data);
         } catch (error) {
            console.log("error", error);
         }
      };

      //   const existingRepo = window.localStorage.getItem("github_profile");

      //   if (!existingProfile) {
      fetchData();
      //   } else {
      //      setProfile(existingProfile);
      //   }
   }, []);

   return (
      <div className='container mt-3 lg:mt-10 rounded-lg w-1/1 lg:w-1/2 '>
         <p className='my-3'>
            You can check the code directly in the github repository
         </p>
         {repository ? (
            <div className='border border-neutral-600 bg-neutral-800'>
               <a href={repository.html_url} target='_blank' rel='noreferrer'>
                  <p className='text-cyan-500 font-extrabold text-2xl inline-flex p-3'>
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
                     <span className='italic'>{repository.description}</span>
                  </div>
                  <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 p-2'>
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
                        <GoPerson className='h-full mt-0.1 inline-flex' />{" "}
                        Subscribers: <b>{repository.subscribers_count}</b>
                     </span>
                  </div>
                  <div className='grid  lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-2'>
                     <span className=''>
                        Language: <b> {repository.language}</b>
                     </span>
                     <span className=''>
                        Updated{" "}
                        <b> {moment(repository.updated_at).fromNow()}</b>
                     </span>
                  </div>

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
