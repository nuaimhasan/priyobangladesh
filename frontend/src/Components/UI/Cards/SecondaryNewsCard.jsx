import { Link } from "react-router-dom";

export default function SecondaryNewsCard({ news }) {
  return (
    <>
      <Link
        key={news._id}
        to={`/news/details/${news.slug}`}
        className="group hover:scale-105 delay-150 duration-300 transition-all"
      >
        <div className="bg-white flex gap-x-4 rounded-md h-[84px] overflow-hidden group-hover:shadow-lg transition-all duration-300">
          <div className="w-1/3">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
              alt="news"
              className="w-full h-full object-cover rounded-l-md"
              loading="lazy"
            />
          </div>
          <div className="flex items-start justify-center flex-col gap-x-1">
            <p className="text-xs text-primary">{news?.category?.category}</p>
            <h1 className="text-sm font-medium">
              {news?.title.length > 30
                ? news?.title.slice(0, 30) + "..."
                : news?.title}
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
}
