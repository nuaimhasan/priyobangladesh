import { Link } from "react-router-dom";
import MenuHeader from "./MenuHeader";
import TopHeader from "./TopHeader";
import "swiper/css";
import { useGetAllLogoQuery } from "../../redux/logo/logoApi";
import HeaderAdd from "../Advertises/HeaderAdd";

export default function Header() {
  const { data, isLoading } = useGetAllLogoQuery();

  return (
    <>
      <TopHeader />
      {/* --------------- */}

      <div className="bg-white">
        <div className="container">
          <div className="md:flex items-center justify-between py-1">
            <Link to="/">
              <img
                src={
                  isLoading
                    ? "/images/logo.png"
                    : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                        data?.data[0]?.logo
                      }`
                }
                alt="logo"
                className={`w-52 sm:w-72 mx-auto`}
              />
            </Link>

            <HeaderAdd />
          </div>
        </div>
      </div>

      {/* --------------- */}
      <MenuHeader />
    </>
  );
}
