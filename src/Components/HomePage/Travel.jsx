/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import SecondaryNewsCard from "../UI/Cards/SecondaryNewsCard";
import SectionHeader from "../UI/SectionHeader";

export default function Travel() {
  const query = {};
  const [limit, setLimit] = useState(1);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("Travel");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="md:col-span-2 col-span-1">
      <SectionHeader title="Travel" />
      <div className="grid md:grid-cols-2 gap-3">
        {newses?.length > 0 && (
          <div className="bg-white rounded-md h-auto">
            <div className="relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                  newses[0]?.image
                }`}
                alt=""
                className="w-full h-48 object-cover rounded-t-md"
              />
              <span className="absolute left-2 bottom-2 text-xs bg-primary text-white p-1 rounded-md">
                {newses[0]?.category?.category}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-y-1">
              <h1 className="text-lg font-semibold">{newses[0]?.title}</h1>
              <p className="text-sm text-gray-500">
                {newses[0]?.createdAt.slice(0, 10)} | {newses[0]?.writer?.name}
              </p>
              <p>
                {newses[0]?.description.length > 160
                  ? newses[0]?.description.slice(0, 160) + "..."
                  : newses[0]?.description}
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 h-auto">
          {newses?.map((news) => (
            <SecondaryNewsCard key={news?._id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}
