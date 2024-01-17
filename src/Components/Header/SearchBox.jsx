/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";

export default function SearchBox({
  isSearch = false,
  setIsSearch = () => {},
}) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");

  const query = {};
  const [status, setStatus] = useState("active");

  query["status"] = status;
  query["title"] = searchText;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".searchInput") &&
        !e.target.closest(".searchIcon")
      ) {
        setSearchDropdown(false);
        setSearchText("");
      }
    });
  }, []);

  return (
    <div className="relative flex z-20">
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        onClick={() => setSearchDropdown(true)}
        placeholder="search Product..."
        className="searchInput border w-full px-3 py-1.5 outline-none rounded-l-md"
      />
      <div
        className="searchIcon px-3 text-lg text-base-100 bg-primary flex justify-center items-center rounded-r-md text-white"
        onClick={() => setIsSearch(!isSearch)}
      >
        <BsSearch />
      </div>

      {searchDropdown && (
        <div className="searchDropdown absolute w-full bg-base-100 p-4 shadow-lg max-h-96 overflow-y-auto top-full z-50 bg-white">
          <ul>
            {newses?.map((news) => (
              <li
                key={news?._id}
                onClick={() => {
                  setSearchDropdown(false);
                  setSearchText("");
                  setIsSearch(false);
                }}
                className="hover:bg-gray-100 p-1"
              >
                <Link
                  to={`/news/${news?.category?.category}/${news?._id}`}
                  className="flex gap-2 items-center"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      news?.image
                    }`}
                    alt=""
                    className="w-12"
                  />
                  <h6>{news?.title}</h6>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
