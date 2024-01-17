import perser from "html-react-parser";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function NewsCard({ news }) {
  const shortDescription =
    news?.description && news?.description.length > 65
      ? news?.description.slice(0, 65) + "..."
      : news?.description;
  const perserDescription = shortDescription && perser(shortDescription);

  return (
    <Link
      to={`/news/${news?.category?.slug}/${news?.slug}`}
      className="bg-white rounded-md hover:scale-105 transition ease-in-out delay-75 duration-300"
    >
      <div className="w-full h-52 relative">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
          alt=""
          className="w-full h-full object-cover rounded-t-md"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-x-2">
          {news?.rating >= 4 ? (
            <span className=" text-xs bg-primary text-white p-1 rounded-md">
              Populer
            </span>
          ) : null}
          <span className=" text-xs bg-primary text-white p-1 rounded-md">
            {news?.category?.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-y-1">
        <h1 className="text-lg font-medium">
          {news?.title.length > 50
            ? news?.title.slice(0, 50) + "..."
            : news?.title}
        </h1>
        <p className="text-xs">
          {news?.createdAt.slice(0, 10)} , {news?.writer?.name}
        </p>
        <p className="text-sm">{perserDescription}</p>
      </div>
    </Link>
  );
}
