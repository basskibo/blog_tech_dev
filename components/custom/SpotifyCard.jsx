import React, { useState, useEffect, ComponentDidMount } from "react";
import axios from "axios";
import { SiSpotify } from "react-icons/si";
import Accent from "./Accent";

const fetchCurent = async () => {
   const url = `/api/spotify`;
   const result = await axios(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   });
   return result.data;
};

const SpotifyCard = () => {
   const [song, setSong] = useState({});
   const [seconds, setSeconds] = useState(1000);

   useEffect(() => {
      const interval = setInterval(() => {
         fetchCurent().then((result) => setSong(result));
         setSeconds(15000);
      }, seconds);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className='text-slate-400 bg-neutral-900 border border-neutral-600 rounded-lg w-7/8'>
         <a
            target='_blank'
            rel='noreferrer'
            href={
               song?.isPlaying
                  ? song.songUrl
                  : "https://open.spotify.com/user/4g1ztvqi3z5mf0uqx87bz9exk"
            }
            className='relative flex  items-center space-x-2 py-4 pl-2 transition-shadow hover:shadow-md'>
            <div className='w-18'>
               {song?.isPlaying ? (
                  <img
                     className='w-12 shadow-sm'
                     src={song?.albumImageUrl}
                     alt={song?.album}
                  />
               ) : (
                  <SiSpotify size={64} color={"#1ED760"} />
               )}
            </div>

            <div className='flex-1'>
               <p className='component text-xs'>
                  {song?.isPlaying ? "Currently listening:" : ""}
               </p>
               <p className='component font-bold text-md w-48 lg:w-72 truncate'>
                  {song?.isPlaying ? (
                     <Accent>{song.title}</Accent>
                  ) : (
                     "Not Listening"
                  )}
               </p>
               <p className='font-dark text-sm text-semibold'>
                  {song?.isPlaying ? `Artist: ${song.artist}` : "Spotify"}
               </p>
               <p className='font-dark text-xs text-semibold truncate'>
                  {song?.isPlaying ? `Album: ${song.album}` : ""}
               </p>
            </div>
            <div className='absolute right-1.5 top-1.5'>
               <SiSpotify size={20} color={"#1ED760"} />
            </div>
         </a>
      </div>
   );
};

export default SpotifyCard;
