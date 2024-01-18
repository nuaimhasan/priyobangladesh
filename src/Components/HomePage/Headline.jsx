/* eslint-disable react/no-unknown-property */

import perser from "html-react-parser";
import { useGetBreakingNewsQuery } from "../../redux/breakingNews/breakingNewsApi";

export default function Headline() {
  const { data } = useGetBreakingNewsQuery();
  const breakingNews = data?.data;

  return (
    <div className="bg-white">
      <div className="container">
        {/* breaking news */}
        <div className="flex items-center">
          <div className="bg-gray-100 py-1 px-2 font-medium ">
            <h1 className="text-primary font-medium whitespace-nowrap">
              Breaking News :
            </h1>
          </div>
          <marquee behavior="scroll" direction="left">
            <div className="flex items-center gap-5 text-sm text-black">
              {breakingNews?.map((news) => {
                const perserDescription = news?.news && perser(news?.news);
                return <p key={news?._id}>{perserDescription}</p>;
              })}
            </div>
          </marquee>
        </div>
      </div>
    </div>
  );
}
