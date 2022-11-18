// // export default `
// // body{
// // display: block;
// // }
// // #globalLoader{
// //     position: fixed;
// //     z-index: 1700;
// //     top: 50%;
// //     left: 50%;
// //     transform: translate(-50%, -50%);
// //     background-color: #171717;
// //     display: flex;
// //     left: 0,
// //     right: 0;
// //     width: 100%;
// //     height: 100%;
// //     justify-content: center;
// //     align-items: center;
// // }
// // .loader {
// //  --clr: #115e59;
// //  /* color of spining  */
// //  width: 40px;
// //  height: 40px;
// //  position: relative;
// // }
// // .loader div:nth-child(1), .loader div:nth-child(2) {
// //  content: "";
// //  position: absolute;
// //  top: -10px;
// //  left: -10px;
// //  width: 100%;
// //  height: 100%;
// //  border-radius: 100%;
// //  border: 10px solid transparent;
// //  border-top-color: var(--clr);
// // }
// // .loader div:nth-child(1) {
// //  z-index: 100;
// //  animation: spin 1s infinite;
// // }
// // .loader div:nth-child(2) {
// //  border: 10px solid #4ade80;
// // }
// // @keyframes spin {
// //  0% {
// //   -webkit-transform: rotate(0deg);
// //   -ms-transform: rotate(0deg);
// //   -o-transform: rotate(0deg);
// //   transform: rotate(0deg);
// //  }
// //  100% {
// //   -webkit-transform: rotate(360deg);
// //   -ms-transform: rotate(360deg);
// //   -o-transform: rotate(360deg);
// //   transform: rotate(360deg);
// //  }
// // }`;

// // eslint-disable-next-line import/no-anonymous-default-export
// export default `
// body{
// display: block;
// }
// #globalLoader{
//     position: fixed;
//     z-index: 1700;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: #171717;
//     display: flex;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     justify-content: center;
//     align-items: center;
// }
// /* From uiverse.io by @mrhyddenn */
// .loader {
//   width: 10em;
//   height: 10em;
//   font-size: 10px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .loader .face {
//   position: absolute;
//   border-radius: 50%;
//   border-style: solid;
//   animation: animate023845 1.5s linear infinite;
// }

// .loader .face:nth-child(1) {
//   width: 100%;
//   height: 100%;
//   color: gold;

//   border-color: currentColor transparent transparent currentColor;
//   border-width: 0.2em 0.2em 0em 0em;
//   --deg: -45deg;
//   animation-direction: normal;
// }

// .loader .face:nth-child(2) {
//   width: 70%;
//   height: 70%;
//   color: lime;
//   border-color: currentColor currentColor transparent transparent;
//   border-width: 0.2em 0em 0em 0.2em;
//   --deg: -135deg;
//   animation-direction: reverse;
// }

// .loader .face:nth-child(3) {
//   width: 40%;
//   height: 40%;
//   color: cyan;
//   border-color: currentColor currentColor transparent transparent;
//   border-width: 0.2em 0em 0em 0.2em;
//   --deg: -170deg;
//   animation-direction: normal;
// }

// .loader .face .circle {
//   position: absolute;
//   width: 50%;
//   height: 0.1em;
//   top: 50%;
//   left: 50%;
//   background-color: transparent;
//   transform: rotate(var(--deg));
//   transform-origin: left;
// }

// .loader .face .circle::before {
//   position: absolute;
//   top: -0.5em;
//   right: -0.5em;
//   // content: '';
//   width: 1em;
//   height: 1em;
//   background-color: currentColor;
//   border-radius: 50%;
//   box-shadow: 0 0 2em,
//                 0 0 4em,
//                 0 0 6em,
//                 0 0 8em,
//                 0 0 10em,
//                 0 0 0 0.5em rgba(255, 255, 0, 0.1);
// }

// @keyframes animate023845 {
//   to {
//     transform: rotate(1turn);
//   }
// }`;

// // export default `/* From uiverse.io by @Z-C-Code */
// // @keyframes square-animation {
// //  0% {
// //   left: 0;
// //   top: 0;
// //  }

// //  10.5% {
// //   left: 0;
// //   top: 0;
// //  }

// //  12.5% {
// //   left: 32px;
// //   top: 0;
// //  }

// //  23% {
// //   left: 32px;
// //   top: 0;
// //  }

// //  25% {
// //   left: 64px;
// //   top: 0;
// //  }

// //  35.5% {
// //   left: 64px;
// //   top: 0;
// //  }

// //  37.5% {
// //   left: 64px;
// //   top: 32px;
// //  }

// //  48% {
// //   left: 64px;
// //   top: 32px;
// //  }

// //  50% {
// //   left: 32px;
// //   top: 32px;
// //  }

// //  60.5% {
// //   left: 32px;
// //   top: 32px;
// //  }

// //  62.5% {
// //   left: 32px;
// //   top: 64px;
// //  }

// //  73% {
// //   left: 32px;
// //   top: 64px;
// //  }

// //  75% {
// //   left: 0;
// //   top: 64px;
// //  }

// //  85.5% {
// //   left: 0;
// //   top: 64px;
// //  }

// //  87.5% {
// //   left: 0;
// //   top: 32px;
// //  }

// //  98% {
// //   left: 0;
// //   top: 32px;
// //  }

// //  100% {
// //   left: 0;
// //   top: 0;
// //  }
// // }

// // .loader {
// //  position: relative;
// //  width: 96px;
// //  height: 96px;
// //  transform: rotate(45deg);
// // }

// // .loader-square {
// //  position: absolute;
// //  top: 0;
// //  left: 0;
// //  width: 28px;
// //  height: 28px;
// //  margin: 2px;
// //  border-radius: 0px;
// //  background: white;
// //  background-size: cover;
// //  background-position: center;
// //  background-attachment: fixed;
// //  animation: square-animation 10s ease-in-out infinite both;
// // }

// // .loader-square:nth-of-type(0) {
// //  animation-delay: 0s;
// // }

// // .loader-square:nth-of-type(1) {
// //  animation-delay: -1.4285714286s;
// // }

// // .loader-square:nth-of-type(2) {
// //  animation-delay: -2.8571428571s;
// // }

// // .loader-square:nth-of-type(3) {
// //  animation-delay: -4.2857142857s;
// // }

// // .loader-square:nth-of-type(4) {
// //  animation-delay: -5.7142857143s;
// // }

// // .loader-square:nth-of-type(5) {
// //  animation-delay: -7.1428571429s;
// // }

// // .loader-square:nth-of-type(6) {
// //  animation-delay: -8.5714285714s;
// // }

// // .loader-square:nth-of-type(7) {
// //  animation-delay: -10s;
// // }`;
