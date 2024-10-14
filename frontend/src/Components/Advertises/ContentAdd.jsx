import { Link } from "react-router-dom";
import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";

export default function ContentAdd() {
  const query = {};
  query["showingPlace"] = "section";
  const { data } = useGetAllAdvertiseQuery({ ...query });
  const add = data?.data[0];

  return (
    <div className="w-[95%] sm:w-1/2 mx-auto">
      <Link to={add?.link} target="_blank">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${add?.image}`}
          alt=""
          className="w-full h-14 md:h-20 rounded"
        />
      </Link>
    </div>
  );
}
