/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../../redux/news/newsApi";
import SectionHeader from "../SectionHeader";

export default function RecentNews() {
  const query = {};
  const [limit, setLimit] = useState(4);
  const [status, setStatus] = useState("active");

  query["limit"] = limit;
  query["status"] = status;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className=" w-full bg-white p-4 rounded-md">
      <SectionHeader title="সর্বশেষ সংবাদ" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        {newses?.map((news) => (
          <Link key={news?._id} to={`/news/details/${news?.slug}`}>
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
                alt="news"
                className="w-20 h-16 object-cover rounded-md"
                loading="lazy"
              />
              <div>
                <p className="text-xs text-primary">
                  {news?.category?.category}
                </p>
                <h1 className="text-sm font-medium">
                  {news?.title.length > 30
                    ? news?.title.slice(0, 30) + "..."
                    : news?.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
