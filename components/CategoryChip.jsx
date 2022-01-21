import React from "react";
import Link from "next/link";

const CategoryChip = ({ categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.name}`}>
          <a class="inline-flex" href>
            <span class=" flex items-center m-2 justify-center rounded-full text-sm px-3 py-1 border-2 border-sky-800 text-slate-400 hover:bg-sky-800 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out">
              {category.name}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CategoryChip;
