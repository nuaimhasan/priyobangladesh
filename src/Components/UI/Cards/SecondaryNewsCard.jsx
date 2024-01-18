/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function SecondaryNewsCard({ news }) {
  return (
    <>
      <Link key={news._id} to={`/news/${news?.category?.slug}/${news.slug}`}>
        <div className="bg-white flex gap-x-4 rounded-md h-[84px]">
          <div className="w-1/3">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
              alt=""
              className="w-full h-full object-cover rounded-l-md"
            />
          </div>
          <div className="flex items-start justify-center flex-col gap-x-1">
            <p className="text-xs text-primary">{news?.category?.category}</p>
            <h1 className="text-sm font-medium">
              {news?.title.length > 30
                ? news?.title.slice(0, 30) + "..."
                : news?.title}
            </h1>
            <p className="text-xs">
              {news?.createdAt.slice(0, 10)} | {news?.writer?.name}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
