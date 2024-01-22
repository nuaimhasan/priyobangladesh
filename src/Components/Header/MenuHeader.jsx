import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
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

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".search_icon") && !e.target.closest(".search")) {
        setIsSearch(false);
      }
    });
  }, []);

  return (
    <div className="bg-primary uppercase">
      <div className="container flex items-center justify-between relative">
        <div className="hidden lg:flex items-center gap-1 text-white text-sm overflow-x-clip">
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
            সংবাদ
          </NavLink>

          {categories?.map((category) => (
            <NavLink
              key={category?._id}
              to={`/news/${category?.slug}`}
              className={({ isActive }) =>
                `py-3 px-3 ${isActive ? "bg-secondary" : ""}`
              }
            >
              {category?.category}
            </NavLink>
          ))}
        </div>

        <div className="lg:hidden z-50">
          <button
            onClick={() => setMobileMenu(true)}
            className="text-2xl text-white mt-1.5"
          >
            <RiMenu2Fill />
          </button>
        </div>

        <div className="hidden sm:block absolute top-3 right-0">
          <div className="relative flex justify-end">
            <button onClick={() => setIsSearch(!isSearch)}>
              <IoSearch className="text-xl text-white search_icon" />
            </button>

            {isSearch && (
              <div className="search w-72 absolute -bottom-[52px] right-0">
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
