import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { useGetSocialQuery } from "../../redux/socialApi";
import { Link } from "react-router-dom";

export default function TopHeader() {
  const date = new Date();
  const today = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const { data: social } = useGetSocialQuery();

  return (
    <div className="bg-secondary hidden sm:flex">
      <div className="container py-2 flex items-center  justify-between">
        <p className="text-white text-xs">
          {today} - {time}
        </p>
        <div className="flex items-center gap-x-4 text-white text-sm">
          <Link to={social?.data?.facebook} target="_blank">
            <FaFacebookF />
          </Link>

          <Link to={social?.data?.twitter} target="_blank">
            <FaTwitter />
          </Link>

          <Link to={social?.data?.youtube} target="_blank">
            <FaYoutube />
          </Link>
        </div>
      </div>
    </div>
  );
}
