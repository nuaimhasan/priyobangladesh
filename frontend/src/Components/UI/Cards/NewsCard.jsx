import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/bn";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("bn");

export default function NewsCard({ news }) {
  return (
    <Link
      to={`/news/details/${news?.slug}`}
      className="bg-white shadow rounded-md hover:scale-105 transition ease-in-out delay-75 duration-300"
    >
      <div className="w-full h-40 relative">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
          alt=""
          className="w-full h-full rounded-t-md"
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
          {dayjs(news?.createdAt).format("DD MMMM YYYY")}
        </p>
        <p className="text-[15px] text-neutral-content">
          {news?.shortDescription?.length > 100
            ? news?.shortDescription.slice(0, 100) + "..."
            : news?.shortDescription}
        </p>
      </div>
    </Link>
  );
}
