import { useGetBreakingNewsQuery } from "../../redux/breakingNews/breakingNewsApi";
import Marquee from "react-fast-marquee";

export default function Headline() {
  const { data } = useGetBreakingNewsQuery();
  const breakingNews = data?.data;

  return (
    <div className="bg-white">
      <div className="container">
        {/* breaking news */}
        <div className="flex items-center sm:pt-1">
          <div className="bg-gray-100 py-1 px-2 font-medium hidden sm:block">
            <h1 className="text-primary font-medium whitespace-nowrap">
              Breaking News :
            </h1>
          </div>

          <Marquee>
            <div className="flex items-center gap-2 text-sm text-neutral">
              {breakingNews?.map((news) => {
                return <p key={news?._id}>{news?.news}</p>;
              })}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
