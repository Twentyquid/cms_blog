import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services";

function Header() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className=" w-full inline-block border-b-blue-500 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-gray-800">
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => {
            return (
              <Link
                key={category.node.slug}
                href={`/category/${category.node.slug}`}
              >
                <span className="md:float-right mt-2 align-middle text-gray-800 ml-4 font-semibold cursor-pointer">
                  {category.node.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Header;
