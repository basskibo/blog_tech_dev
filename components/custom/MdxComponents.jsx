import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Accent from "./Accent";
import TestComponent from "../TestComponent";
import Image from "next/image";

import slugify from "slugify";

const ResponsiveImage = (props) => (
   <Image alt={props.alt} layout='responsive' {...props} />
);

const parseLanguageByClass = (className) => {
   return className.split("-")[1];
};

export default {
   h1: ({ children }) => {
      return (
         <h1 className='text-white text-4xl font-bold my-5'> {children}</h1>
      );
   },
   h2: ({ children }) => {
      return (
         <a
            id={slugify(children, {
               lower: true,
               strict: true,
            })}>
            <h2 className='text-white text-3xl font-bold my-5'> {children}</h2>
         </a>
      );
   },
   h3: ({ children }) => {
      return (
         <a
            id={slugify(children, {
               lower: true,
               strict: true,
            })}>
            <h3 className='text-white text-xl font-semi-bold my-5'>
               {" "}
               {children}
            </h3>
         </a>
      );
   },
   Accent: ({ children }) => {
      return <Accent>{children}</Accent>;
   },
   img: ResponsiveImage,
   p: ({ children }) => {
      return <p className='my-5'>{children}</p>;
   },

   code: ({ children, className }) => {
      return (
         <SyntaxHighlighter
            language={parseLanguageByClass(className)}
            style={a11yDark}
            wrapLines={true}
            showLineNumbers={true}
            showInlineLineNumbers={true}>
            {children}
         </SyntaxHighlighter>
      );
   },
   a: ({ children, className, href }) => {
      console.log(">>>>>>>>>>>>");
      console.log(children);
      console.log(href);
      return (
         <a
            className='my-3 hover:cursor-pointer text-lime-500 underline decoration-dotted decoration-2
            	decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
            href={href}
            target='_blank'
            rel='noreferrer'>
            {children}
         </a>
      );
   },
   TestComponent: TestComponent,
};
