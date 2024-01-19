import SectionHeader from "../UI/SectionHeader";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";

export default function LatestNews() {
  const query = {};
  query["limit"] = 5;
  query["status"] = "active";
  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  let content = null;
  if (isLoading) {
    content = (
      <div>
        <SectionHeader title="Latest News" />
        <div className="animate-pulse">
          <div className="bg-base-100 h-[320px] rounded"></div>
        </div>
      </div>
    );
  }
  if (!isLoading && data?.data?.length > 0) {
    content = (
      <div className="rounded-md relative">
        <div className="absolute top-0 left-0">
          <SectionHeader title="Latest News" />
        </div>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className="w-full sm:h-[385px] pt-10 sm:pt-[52px]"
        >
          {newses?.map((news) => (
            <SwiperSlide key={news._id}>
              <Link to={`/news/${news?.category?.slug}/${news.slug}`}>
                <div className="relative w-full h-full">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      news?.image
                    }`}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                  <div className="bg-[#0000002d] rounded w-full h-full absolute top-0 left-0 text-white flex flex-col justify-end px-4 pb-2">
                    <span className="w-max bg-primary text-white px-3 py-1 rounded-md text-xs">
                      {news?.category?.category?.toUpperCase() || "News"}
                    </span>
                    <h1 className="text-lg text-white font-medium my-1">
                      {news?.title?.length > 50
                        ? news?.title?.substring(0, 50) + "..."
                        : news?.title}
                    </h1>
                    <p className="text-white text-xs">
                      {news?.createdAt.split("T")[0]} | {news?.writer?.name}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return <div className="latest_news">{content}</div>;
}
