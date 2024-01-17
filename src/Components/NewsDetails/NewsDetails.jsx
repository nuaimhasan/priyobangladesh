/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
} from "../../redux/news/newsApi";
import CategoryLength from "../NewsPage/CategoryLength";
import BreadCrumb from "../UI/BreadCrumb";
import NewsCard from "../UI/Cards/NewsCard";
import RecentNews from "../UI/RecentNews/RecentNews";
import SectionHeader from "../UI/SectionHeader";

export default function NewsDetails() {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useGetNewsByIdQuery(id);
  const news = data?.data;

  const query = {};
  const [limit, setLimit] = useState(4);
  const [status, setStatus] = useState("active");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = news?.category?.category;
  const { data: newsesData, isLoading: allLoading } = useGetAllNewsQuery({
    ...query,
  });
  const newses = newsesData?.data;

  if (isLoading || allLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="container">
        <BreadCrumb />
      </div>

      <div className="container py-10 ">
        <div className="flex md:flex-row flex-col items-start gap-5">
          <div className="w-full text-gray-800">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
              alt=""
              className="w-full h-96 object-cover rounded-t-md"
            />
            <div className="flex items-center justify-between mt-5 mb-2">
              <p className="text-primary font-semibold uppercase">
                {news?.category?.category}
              </p>
              <p className="text-sm">{news?.author}</p>
            </div>
            <h1 className="text-xl font-medium">{news?.title}</h1>
            <p className=" text-sm mb-2">{news?.createdAt.slice(0, 10)}</p>

            <p>{news?.description}</p>
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

        {/* ------------------related news------------------ */}
        <div className="my-10">
          <SectionHeader title="Related News" />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {newses?.map((news) => (
              <NewsCard key={news?._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
