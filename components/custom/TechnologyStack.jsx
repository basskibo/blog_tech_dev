import React from "react";

const TechnologyStack = () => {
   return (
      <div>
         {" "}
         <h3 className='mb-3'> Technology Stack I mostly use : </h3>
         <p className='flex flex-inline h-12 mb-10 gap-5 text-white'>
            <svg viewBox='0 0 128 128'>
               <path
                  fill='#83CD29'
                  d='M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z'></path>
            </svg>

            <svg viewBox='0 0 128 128'>
               <g fill='#61DAFB'>
                  <circle cx='64' cy='64' r='11.4'></circle>
                  <path d='M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z'></path>
               </g>
            </svg>
            <svg viewBox='0 0 128 128'>
               <path
                  fill='#F7A80D'
                  d='M38.089 77.466l-11.4 4.896 10.559 4.514 12.241-4.514-11.4-4.896zm-17.138 6.12l-.382 22.034 16.679 7.345V90.089l-16.297-6.503zm34.276 0l-15.073 5.739V110.9l15.073-6.121V83.586zm17.979-68.551L61.73 19.931l10.635 4.515 12.241-4.515-11.4-4.896zm-15.914 6.503v22.034l14.231 4.132.459-20.046-14.69-6.12zm31.828 1.224L75.654 28.5v21.652l13.466-6.121V22.762zM19.306 46.047L7.907 50.944l10.558 4.514 12.241-4.514-11.4-4.897zM2.168 52.168l-.382 22.034 16.679 7.345V58.671L2.168 52.168zm34.275 0l-15.071 5.738V79.48l15.071-6.12V52.168zm19.587-6.937l-11.4 4.897 10.558 4.514 12.241-4.514-11.399-4.897zm-17.137 6.121l-.383 22.035 16.679 7.345V57.855l-16.296-6.503zm34.275 0L58.096 57.09v21.576l15.072-6.121V51.352zm35.908-36.317l-11.399 4.896 10.559 4.515 12.241-4.515-11.401-4.896zm-17.137 6.121l-.382 22.034 16.679 7.344V27.658l-16.297-6.502zm34.275 0l-15.071 5.738v21.575l15.071-6.12V21.156z'></path>
            </svg>
            <svg viewBox='0 0 128 128'>
               <path d='M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z'></path>
            </svg>
            <svg viewBox='0 0 128 128'>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#3A4D54'
                  d='M73.8 50.8h11.3v11.5h5.7c2.6 0 5.3-.5 7.8-1.3 1.2-.4 2.6-1 3.8-1.7-1.6-2.1-2.4-4.7-2.6-7.3-.3-3.5.4-8.1 2.8-10.8l1.2-1.4 1.4 1.1c3.6 2.9 6.5 6.8 7.1 11.4 4.3-1.3 9.3-1 13.1 1.2l1.5.9-.8 1.6c-3.2 6.2-9.9 8.2-16.4 7.8-9.8 24.3-31 35.8-56.8 35.8-13.3 0-25.5-5-32.5-16.8l-.1-.2-1-2.1c-2.4-5.2-3.1-10.9-2.6-16.6l.2-1.7h9.6V50.8h11.3V39.6h22.5V28.3h13.5v22.5z'></path>
               <path
                  fill='#00AADA'
                  d='M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5 1.1-8.3 1.3h-.6c-1.3.1-2.7.1-4.2.1-1.6 0-3.1 0-4.9-.1 6 6.8 15.4 10.8 27.2 10.8 25 0 46.2-11.1 55.5-35.9 6.7.7 13.1-1 16-6.7-4.5-2.7-10.5-1.8-13.9-.1z'></path>
               <path
                  fill='#28B8EB'
                  d='M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7h-68c-.3 9.5 3.2 16.7 9.5 21 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4l-.1-.1c8.5 4.4 20.8 4.3 35-1.1 15.8-6.1 30.6-17.7 40.9-30.9-.2.1-.4.1-.5.2z'></path>
               <path
                  fill='#028BB8'
                  d='M18.7 71.8c.4 3.3 1.4 6.4 2.9 9.3l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4h-.4c-1.3.1-2.7.1-4.1.1-1.6 0-3.2 0-4.9-.1 6 6.8 15.5 10.8 27.3 10.8 21.4 0 40-8.1 50.8-26H18.7v-.1z'></path>
               <path
                  fill='#019BC6'
                  d='M23.5 71.8c1.3 5.8 4.3 10.4 8.8 13.5 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.6 1.4 8.5 4.4 20.8 4.3 34.9-1.1 8.5-3.3 16.8-8.2 24.2-14.1H23.5z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#00ACD3'
                  d='M28.4 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm3-12h9.8v9.8h-9.8v-9.8zm.9.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#23C2EE'
                  d='M39.6 52.7h9.8v9.8h-9.8v-9.8zm.9.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#00ACD3'
                  d='M50.9 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#23C2EE'
                  d='M50.9 41.5h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm3.1 10.4H72v9.8h-9.8v-9.8zm.8.8h.8v8.1H63v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#00ACD3'
                  d='M62.2 41.5H72v9.8h-9.8v-9.8zm.8.8h.8v8.1H63v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#23C2EE'
                  d='M62.2 30.2H72V40h-9.8v-9.8zm.8.8h.8v8.1H63V31zm1.5 0h.8v8.1h-.8V31zm1.4 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#00ACD3'
                  d='M73.5 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#D4EEF1'
                  d='M48.8 78.3c1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#3A4D54'
                  d='M48.8 79.1c.2 0 .5 0 .7.1-.2.1-.4.4-.4.7 0 .4.4.8.8.8.3 0 .6-.2.7-.4.1.2.1.5.1.7 0 1.1-.9 1.9-1.9 1.9-1.1 0-1.9-.9-1.9-1.9 0-1 .8-1.9 1.9-1.9M1.1 72.8h125.4c-2.7-.7-8.6-1.6-7.7-5.2-5 5.7-16.9 4-20 1.2-3.4 4.9-23 3-24.3-.8-4.2 5-17.3 5-21.5 0-1.4 3.8-21 5.7-24.3.8-3 2.8-15 4.5-20-1.2 1.1 3.5-4.9 4.5-7.6 5.2'></path>
               <path
                  fill='#BFDBE0'
                  d='M56 97.8c-6.7-3.2-10.3-7.5-12.4-12.2-2.5.7-5.5 1.2-8.9 1.4-1.3.1-2.7.1-4.1.1-1.7 0-3.4 0-5.2-.1 6 6 13.6 10.7 27.5 10.8H56z'></path>
               <path
                  fill='#D4EEF1'
                  d='M46.1 89.9c-.9-1.3-1.8-2.8-2.5-4.3-2.5.7-5.5 1.2-8.9 1.4 2.3 1.2 5.7 2.4 11.4 2.9z'></path>
            </svg>
            <svg viewBox='0 0 128 128'>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#439934'
                  d='M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051-.169-24.252 1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#45A538'
                  d='M61.729 110.054c-1.69-1.453-3.439-2.842-5.059-4.37-8.717-8.222-15.093-17.899-18.233-29.566-.865-3.211-1.442-6.474-1.627-9.792-.13-2.322-.318-4.665-.154-6.975.437-6.144 1.325-12.229 3.127-18.147l.099-.138c.175.233.427.439.516.702 1.759 5.18 3.505 10.364 5.242 15.551 5.458 16.3 10.909 32.604 16.376 48.9.107.318.384.579.583.866l-.87 2.969z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#46A037'
                  d='M88.038 42.812c-1.384.206-2.768.403-4.149.616-3.131.485-6.263.968-9.392 1.465-2.622.417-5.242.852-7.862 1.281l-1.602.275-.012-1.045c-.053-.859-.144-1.717-.154-2.576-.069-5.478-.112-10.956-.18-16.434-.042-3.429-.105-6.857-.175-10.285-.043-2.13-.089-4.261-.185-6.388-.052-1.143-.236-2.28-.311-3.423-.042-.657.016-1.319.029-1.979.817 1.583 1.616 3.178 2.456 4.749 1.327 2.484 3.441 4.314 5.344 6.311 7.523 7.892 12.864 17.068 16.193 27.433z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#409433'
                  d='M65.036 80.753c.081-.026.222-.034.235-.08.491-1.682 1.996-1.431 3.212-1.641 3.432-.594 6.875-1.13 10.313-1.687 3.326-.539 6.652-1.081 9.981-1.604.394-.062.805-.011 1.208-.012-.622 2.22-1.112 4.488-1.901 6.647-.896 2.449-1.98 4.839-3.131 7.182a49.142 49.142 0 01-6.353 9.763c-1.919 2.308-4.058 4.441-6.202 6.548-1.185 1.165-2.582 2.114-3.882 3.161l-.337-.23-1.214-1.038-1.256-2.753a41.402 41.402 0 01-1.394-9.838l.023-.561.171-2.426c.057-.828.133-1.655.168-2.485.129-2.982.241-5.964.359-8.946z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#4FAA41'
                  d='M65.036 80.753c-.118 2.982-.23 5.964-.357 8.947-.035.83-.111 1.657-.168 2.485l-.765.289c-1.699-5.002-3.399-9.951-5.062-14.913-2.75-8.209-5.467-16.431-8.213-24.642a4498.887 4498.887 0 00-6.7-19.867c-.105-.31-.407-.552-.617-.826l4.896-9.002c.168.292.39.565.496.879a6167.476 6167.476 0 016.768 20.118c2.916 8.73 5.814 17.467 8.728 26.198.116.349.308.671.491 1.062l.67-.78-.167 10.052z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#4AA73C'
                  d='M43.155 32.227c.21.274.511.516.617.826a4498.887 4498.887 0 016.7 19.867c2.746 8.211 5.463 16.433 8.213 24.642 1.662 4.961 3.362 9.911 5.062 14.913l.765-.289-.171 2.426-.155.559c-.266 2.656-.49 5.318-.814 7.968-.163 1.328-.509 2.632-.772 3.947-.198-.287-.476-.548-.583-.866-5.467-16.297-10.918-32.6-16.376-48.9a3888.972 3888.972 0 00-5.242-15.551c-.089-.263-.34-.469-.516-.702l3.272-8.84z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#57AE47'
                  d='M65.202 70.702l-.67.78c-.183-.391-.375-.714-.491-1.062-2.913-8.731-5.812-17.468-8.728-26.198a6167.476 6167.476 0 00-6.768-20.118c-.105-.314-.327-.588-.496-.879l6.055-7.965c.191.255.463.482.562.769 1.681 4.921 3.347 9.848 5.003 14.778 1.547 4.604 3.071 9.215 4.636 13.813.105.308.47.526.714.786l.012 1.045c.058 8.082.115 16.167.171 24.251z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#60B24F'
                  d='M65.021 45.404c-.244-.26-.609-.478-.714-.786-1.565-4.598-3.089-9.209-4.636-13.813-1.656-4.93-3.322-9.856-5.003-14.778-.099-.287-.371-.514-.562-.769 1.969-1.928 3.877-3.925 5.925-5.764 1.821-1.634 3.285-3.386 3.352-5.968.003-.107.059-.214.145-.514l.519 1.306c-.013.661-.072 1.322-.029 1.979.075 1.143.259 2.28.311 3.423.096 2.127.142 4.258.185 6.388.069 3.428.132 6.856.175 10.285.067 5.478.111 10.956.18 16.434.008.861.098 1.718.152 2.577z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#A9AA88'
                  d='M62.598 107.085c.263-1.315.609-2.62.772-3.947.325-2.649.548-5.312.814-7.968l.066-.01.066.011a41.402 41.402 0 001.394 9.838c-.176.232-.425.439-.518.701-.727 2.05-1.412 4.116-2.143 6.166-.1.28-.378.498-.574.744l-.747-2.566.87-2.969z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#B6B598'
                  d='M62.476 112.621c.196-.246.475-.464.574-.744.731-2.05 1.417-4.115 2.143-6.166.093-.262.341-.469.518-.701l1.255 2.754c-.248.352-.59.669-.728 1.061l-2.404 7.059c-.099.283-.437.483-.663.722l-.695-3.985z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#C2C1A7'
                  d='M63.171 116.605c.227-.238.564-.439.663-.722l2.404-7.059c.137-.391.48-.709.728-1.061l1.215 1.037c-.587.58-.913 1.25-.717 2.097l-.369 1.208c-.168.207-.411.387-.494.624-.839 2.403-1.64 4.819-2.485 7.222-.107.305-.404.544-.614.812-.109-1.387-.22-2.771-.331-4.158z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#CECDB7'
                  d='M63.503 120.763c.209-.269.506-.508.614-.812.845-2.402 1.646-4.818 2.485-7.222.083-.236.325-.417.494-.624l-.509 5.545c-.136.157-.333.294-.398.477-.575 1.614-1.117 3.24-1.694 4.854-.119.333-.347.627-.525.938-.158-.207-.441-.407-.454-.623-.051-.841-.016-1.688-.013-2.533z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#DBDAC7'
                  d='M63.969 123.919c.178-.312.406-.606.525-.938.578-1.613 1.119-3.239 1.694-4.854.065-.183.263-.319.398-.477l.012 3.64-1.218 3.124-1.411-.495z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#EBE9DC'
                  d='M65.38 124.415l1.218-3.124.251 3.696-1.469-.572z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#CECDB7'
                  d='M67.464 110.898c-.196-.847.129-1.518.717-2.097l.337.23-1.054 1.867z'></path>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  fill='#4FAA41'
                  d='M64.316 95.172l-.066-.011-.066.01.155-.559-.023.56z'></path>
            </svg>
            <svg viewBox='0 0 128 128'>
               <path
                  fill='#A41E11'
                  d='M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.9-11.5 3.8-17.3 1S13 98.1 6.3 94.9c-3.3-1.6-5-2.9-5-4.2V78s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9v12.5c0 1.3-1.5 2.7-4.9 4.4z'></path>
               <path
                  fill='#D82C20'
                  d='M121.8 80.5C115.1 84 80.4 98.2 73 102.1c-7.4 3.9-11.5 3.8-17.3 1-5.8-2.8-42.7-17.7-49.4-20.9C-.3 79-.5 76.8 6 74.3c6.5-2.6 43.2-17 51-19.7 7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.9z'></path>
               <path
                  fill='#A41E11'
                  d='M121.8 72.5C115.1 76 80.4 90.2 73 94.1c-7.4 3.8-11.5 3.8-17.3 1C49.9 92.3 13 77.4 6.3 74.2c-3.3-1.6-5-2.9-5-4.2V57.3s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9V68c0 1.3-1.5 2.7-4.9 4.5z'></path>
               <path
                  fill='#D82C20'
                  d='M121.8 59.8c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1C49.9 79.6 13 64.7 6.3 61.5s-6.8-5.4-.3-7.9c6.5-2.6 43.2-17 51-19.7 7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.9z'></path>
               <path
                  fill='#A41E11'
                  d='M121.8 51c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1C49.9 70.9 13 56 6.3 52.8c-3.3-1.6-5.1-2.9-5.1-4.2V35.9s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9v12.5c.1 1.3-1.4 2.6-4.8 4.4z'></path>
               <path
                  fill='#D82C20'
                  d='M121.8 38.3C115.1 41.8 80.4 56 73 59.9c-7.4 3.8-11.5 3.8-17.3 1S13 43.3 6.3 40.1s-6.8-5.4-.3-7.9c6.5-2.6 43.2-17 51-19.7 7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.8z'></path>
               <path
                  fill='#fff'
                  d='M80.4 26.1l-10.8 1.2-2.5 5.8-3.9-6.5-12.5-1.1 9.3-3.4-2.8-5.2 8.8 3.4 8.2-2.7L72 23zM66.5 54.5l-20.3-8.4 29.1-4.4z'></path>
               <ellipse
                  fill='#fff'
                  cx='38.4'
                  cy='35.4'
                  rx='15.5'
                  ry='6'></ellipse>
               <path fill='#7A0C00' d='M93.3 27.7l17.2 6.8-17.2 6.8z'></path>
               <path fill='#AD2115' d='M74.3 35.3l19-7.6v13.6l-1.9.8z'></path>
            </svg>
            <svg viewBox='0 0 128 128'>
               <g fill='#fdfdfd'>
                  <path d='M62.8 124.3c-3.5-.402-3.8-.698-5.3-5.6-1.7-5.9-4.898-23.598-4.3-24.2 1.902-1.898 22.6-2.398 23.698-.602 1 1.5 2.602 29 1.801 29.801-.8.7-11.5 1.2-15.898.602zm0 0M81.602 117.8c-1.102-3.402-1.204-6.902-.403-7.5 1.403-.8 2.801 1.598 2.801 4.9 0 2.902-1.7 4.8-2.398 2.6zm0 0'></path>
                  <path d='M47 109.102c-3.602-1.102-8.8-3.903-9.5-5.102-.398-.602-.898-4.102-1.2-7.8-.3-3.7-1.402-10.098-2.5-14.2-1.1-4.102-2.198-8.398-2.5-9.5-.6-3 12-11.5 14.5-9.7.9.7 4.098 2.598 6.9 4.302 4.402 2.597 5.402 3.699 6.402 7.199.597 2.3 1.796 4.8 2.699 5.5.898.699 1.699 2.199 1.699 3.3C63.5 85 65.8 86.7 71 88.7c2 .801.5 1.102-7.3 1.7-5.302.402-10.2.402-10.802 0-.699-.399-.898-2.2-.699-4.297.301-2 .2-4.5-.3-5.602-.5-1.398-.797-.2-.797 3.602-.102 6.199-.704 7.5-2.903 5.597-1.3-1-1.398-.898-1 .301.301.8-.199 2-1.097 2.7-1.403 1.1-1.102 1.198 1.597 1.3 2.903 0 3.2.3 3.7 4 .3 2.2.902 5.8 1.203 8 .597 4.3-.102 4.7-5.602 3.102zm0 0M80.102 100c-.102-5.398.199-7 1.296-7 .903 0 1.801 1.898 2.5 5 1.403 6.7 1.403 7.7-.5 8.398C80.5 107.5 80.2 107 80.102 100zm0 0M101.602 103.602c.398-.903-.801-1.204-4.204-1.204l-4.597.102-.403-5.5L92 91.5l4.7-1.7c5.6-2 6.6-1.402 8.198 4.7 1.204 4.8.301 8.8-2.296 9.8-1 .4-1.301.098-1-.698zM100 98.398c0-.199-1.2-.398-2.7-.398-2.1 0-2.402.3-1.402.898 1.301.801 4.102.5 4.102-.5zm0-3.296c0-.5-1.102-.801-2.5-.5-3.102.5-3.3-.403-.3-1.5 1.198-.403 1.698-1 1.198-1.301-1.296-.903-4.699 1.898-3.898 3.097.8 1.301 5.5 1.5 5.5.204zm0 0M87.602 99.3C87.3 97.2 87 94.603 87 93.5c.102-2 .102-2 1.5-.102 1.602 2.102 2.102 9.602.602 9.602-.403 0-1.102-1.7-1.5-3.7zm0 0M82 89.398c0-.097 1.5-2.699 3.398-5.796 3.204-5.301 3.403-6.204 3.204-13.102-.204-4.102-.801-8.102-1.5-8.898-.704-.801-.801-1.704-.301-2 .398-.204 2.5 1.199 4.5 3.296C95.3 67 96 70.5 93.8 75.7c-.602 1.5-1.2 3.5-1.403 4.301-.199.898-1 3.2-1.796 5.2-1.301 3-2.102 3.6-5.102 4-1.898.198-3.5.3-3.5.198zm0 0'></path>
                  <path d='M69.102 84.602l-4.5-2.301 2.699-2.7C68.699 78.2 70.3 77 70.898 77 71.7 77 76 84.7 76 86.3c0 1.302-2.398.598-6.898-1.698zm0 0M76.7 80.398c-2.098-4.199-2.5-5.898-1.598-6.5 1.296-.796 4.597.801 5.199 2.602.3.5.097 3-.2 5.398L79.5 86.2zm0 0M82.398 81.5c.301-2.2.5-4.602.5-5.2.102-1.5 2.704-1.698 3.602-.3.3.5-.5 2.898-2 5.2L82 85.5zm0 0M61.102 74.898c-1.403-4.097-1.403-8.597 0-9.398 1.796-1.2 9.898 2.398 9.199 4.102-.301.796 0 1.398.597 1.398 3.204 0-1.796 4.898-6.5 6.398-1.796.5-2.398.102-3.296-2.5zm0 0M79 71.3c0-.6.602-1.402 1.3-1.6.9-.4.9-.802-.198-1.5-1-.802-.801-1.302 1-2.598 3.199-2.204 3.796-2 5 1 1.597 4.296.398 6.296-3.602 6.097-1.898-.097-3.5-.699-3.5-1.398zm0 0M54.5 66c-.3-.5.3-1 1.5-1s1.8.5 1.5 1c-.3.602-1 1-1.5 1s-1.2-.398-1.5-1zm0 0M52.5 62.3c-3.898-2.1-5.2-3.8-6.898-9.3-.903-2.898-1-4.898-.403-5.7 1.5-1.902 0-3.5-2.199-2.3-2.5 1.3-2.602 1.3-5-1.2-1.102-1.3-2-3.5-2-5.402 0-5.398 4.8-8.5 7-4.5 1.3 2.5 1.3 4.204-.102 1.903-.5-1-1.796-1.801-2.796-1.801-1.403 0-1.704.602-1.301 3.2.5 3.198.5 3.198 1.398.8.903-2.398 1-2.398 2.403-.602.796 1.102 1.398 1.5 1.398.903 0-.7 1.2-1.301 2.8-1.5 2.098-.2 2.598-.801 2.4-2.301-.5-2.8-.4-8 .1-14.8.302-4.7.9-6.302 3.302-8.802C59.602 3.5 68.898 1.801 78.8 6c6.398 2.8 10.8 8 6.699 8-1.398 0-1.8 1-1.2 2.7.098.402 1.098.6 2.302.5 4.199-.598 7.199 6.902 6.597 16.8-.097 1.898-.3 4.7-.3 6.3-.098 1.5-.5 2.7-1 2.7-.399 0-1 1.3-1.399 2.898C88.602 54.7 80.102 62 72 62c-5.398 0-9-2-13.898-7.7C55.398 51.103 54 50.103 54 51.2c0 1.5 5.398 8.6 8.5 11.1.602.5 0 .598-1.2.2-1.198-.3-2.402-.102-2.8.5-.898 1.398-2.5 1.2-6-.7zM80.102 55c1 0 1.898-.3 1.898-.7 0-.5-2.3-.902-5.102-1-3.699-.1-5.699-.698-7.5-2.402C68.102 49.7 67 49.102 67 49.7c0 2.602 6.7 6.602 9.8 5.7.802-.2 2.2-.399 3.302-.399zm.796-6.3c-.199-.302-3.097-.7-6.398-1-4.8-.5-5.602-.4-4 .6 2.8 1.598 8.8 2.5 9.898 1.5.5-.402.801-.902.5-1.1zm5.903-.302C88 47.602 89 46.5 89 46c0-1.2-6.3 1.5-6.8 2.898-.5 1.602 2 1.301 4.6-.5zm-3.801-4c6-2.398 6.898-4.898 3.2-8.796-1.7-1.704-3.9-4.704-5.098-6.602C80 27.102 79 26.2 79 27.102c0 .898 1.102 3.097 2.5 5C82.8 34 84.7 36.5 85.602 37.8c2 2.8 1.296 3.8-4.204 5.699-3.398 1.2-4.097 1.102-5.597-.2-2-1.8-2.5-.402-.602 1.5 1.602 1.598 3 1.5 7.801-.402zM71.8 31.801c.7-.903.5-2-.902-3.7-1-1.3-1.898-1.8-1.898-1.3 0 .597.5 1.398 1 1.699 2 1.2.898 2.5-2.102 2.5-1.699 0-2.796.398-2.398 1 .898 1.398 5.102 1.2 6.3-.2zm19-.7c.9-.5 1.098-1.703.598-3.5C90.5 23.7 88.602 23 89.5 26.899 90.102 29.602 89.898 30 88 30c-1.2 0-1.8.5-1.5 1 .7 1.2 2.5 1.3 4.3.102zM63.8 18c2.302 0 3-1.398 1.2-2.5-.898-.5-7 2-7 2.898 0 .301-.3 1.301-.7 2.301-.5 1.5-.198 1.5 1.9-.398C60.5 19 62.601 18 63.8 18zm0 0'></path>
                  <path d='M44.5 29.898c-.398-.597-2.102-.898-3.8-.699-2.802.301-3.2 0-3.5-2.3-.5-4.297 1.5-7.899 5.402-9.5 4.097-1.7 4.699-1.5 4.5 1.8-.102 1.301-.204 4.403-.204 7.102 0 4.5-1 5.898-2.398 3.597zm0 0M43 13c0-1 1.7-2.3 6.3-4.898L53.103 6 50.3 9.5c-1.5 1.898-3 3.5-3.301 3.602-.3 0-1.3.199-2.2.398-1 .2-1.8 0-1.8-.5zm0 0'></path>
               </g>
            </svg>
            <svg viewBox='0 0 128 128'>
               <path
                  d='M24.5 50.5c-1.5 0-2.5 1.2-2.5 2.7v14.1l-15.9-16c-.8-.8-2.2-1-3.2-.6S1 52.1 1 53.2v20.7c0 1.5 1.5 2.7 3 2.7s3-1.2 3-2.7V59.8l16.1 16c.5.5 1.2.8 1.9.8.3 0 .4-.1.7-.2 1-.4 1.3-1.4 1.3-2.5V53.3c0-1.5-1-2.8-2.5-2.8zm19.7 11.8c-1.4 0-2.7 1.4-2.7 2.8s1.3 2.8 2.7 2.8l6.6.4-1.5 3.7h-8.5l-4.2-7.9 4.3-8.1H50l2.1 4h5.5L54 52.1l-.8-1.1H37.6l-.7 1.2L31 62.5l-.7 1.3.7 1.3 5.8 10.3.8 1.6h15.1l.7-1.7 4.3-9 1.9-4.3h-4.4l-11 .3zM65 50.5c-1.4 0-3 1.3-3 2.7V60h6v-6.7c0-1.5-1.6-2.8-3-2.8zm30.4.3c-1-.4-2.4-.2-3.1.6L76 67.4V53.3c0-1.5-1-2.7-2.5-2.7S71 51.8 71 53.3V74c0 1.1.7 2.1 1.7 2.5.3.1.7.2 1 .2.7 0 1.6-.3 2.1-.8l16.2-16V74c0 1.5 1 2.7 2.5 2.7S97 75.5 97 74V53.3c0-1.1-.6-2.1-1.6-2.5zm21.8 12.8l8.4-8.4c1.1-1.1 1.1-2.8 0-3.8-1.1-1.1-2.8-1.1-3.8 0l-8.4 8.4-8.4-8.4c-1.1-1.1-2.8-1.1-3.8 0-1.1 1.1-1.1 2.8 0 3.8l8.4 8.4-8.4 8.4c-1.1 1.1-1.1 2.8 0 3.8.5.5 1.2.8 1.9.8s1.4-.3 1.9-.8l8.4-8.4 8.4 8.4c.5.5 1.2.8 1.9.8s1.4-.3 1.9-.8c1.1-1.1 1.1-2.8 0-3.8l-8.4-8.4zM62 73.9c0 1.4 1.5 2.7 3 2.7 1.4 0 3-1.3 3-2.7V62h-6v11.9z'
                  fill='#090'></path>
            </svg>
         </p>
      </div>
   );
};

export default TechnologyStack;
