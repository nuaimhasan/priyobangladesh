import { useGetAllNewsQuery } from "../../redux/news/newsApi";
import SectionHeader from "../UI/SectionHeader";
import { Link } from "react-router-dom";

export default function RecentNewsSection() {
  const query = {};

  query["limit"] = 4;
  query["status"] = "active";

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="lg:col-span-1 col-span-2 pt-10 lg:pt-0">
      <SectionHeader title="সর্বশেষ সংবাদ" />
      <div className=" w-full bg-white p-4 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          {newses?.map((news) => (
            <Link key={news?._id} to={`/news/details/${news?.slug}`}>
              <div className="flex items-center gap-3">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                    news?.image
                  }`}
                  alt=""
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="text-xs text-primary">
                    {news?.category?.category}
                  </p>
                  <h1 className="text-sm font-medium">
                    {news?.title.length > 30
                      ? news?.title.slice(0, 30) + "..."
                      : news?.title}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
