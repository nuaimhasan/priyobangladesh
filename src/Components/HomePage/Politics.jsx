/* eslint-disable no-unused-vars */
import { useState } from "react";
import SectionHeader from "../UI/SectionHeader";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import BigNewsCard from "../UI/Cards/BigNewsCard";

export default function Politics() {
  const query = {};
  const [limit, setLimit] = useState(1);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("Politics");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="lg:col-span-1 col-span-2 pt-10 lg:pt-0">
      <SectionHeader title="Politics" />
      {newses?.length > 0 && (
        <BigNewsCard news={newses[0]} />
      )}
    </div>
  );
}
