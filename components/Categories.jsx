import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);
  // console.log(categories);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category) => {
        return (
          <Link
            key={category.node.slug}
            href={`/category/${category.node.slug}`}
          >
            <span className="cursor-pointer block pb-3 mb-3">
              {category.node.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default Categories;
