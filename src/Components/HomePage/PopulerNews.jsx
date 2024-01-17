/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import NewsCard from "../UI/Cards/NewsCard";
import SectionHeader from "../UI/SectionHeader";

export default function PopulerNews() {
  const query = {};
  const [limit, setLimit] = useState(4);
  const [status, setStatus] = useState("active");

  query["limit"] = limit;
  query["status"] = status;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;
  return (
    <div className="container py-10">
      <SectionHeader title="Populer News" />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {newses?.map((news) => (
          <NewsCard key={news?._id} news={news} />
        ))}
      </div>
    </div>
  );
}
