/* eslint-disable react/prop-types */

import perser from "html-react-parser";
import { Link } from "react-router-dom";

export default function BigNewsCard({ news }) {
  const shortDescription =
    news?.description && news?.description.length > 150
      ? news?.description.slice(0, 150) + "..."
      : news?.description;
  const perserDescription = shortDescription && perser(shortDescription);
  return (
    <>
      <Link key={news._id} to={`/news/${news?.category?.slug}/${news.slug}`}>
        <div className="bg-white rounded-md">
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
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
            <p>{perserDescription}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
