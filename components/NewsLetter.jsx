import React, {useState, Fragment } from "react";
import Accent from "./custom/Accent";
import { Dialog, Transition } from '@headlessui/react'

const NewsLetter = () => {
   let [isOpen, setIsOpen] = useState(false);
   const [email, setemail] = useState("");
   const [validationError, setValidationError ] = useState(false);

   function closeModal() {
      setemail("")
      setIsOpen(false)
   }
 
   function openModal() {
      let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
      if(regex.test(email)){
         setIsOpen(true)
         setValidationError(false)
          console.log("mejl je dobar")
      }else{
         console.log("mejl nije dobar")
         setValidationError(true)
      }
   }

   function handleChange(e) {
      console.log(e.target.value)
      setemail(e.target.value)
      // setIsOpen(true)
    }
 

   return (
      <div className=' '>
         <div className=' xl:w-2/3 md:w-3/3 sm:w-3/3 mx-auto relative border bg-neutral-900 border-neutral-700 grid grid-cols-1 lg:grid-cols-2 gap-10  p-10 lg:p-[60px] rounded-2xl'>
            <div>
               <h3 className='text-white text-4xl font-semibold'>
                  <Accent> Sign up for newsletter</Accent>
               </h3>

               <p className='text-sm text-white mt-4'>
                  if you liked what you read and want to read a lot of similar
                  content, subscribe to the mailing list and receive an email on
                  a weekly/monthly basis.
               </p>
            </div>

            <div>
               <div className='flex items-stretch'>
                  {/* <input
                     type='email'
                     placeholder='Enter your email'
                     className='px-4 w-full bg-neutral-900 rounded-md border-gray-300 ring ring-gray-500 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  /> */}
                  <input
                     className=' w-4/4 my-3 bg-neutral-900 text-white  px-3 py-2 rounded-md
					border border-slate-600 focus:border-lime-600 flex-grow focus:outline-none cursor-text'
                     placeholder='Enter your email'
                     value={email}
                     onChange={handleChange}
                     type='email'
                     // onChange={handleSearchChange}
                  />
                  <button
                     type="button"
                     onClick={openModal}
                     disabled={!email}
                     className=' ml-2 p-2 w-4/4 my-3 rounded-md  shadow-md  shadow-neutral-700
                  hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500'>
                     Subscribe
                  </button>
               </div>

                  {validationError ? <p className='text-red-700 mt-2 font-semibold  text-md'>
                  Email format is wrong, please try again
               </p> :<></>}
              
            </div>
         </div>
         <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md	" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900  border border-neutral-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Subscription successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-400">
                      Your subscription has been successfully submitted for email <b>{email}</b>. We strive to fight against data and privacy abuse, so please confirm your email. 
                    </p>
                  </div>

                  <div className="mt-4">
                     <span className="bg-gradient-to-r p-[2px]  from-[#7928ca] to-[#ff0080]">
                     <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-neutral-900 text-sm text-white p-3"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                     </span>
                 
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>
   );
};

export default NewsLetter;
