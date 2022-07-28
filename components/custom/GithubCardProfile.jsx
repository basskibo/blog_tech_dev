import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiMapPin } from "react-icons/fi";
import {
   RiGitRepositoryCommitsLine,
   RiGitRepositoryPrivateLine,
} from "react-icons/ri";
import { SiGithub } from "react-icons/si";

const GithubCardProfile = () => {
   const [profile, setProfile] = useState(null);

   useEffect(() => {
      const url = "https://api.github.com/users/basskibo";

      const fetchData = async () => {
         try {
            const profileInLocaleStorage = localStorage.getItem("profile");
            let profileFetched;
            if (!profileInLocaleStorage) {
               const response = await axios.get(
                  url
                  // , {
                  // 	headers: {
                  // 		Authorization: "token 6888b5336f1fbc75edb8de9961846462e0e1c218",
                  // 	},
                  // }
               );
               localStorage.setItem("profile", JSON.stringify(response.data));
               profileFetched = response.data;
            } else {
               profileFetched = JSON.parse(profileInLocaleStorage);
            }
            setProfile(profileFetched);
         } catch (error) {
            console.log("error", error);
         }
      };

      const existingProfile = window.localStorage.getItem("github_profile");

      if (!existingProfile) {
         fetchData();
      } else {
         setProfile(existingProfile);
      }
   }, []);

   return (
      <div
         className='container  border border-neutral-600 p-5 rounded-lg'
         style={{ backgroundColor: "#22272E", color: "#768390" }}>
         {profile ? (
            <div>
               <a href={profile.html_url} target='_blank' rel='noreferrer'>
                  <p
                     className=' font-extrabold text-xl mb-3 inline-flex'
                     style={{ color: "#539BF5" }}>
                     {/* <SiGithub className='' />  */}@{profile.login}
                  </p>
                  <div>
                     <img
                        alt='profile avatar'
                        // layout="fill"
                        // width="50" height="50"
                        src={profile.avatar_url}
                        className='w-full h-40 border border-gray-400'
                     />
                  </div>

                  <div className='  mt-1'>
                     <FiUsers className='h-full mt-0.1 inline-flex' />{" "}
                     <span className='mx-3'>
                        Following <b>{profile.following}</b>
                     </span>
                     <span>
                        Followers <b>{profile.followers}</b>
                     </span>
                  </div>
                  <div className='  mt-1'>
                     <FiMapPin className='h-full mt-0.1 inline-flex' />{" "}
                     <span className='mx-3'>{profile.location}</span>
                  </div>
                  <div className='  mt-1'>
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
                  </div>
               </a>
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default GithubCardProfile;
