/* eslint-disable no-unused-vars */
import { useState } from "react";
import SecondaryNewsCard from "../UI/Cards/SecondaryNewsCard";
import SectionHeader from "../UI/SectionHeader";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";

export default function International() {
  const query = {};
  const [limit, setLimit] = useState(6);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("International");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="container py-10">
      <SectionHeader title="International" />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 h-auto">
        <div className="md:col-span-2 h-auto">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {newses?.slice(0, 2).map((news) => (
              <div key={news?._id} className="bg-white rounded-md">
                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      news?.image
                    }`}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <span className="absolute left-2 bottom-2 text-xs bg-primary text-white p-1 rounded-md">
                    {news?.category?.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-y-1">
                  <h1 className="text-lg font-semibold">{news?.title}</h1>
                  <p className="text-sm text-gray-500">
                    {news?.createdAt.slice(0, 10)} | {news?.writer?.name}
                  </p>
                  <p>
                    {news.description.length > 160
                      ? news.description.slice(0, 160) + "..."
                      : news.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1 h-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {newses?.slice(2).map((news) => (
              <SecondaryNewsCard key={news?._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
