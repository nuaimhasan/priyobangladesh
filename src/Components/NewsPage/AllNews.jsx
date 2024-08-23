/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams } from "react-router-dom";
// import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import BreadCrumb from "../UI/BreadCrumb";
import NewsCard from "../UI/Cards/NewsCard";
import RecentNews from "../UI/RecentNews/RecentNews";
import SectionHeader from "../UI/SectionHeader";
import CategoryLength from "./CategoryLength";
import Spinner from "../Spinner/Spinner";
import SidebarAdd from "./../Advertises/SidebarAdd";
import Pagination from "../Pagination/Pagination";

export default function AllNews() {
  const { category } = useParams();

  const query = {};
  const [currentPage, setCurrentPage] = useState(1);

  query["page"] = currentPage;
  query["limit"] = 9;
  query["category"] = category;
  query["status"] = "active";

  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;
  const pages = Math.ceil(
    parseInt(data?.meta?.total) / parseInt(data?.meta?.limit)
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="container">
      <BreadCrumb />

      <div className="py-5 grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {newses?.length > 0 ? (
              newses?.map((news) => <NewsCard key={news?._id} news={news} />)
            ) : (
              <p className="text-xs text-red-500">No News Available</p>
            )}
          </div>

          {/* pagination */}
          {newses?.length > 9 && (
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={pages}
            />
          )}
        </div>

        <div className="w-full sm:w-1/2 lg:w-full">
          <RecentNews />
          <div className="w-full bg-white p-4 rounded-md mt-5">
            <SectionHeader title="Category" />
            <CategoryLength />
          </div>
          <div className="mt-4">
            <SidebarAdd />
          </div>
        </div>
      </div>
    </div>
  );
}
