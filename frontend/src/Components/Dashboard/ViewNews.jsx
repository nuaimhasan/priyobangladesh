/* eslint-disable react/prop-types */

import perser from "html-react-parser";
import { Link } from "react-router-dom";

export default function ViewNews({ news }) {
  const perserDescription = news?.details && perser(news?.details);
  return (
    <div>
      <div className="flex items-center justify-between bg-white shadow-lg p-5 rounded-md mb-1">
        <h1 className="md:text-xl text-base font-semibold">View News</h1>
        <div className="">
          <Link
            to={`/${news?.writer?.role}/news/edit-news/${news._id}`}
            className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md transition hover:scale-105 duration-300 text-xs md:text-sm"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg p-5 rounded-md flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="w-full">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
              alt="news"
              className="w-full md:w-1/2 mx-auto h-full rounded"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{news.title}</h1>
            <div className="flex items-center gap-2 mt-1 mb-3">
              <p className="text-xs text-gray-400">
                {new Date(news.createdAt).toDateString()}
              </p>
              <p className="text-xs text-gray-400">|</p>
              <p className="text-xs text-gray-400">{news.writer?.name}</p>
            </div>
            <div className="text-[15px] text-neutral-content">
              <p>{news?.shortDescription}</p>
              <p>{perserDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
