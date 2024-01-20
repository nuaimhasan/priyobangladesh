import { Link } from "react-router-dom";
import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";

export default function SidebarAdd() {
  const query = {};
  query["showingPlace"] = "sidebar";
  const { data } = useGetAllAdvertiseQuery({ ...query });
  const add = data?.data[0];

  return (
    <Link to={add?.link} target="_blank">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${add?.image}`}
          alt=""
          className="w-full h-44 rounded"
        />
      </Link>
  );
}
