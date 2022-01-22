import React, { useState, useEffect } from "react";
import Link from "next/link";
import CategoryChip from "./CategoryChip";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-slate-900 shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-white">
        Categories
      </h3>
      <CategoryChip categories={categories} />
      {/* {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.name}`}>
          <a class="inline-flex" href>
            <span class=" flex items-center m-2 justify-center rounded-full text-sm px-3 border-2 border-sky-800 text-slate-400 hover:bg-sky-800 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out">
              {category.name}
            </span>
          </a>
        </Link>
      ))} */}
    </div>
  );
};

export default Categories;
