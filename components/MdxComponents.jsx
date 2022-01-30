import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Accent from "./custom/Accent";
import TestComponent from "./TestComponent";
import Image from "next/image";

const ResponsiveImage = (props) => (
   <Image alt={props.alt} layout='responsive' {...props} />
);

const parseLanguageByClass = (className) => {
   return className.split("-")[1];
};

export default {
   h1: ({ children }) => {
      console.log(children);
      return (
         <h1 className='text-white text-4xl font-bold my-5'> {children}</h1>
      );
   },
   h2: ({ children }) => {
      return (
         <h2 className='text-white text-2xl font-bold my-5'> {children}</h2>
      );
   },
   h3: ({ children }) => {
      return <h3 className='text-white text-xl font-bold my-5'> {children}</h3>;
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
   TestComponent: TestComponent,
};
