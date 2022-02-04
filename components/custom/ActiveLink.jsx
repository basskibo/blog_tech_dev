import { useRouter } from "next/router";
import clsx from "clsx";

function ActiveLink({ children, href, className }) {
   const router = useRouter();
   const style = {
      marginRight: 10,
      marginTop: 5,
   };

   const handleClick = (e) => {
      e.preventDefault();
      router.push(href);
   };

   return (
      <a
         href={href}
         onClick={handleClick}
         style={style}
         className={clsx(
            "font-semibold",
            className ? className : "",
            router.asPath === href
               ? "text-lime-500 underline decoration-dotted decoration-2	decoration-sky-400 underline-offset-4 "
               : "text-white"
         )}>
         {children}
      </a>
   );
}

export default ActiveLink;
