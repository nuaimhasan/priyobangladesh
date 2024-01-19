/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import NewsCard from "../UI/Cards/NewsCard";
import SectionHeader from "../UI/SectionHeader";

export default function PopulerNews() {
  const query = {};
  query["limit"] = 4;
  query["status"] = "active";

  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  let content = null;
  if (isLoading) {
    content = (
      <>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[200px] rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[200px] rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[200px] rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[200px] rounded"></div>
        </div>
      </>
    );
  }
  if (!isLoading && data?.data?.length > 0) {
    content = newses?.map((news) => <NewsCard key={news?._id} news={news} />);
  }

  return (
    <div className="container py-5">
      <SectionHeader title="Populer News" />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {content}
      </div>
    </div>
  );
}
