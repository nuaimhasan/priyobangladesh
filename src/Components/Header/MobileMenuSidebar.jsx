/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import SearchBox from "./SearchBox";

export default function MobileMenuSidebar({ mobileMenu, setMobileMenu }) {
  const [tab, setTab] = useState(1);

  const { data } = useGetAllCategoryQuery();
  const categories = data?.data;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setMobileMenu(false)}
        className={`overlay ${mobileMenu && "overlay_show"}`}
      ></button>
      <div className={`menu_wrap ${mobileMenu && "menu_wrap_show"}`}>
        <div className="m-2">
          <SearchBox />
        </div>

        <div className="mt-4 grid grid-cols-2 border-b pb-1">
          <button
            onClick={() => setTab(1)}
            className={`${tab === 1 && "text-primary"}`}
          >
            Ganerel
          </button>
          <button
            onClick={() => setTab(2)}
            className={`${tab === 2 && "text-primary"}`}
          >
            Category
          </button>
        </div>

        <div className="mt-4">
          {tab === 1 && (
            <ul className="px-4 flex flex-col gap-2">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/news">News</NavLink>
              </li>
            </ul>
          )}

          {tab === 2 && (
            <ul className="px-4 flex flex-col gap-2">
              {categories?.map((category) => (
                <li key={category._id}>
                  <Link to={`/news/${category.slug}`}>{category.category}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
