/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import BigNewsCard from "../UI/Cards/BigNewsCard";
import SecondaryNewsCard from "../UI/Cards/SecondaryNewsCard";
import SectionHeader from "../UI/SectionHeader";

export default function International() {
  const query = {};
  const [limit, setLimit] = useState(6);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("International");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="container py-10">
      <SectionHeader title="International" />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 h-auto">
        <div className="md:col-span-2 h-auto">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {newses?.slice(0, 2).map((news) => (
              <BigNewsCard key={news._id} news={news} />
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1 h-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {newses?.slice(2).map((news) => (
              <SecondaryNewsCard key={news?._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
