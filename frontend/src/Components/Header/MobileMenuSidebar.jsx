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
      <div className={`menu_wrap relative ${mobileMenu && "menu_wrap_show"}`}>
        <button
          onClick={() => setMobileMenu(false)}
          className={`absolute z-50 -right-6 w-6 h-6 rounded-full bg-base-100 shadow flex justify-center items-center ${
            !mobileMenu && "hidden"
          }`}
        >
          <span className="text-red-500">X</span>
        </button>

        <div className="m-2">
          <SearchBox />
        </div>

        <div className="mt-4">
          <ul className="px-4 flex flex-col gap-2">
            <li>
              <NavLink to="/">হোম</NavLink>
            </li>
            {categories?.map((category) => (
              <li key={category?._id}>
                <Link to={`/${category?.slug}`}>{category?.category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
