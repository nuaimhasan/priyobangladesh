import { useState } from "react";
import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";

export default function MobileFooterAdd() {
  const query = {};
  query["showingPlace"] = "footer";
  const { data } = useGetAllAdvertiseQuery({ ...query });
  const add = data?.data[0];

  const [show, setShow] = useState(true);

  return (
    <div
      className={`w-full h-14 sm:hidden border-t fixed bottom-0 left-0 ${
        !show && "hidden"
      }`}
    >
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${add?.image}`}
          alt=""
          className="w-[95%] h-14 mx-auto"
        />

        <button
          onClick={() => setShow(false)}
          className="absolute -top-5 left-0 text-red-500"
        >
          x
        </button>
      </div>
    </div>
  );
}
