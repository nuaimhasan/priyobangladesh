import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import MenuHeader from "./MenuHeader";
import TopHeader from "./TopHeader";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";
import { useGetAllLogoQuery } from "../../redux/logo/logoApi";

export default function Header() {
  const { data } = useGetAllLogoQuery();
  const { data: advertises } = useGetAllAdvertiseQuery();

  return (
    <>
      <TopHeader />
      {/* --------------- */}

      <div className="bg-white">
        <div className="container">
          <div className="flex items-center justify-between py-2">
            <Link to="/">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                  data?.data[0]?.logo
                }`}
                alt=""
                className="md:h-20 h-16"
              />
            </Link>
            <div className="w-1/2 rounded-md ">
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
                className="w-full md:h-20 h-16"
              >
                {advertises?.data?.map((advertise) => (
                  <SwiperSlide key={advertise?._id}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${
                        advertise?.image
                      }`}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* --------------- */}
      <MenuHeader />
    </>
  );
}
