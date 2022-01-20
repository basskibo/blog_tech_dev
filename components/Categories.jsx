import React, { useState, useEffect } from "react";
import Link from "next/link";
import Chip from "@mui/material/Chip";

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
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.name}`}>
          <Chip
            label={category.name}
            color="primary"
            variant="outlined"
            className="text-slate-400 bg-slate-900  lg:m-1 sm:m-1 xs:ml-4 xs:mb-6 first:ml-0 "
          ></Chip>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
