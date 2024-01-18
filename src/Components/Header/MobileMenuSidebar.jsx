/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import SearchBox from "./SearchBox";

export default function MobileMenuSidebar({ mobileMenu, setMobileMenu }) {
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

        <div className="mt-4">
          <ul className="px-4 flex flex-col gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/news">News</NavLink>
            </li>
            {categories?.map((category) => (
              <li key={category?._id}>
                <Link to={`/news/${category?.slug}`}>{category?.category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
