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
      <SectionHeader title="Top Technologies" />

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
              <div className="absolute bottom-2 left-2 text-white">
                <span className="text-xs bg-primary py-1 px-1 rounded-md">
                  {news?.category?.category}
                </span>
                <h3 className="text-xl font-medium mt-3 mb-1">{news.title}</h3>
                <p className="text-xs">{news.createdAt.slice(0, 10)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
