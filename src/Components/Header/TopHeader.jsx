import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { useGetAllContactUsQuery } from "../../redux/contactUs/contactUsApi";

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

  const { data } = useGetAllContactUsQuery();
  const contactUs = data?.data[0];

  return (
    <div className="bg-secondary hidden sm:flex">
      <div className="container py-2 flex items-center  justify-between">
        <p className="text-white text-xs">
          {today} - {time}
        </p>
        <div className="flex items-center gap-x-4 text-white text-sm">
          <a href={contactUs?.facebook}>
            <FaFacebookF />
          </a>
          <a href={contactUs?.twitter}>
            <FaTwitter />
          </a>
          <a href={contactUs?.youtube}>
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
}
