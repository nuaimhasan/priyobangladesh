import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function HeaderAdd() {
  const query = {};
  query["showingPlace"] = "header";
  const { data: advertises } = useGetAllAdvertiseQuery({ ...query });
  return (
    <div className="w-1/2 rounded-md hidden md:block">
      <Swiper
        direction={"vertical"}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="w-full h-16"
      >
        {advertises?.data?.map((advertise) => (
          <SwiperSlide key={advertise?._id}>
            <Link to={advertise?.link} target="_blank">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${
                  advertise?.image
                }`}
                alt=""
                className="w-full h-16 object-cover rounded-md"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
