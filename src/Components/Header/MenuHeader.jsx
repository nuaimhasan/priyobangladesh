import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import MobileMenuSidebar from "./MobileMenuSidebar";
import SearchBox from "./SearchBox";

export default function MenuHeader() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const { data } = useGetAllCategoryQuery();
  const categories = data?.data;

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.closest(".menu_wrap ul li a")) {
        setMobileMenu(false);
      }
    });
  }, []);

  return (
    <div className="bg-primary uppercase">
      <div className="container flex items-center justify-between relative">
        <div className="hidden md:flex items-center gap-1 text-white text-sm overflow-x-clip">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-3 px-3 ${isActive ? "bg-secondary" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `py-3 px-3 ${isActive ? "bg-secondary" : ""}`
            }
          >
            News
          </NavLink>

          {categories?.map((category) => (
            <NavLink
              key={category._id}
              to={`/news/${category.slug}`}
              className={({ isActive }) =>
                `py-3 px-3 ${isActive ? "bg-secondary" : ""}`
              }
            >
              {category.category}
            </NavLink>
          ))}
        </div>

        <div className="lg:hidden z-50">
          <button
            onClick={() => setMobileMenu(true)}
            className="text-2xl text-white mt-1.5"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>

        <div className="absolute top-3 right-0">
          <div className="relative w-96 flex justify-end">
            <div onClick={() => setIsSearch(!isSearch)}>
              <IoSearch className="text-xl text-white" />
            </div>

            {isSearch && (
              <div className="absolute -bottom-14 right-0">
                <SearchBox setIsSearch={setIsSearch} isSearch={isSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileMenuSidebar
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
    </div>
  );
}
