import { useRouter } from "next/router";
import clsx from "clsx";

function ActiveLink({ children, href }) {
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
            router.asPath === href
               ? " underline decoration-dotted decoration-2	decoration-slate-400 underline-offset-8 "
               : "text-white"
         )}>
         {children}
      </a>
   );
}

export default ActiveLink;
