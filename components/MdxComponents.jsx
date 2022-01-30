import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Accent from "../../components/custom/Accent";

import Image from "next/image";

const ResponsiveImage = (props) => (
   <Image alt={props.alt} layout='responsive' {...props} />
);

const parseLanguageByClass = (className) => {
   return className.split("-")[1];
};

export default {
   h1: ({ children }) => (
      <h1 className='text-white text-4xl font-bold my-5'> {children}</h1>
   ),
   h2: ({ children }) => (
      <h2 className='text-white text-2xl font-bold my-5'> {children}</h2>
   ),
   h3: ({ children }) => (
      <h3 className='text-white text-xl font-bold my-5'> {children}</h3>
   ),
   Accent: ({ children }) => <Accent>{children}</Accent>,
   img: ResponsiveImage,
   p: ({ children }) => <p className='my-5'>{children}</p>,

   code: ({ children, className }) => (
      <SyntaxHighlighter
         language={parseLanguageByClass(className)}
         style={a11yDark}
         wrapLines={true}
         showLineNumbers={true}
         showInlineLineNumbers={true}>
         {children}
      </SyntaxHighlighter>
   ),
};
