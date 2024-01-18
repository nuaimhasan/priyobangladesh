/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import SectionHeader from "../UI/SectionHeader";

export default function TopTechnologySection() {
  const query = {};
  const [limit, setLimit] = useState(4);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("Technology");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div>
      <SectionHeader title="Top News" />

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        {newses?.map((news) => (
          <Link
            key={news._id}
            to={`/news/${news?.category?.slug}/${news.slug}`}
          >
            <div className="w-full h-40 rounded-md relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
              <div className="bg-[#00000054] w-full h-full absolute top-0 left-0 text-white flex flex-col justify-center px-4">
                <span className="w-max text-xs bg-primary py-1 px-1 rounded-md">
                  {news?.category?.category}
                </span>
                <h3 className="text-xl font-medium mt-3 mb-1">
                  {news?.title?.length > 30
                    ? news?.title?.slice(0, 30) + "..."
                    : news?.title?.length}
                </h3>
                <p className="text-xs">{news.createdAt.slice(0, 10)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
