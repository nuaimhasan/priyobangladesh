import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/bn";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("bn");

export default function BigNewsCard({ news }) {
  return (
    <>
      <Link key={news._id} to={`/news/details/${news?.slug}`} className="group">
        <div className="bg-white shadow rounded-md overflow-hidden group-hover:shadow-md transition-all duration-300">
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
              alt=""
              className="w-full h-48 object-cover rounded-t-md transform group-hover:scale-110 transition-transform duration-300 delay-100"
            />
            <span className="absolute left-2 bottom-2 text-xs bg-primary text-white p-1 rounded-md">
              {news?.category?.category}
            </span>
          </div>
          <div className="p-4 flex flex-col gap-y-1">
            <h1 className="text-lg font-semibold group-hover:text-primary transition-all duration-300">
              {news?.title?.length > 50
                ? news?.title.slice(0, 50) + "..."
                : news?.title}
            </h1>
            <p className="text-xs text-gray-500">
              {dayjs(news?.createdAt).format("DD MMMM YYYY")}
            </p>
            <p className="text-neutral-content">
              {news?.shortDescription?.length > 100
                ? news?.shortDescription.slice(0, 100) + "..."
                : news?.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
