/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import BreadCrumb from "../UI/BreadCrumb";
import NewsCard from "../UI/Cards/NewsCard";
import Pagination from "../UI/Pagination";
import RecentNews from "../UI/RecentNews/RecentNews";
import SectionHeader from "../UI/SectionHeader";
import CategoryLength from "./CategoryLength";
import Spinner from "../Spinner/Spinner";

export default function AllNews() {
  const { category } = useParams();

  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [status, setStatus] = useState("active");

  query["page"] = page;
  query["limit"] = limit;
  query["category"] = category;
  query["status"] = status;

  const { data: categoryData } = useGetAllCategoryQuery();

  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  if (isLoading) return <Spinner />;

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (data?.meta?.total && pageNumber > data?.meta.total / limit) return;

    setPage(pageNumber);
  };

  return (
    <div className="container">
      <BreadCrumb />

      <div className="py-5 grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {newses?.map((news) => (
              <NewsCard key={news?._id} news={news} />
            ))}
          </div>

          {/* pagination */}
          {newses?.length > 10 && (
            <Pagination
              handlePageChange={handlePageChange}
              limit={limit}
              total={data?.meta?.total}
              page={page}
            />
          )}
        </div>

        <div className="w-full sm:w-1/2 lg:w-full">
          <RecentNews />
          <div className="w-full bg-white p-4 rounded-md mt-5">
            <SectionHeader title="Category" />

            <CategoryLength />
          </div>
        </div>
      </div>
    </div>
  );
}
