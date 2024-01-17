/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../UI/SectionHeader";

// Import Swiper styles
import { useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";

export default function LatestNews() {
  const query = {};
  const [limit, setLimit] = useState(3);
  const [status, setStatus] = useState("active");

  query["limit"] = limit;
  query["status"] = status;

  const { data } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  return (
    <div className="">
      <SectionHeader title="Latest News" />

      <div className="rounded-md">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="w-full h-[20.75rem]"
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
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-primary text-white p-1 rounded-md text-xs">
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
    </div>
  );
}
