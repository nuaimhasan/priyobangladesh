import perser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import {
  useGetAllNewsQuery,
  useGetNewsBySlugQuery,
} from "../../redux/news/newsApi";
import CategoryLength from "../../Components/NewsPage/CategoryLength";
import BreadCrumb from "../../Components/UI/BreadCrumb";
import NewsCard from "../../Components/UI/Cards/NewsCard";
import RecentNews from "../../Components/UI/RecentNews/RecentNews";
import SectionHeader from "../../Components/UI/SectionHeader";
import Spinner from "../../Components/Spinner/Spinner";
import { useEffect } from "react";
import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";
import SidebarAdd from "../../Components/Advertises/SidebarAdd";

export default function NewsDetails() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { slug } = useParams();
  const { data, isLoading } = useGetNewsBySlugQuery(slug);
  const news = data?.data;
  const perserDescription = news?.details && perser(news?.details);

  const query = {};
  query["limit"] = 4;
  query["status"] = "active";
  query["category"] = news?.category?.category;
  const { data: newsesData, isLoading: allLoading } = useGetAllNewsQuery({
    ...query,
  });
  const newses = newsesData?.data;

  const detailsAddQuery = {};
  detailsAddQuery["showingPlace"] = "details";
  const { data: detailsAddData } = useGetAllAdvertiseQuery({ ...detailsAddQuery });
  const detailsAdd = detailsAddData?.data[0];


  if (isLoading || allLoading) return <Spinner />;

  return (
    <div>
      <div className="container">
        <BreadCrumb />
      </div>

      <div className="container py-4 sm:py-10 ">
        <div className="flex md:flex-row flex-col items-start gap-5">
          <div className="w-full text-gray-800">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
              alt=""
              className="w-full md:h-96 rounded-md"
            />
            <div className="flex items-center justify-between mt-5 mb-2">
              <p className="text-primary font-semibold uppercase">
                {news?.category?.category}
              </p>
              <p className="text-sm">{news?.writer?.name}</p>
            </div>
            <h1 className="text-xl font-medium">{news?.title}</h1>
            <p className=" text-sm mb-2">{news?.createdAt.slice(0, 10)}</p>

            <div className="text-neutral-content">
              <p>{news?.shortDescription}</p>
              <div className="w-[90%] md:w-1/2 mx-auto">
                <Link to={detailsAdd?.link} target="_blank">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${
                      detailsAdd?.image
                    }`}
                    alt=""
                    className="w-full h-14 mx-auto"
                  />
                </Link>
              </div>
              <p>{perserDescription}</p>
            </div>
          </div>

          <div className="shrink-0 md:w-72 w-full">
            {/* ----------------recent news---------------- */}
            <RecentNews />
            {/* category */}
            <div className=" w-full bg-white p-4 rounded-md mt-5">
              <SectionHeader title="Category" />
              <CategoryLength />
            </div>
            <div className="mt-4">
              <SidebarAdd />
            </div>
          </div>
        </div>

        {/* ------------------related news------------------ */}
        <div className="my-10">
          <SectionHeader title="Related News" />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {newses
              ?.filter((news) => news._id !== data?.data?._id)
              .map((news) => (
                <NewsCard key={news?._id} news={news} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
