/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import SecondaryNewsCard from "../UI/Cards/SecondaryNewsCard";
import SectionHeader from "../UI/SectionHeader";
import BigNewsCard from "../UI/Cards/BigNewsCard";

export default function Sports() {
  const query = {};
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("Sports");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="md:col-span-2 col-span-1">
      <SectionHeader title="Sports" />
      <div className="grid md:grid-cols-2 gap-3">
        {newses?.length > 0 && (
          <BigNewsCard news={newses[0]} />
        )}
        <div className="flex flex-col gap-3 h-auto">
          {newses?.slice(1)?.map((news) => (
            <SecondaryNewsCard key={news?._id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}
