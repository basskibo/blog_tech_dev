import { FaBeer } from "react-icons/fa";
import Accent from "../../components/custom/Accent";
import TechnologyStack from "../../components/custom/TechnologyStack";
import Image from "next/image";
import Link from "next/link";
import { SiPatreon, SiBuymeacoffee } from "react-icons/si";
import cvImage from "../../public/images/cv.jpg";
import constants from "../../lib/constants";
const Bio = () => {
   return (
      <div className='container mx-auto my-14 px-3 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
         <div className='my-10'>
            <div className=' px-5 py-3 mb-10 border-b border-gray-400'>
               <h1 className='mb-5'>
                  <Accent className='font-extrabold text-6xl'>About</Accent>
               </h1>
               <p className='mb-5'>
                  Adipisicing sunt veniam do non consequat commodo sint nisi
                  aliquip ad non cillum nisi. Id ipsum mollit ad velit tempor
                  laboris. Aute non dolore adipisicing sint dolore nisi
                  excepteur occaecat. Elit duis enim duis dolor tempor enim est
                  labore occaecat. Exercitation laborum occaecat elit culpa esse
                  excepteur.Cupidatat duis in nulla eu eu. Magna laboris fugiat
                  excepteur in elit qui irure sit aliquip. Dolore adipisicing
                  laborum sunt fugiat enim occaecat reprehenderit cupidatat
                  irure laborum et id dolore.
               </p>
               <p className='mb-10'>
                  If you like what I do,in order to be updated with latest posts
                  and to vote for new content please feel free to donate
                  whatever amount you like. Possible options are{" "}
                  <a
                     href='https://www.buymeacoffee.com/basskibo'
                     target='_blank'
                     rel='noreferrer'
                     className='text-lime-500 underline decoration-dotted decoration-2	decoration-sky-400
                      underline-offset-4 link link-underline link-underline-black hover:no-underline '>
                     <Accent>Buy me a coffee </Accent>
                  </a>
                  or
                  <a
                     href='https://www.patreon.com/bePatron?u=67759634'
                     data-patreon-widget-type='become-patron-button'
                     className='text-lime-500 underline decoration-dotted decoration-2	decoration-sky-400 underline-offset-4 
                     link link-underline link-underline-black hover:no-underline'>
                     {" "}
                     <Accent>Become a Patron! </Accent>
                  </a>
               </p>
               <TechnologyStack />
            </div>
            <h1 className='mb-5'>
               <Accent className='text-3xl font-semibold'>
                  {" "}
                  Work Timeline
               </Accent>{" "}
            </h1>

            <div className='grid gap-6 row-gap-10 lg:grid-cols-2'>
               <ol className='relative border-l border-gray-200 dark:border-gray-700'>
                  <li className='ml-4 mb-10'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        March 2017 ~ Present
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        OBLO Living
                     </h3>
                     <h2 className='py-1'>Full stack developer, DevOps </h2>

                     <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                        <ul className='list-disc pl-5'>
                           <li>
                              Project: Developing flexible, secure, highly
                              available (HA) and scalable cloud service for
                              various IoT applications.
                           </li>
                           <li>
                              Description: Working on cloud integration of smart
                              devices using Zigbee, Z Wave and Wise protocol,
                              scalability of the system in order to support more
                              than 1milion mqtt clients (devices) with 100
                              thousand of docker containers which are IOT
                              virtual device gateway , maximizing application
                              efficiency, data quality, scope, operability, and
                              flexibility. Setting up new environments and
                              working with multiple EMQX brokers, rabbitMQ and
                              Redis clusters, MongoDB replication, making HA
                              systems and ensuring high level of operational
                              performance. Involved in writing SOW, WBS and
                              designing new features.
                           </li>
                           <li>
                              Key technologies used: MEAN stack (MongoDB,
                              Express, AngularJs, Nodejs), React, MQTT broker(
                              EMQX and mosca), NGINX, Docker,, Redis, RabbitMQ,
                              Kafka, AWS services , Jenkins, Zabbix , Ansible,
                              NFS/EFS
                           </li>
                        </ul>
                     </p>
                  </li>
                  <li className='ml-4 mb-10'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        March 2016 ~ October 2017
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        Iguana Development
                     </h3>
                     <h2 className='py-1'>CEO, Full stack developer </h2>

                     <p className='text-base mb-4  font-normal text-gray-500 dark:text-gray-400'>
                        <ul className='list-disc pl-5'>
                           <li>
                              {" "}
                              Project: Mass multiplayer event entertainment
                              platform
                           </li>
                           <li>
                              Description: Working on development of a web
                              platform that enables the audience on sports arena
                              to participate in real time events/games. Involved
                              in architecture structure, scalability and
                              performance due to high load of websocket
                              connections.
                           </li>
                           <li>
                              Key technologies used are Nodejs, SailsJs, MongoDB
                              , Websockets (socket.io), AngularJS, AWS EC2, AWS
                              S3
                           </li>
                        </ul>
                     </p>
                     <a
                        href='#'
                        className='inline-flex items-center py-2  px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                        See project{" "}
                        <svg
                           className='ml-2 w-3 h-3'
                           fill='currentColor'
                           viewBox='0 0 20 20'
                           xmlns='http://www.w3.org/2000/svg'>
                           <path
                              fillRule='evenodd'
                              d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                              clipRule='evenodd'></path>
                        </svg>
                     </a>
                  </li>
                  <li className='mb-10 ml-4'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        June 2016 ~ Oct March 2017
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        Ploush GmbH
                     </h3>
                     <h2 className='py-1'>Full stack developer </h2>

                     <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                        <ul className='list-disc pl-5'>
                           <li>
                              {" "}
                              Project: Mass multiplayer event entertainment
                              platform
                           </li>
                           <li>
                              Description: Working on development of a web
                              platform that enables the audience on sports arena
                              to participate in real time events/games. Involved
                              in architecture structure, scalability and
                              performance due to high load of websocket
                              connections.
                           </li>
                           <li>
                              Key technologies used are Nodejs, SailsJs, MongoDB
                              , Websockets (socket.io), AngularJS, AWS EC2, AWS
                              S3
                           </li>
                        </ul>
                     </p>
                  </li>
                  <li className='mb-10 ml-4'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        April 2015 ~ June 2016
                     </time>
                     <h3 className='text-lg font-semibold text-white'>
                        Greensoft Ltd
                     </h3>
                     <h2 className='py-1'>
                        Full stack developer, hybrid mobile development{" "}
                     </h2>
                     <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
                        <ul className='list-disc pl-5'>
                           <li>
                              Project: Software solution specialized in managing
                              agriculture production processes and all types of
                              lands, Mobile agro solutions{" "}
                           </li>
                           <li>
                              Description: Develop, maintain and support
                              web/mobile application for Agronomists and owners
                              of agriculture households. Analyze code for system
                              testing and debugging, isolate and rectify issues.
                              Developed full-stack web applications which
                              processed, analyzed, and rendered data visually
                              using GIS.
                           </li>
                           <li>
                              Assignments: Implementation, unit tests,
                              documentation, user manuals, deployment on AWS ●
                              Technologies: Nodejs, KrakenJs, React Native,
                              Sencha, Sencha Touch, PostgresQL
                           </li>
                        </ul>
                     </p>
                  </li>
               </ol>

               <div className='relative'>
                  <Image
                     className='inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full'
                     src={cvImage}
                     blurDataURL={constants.imageBlogURI}
                     placeholder='blur'
                     layout='fill'
                     alt='Photo by <a href="https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shubham Dhage</a> on <a href="https://unsplash.com/t/3d-renders?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Bio;
