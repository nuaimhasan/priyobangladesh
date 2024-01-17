/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../UI/SectionHeader";

// Import Swiper styles
import { useState } from "react";
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
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
