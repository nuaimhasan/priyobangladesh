/* eslint-disable no-unused-vars */
import perser from "html-react-parser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import BigNewsCard from "../UI/Cards/BigNewsCard";
import SectionHeader from "../UI/SectionHeader";

export default function Education() {
  const query = {};
  const [limit, setLimit] = useState(1);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("Education");

  query["limit"] = limit;
  query["status"] = status;
  query["category"] = category;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="lg:col-span-1 col-span-2 pt-10 lg:pt-0">
      <SectionHeader title="Education" />
      {newses?.length > 0 && <BigNewsCard news={newses[0]} />}
    </div>
  );
}
