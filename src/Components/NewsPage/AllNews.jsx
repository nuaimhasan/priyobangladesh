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

export default function AllNews() {
  const { category } = useParams();
  console.log(category);

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

  if (isLoading) return <h1>Loading...</h1>;

  const handlePageChange = (pageNumber) => {
    // if (pageNumber < 1) return;
    // if (data?.meta?.total && pageNumber > data?.meta.total / limit) return;

    setPage(pageNumber);
  };

  return (
    <div>
      <div className="container">
        <BreadCrumb />
      </div>

      <div className="container py-10 flex md:flex-row flex-col items-start gap-5">
        <div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {newses?.map((news) => (
              <NewsCard key={news?._id} news={news} />
            ))}
          </div>

          {/* pagination */}
          <Pagination
            handlePageChange={handlePageChange}
            limit={5}
            total={20}
            page={page}
          />
        </div>

        <div className="shrink-0 md:w-72 w-full">
          {/* ----------------recent news---------------- */}

          <RecentNews />

          {/* category */}
          <div className=" w-full bg-white p-4 rounded-md mt-5">
            <SectionHeader title="Category" />

            <CategoryLength />
          </div>
        </div>
      </div>
    </div>
  );
}
