/* eslint-disable react/prop-types */
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import BreadCrumb from "../../UI/BreadCrumb";

export default function AdminHeader({ setSidebar }) {
  const { loggedUser } = useSelector((state) => state.user);

  return (
    <header className="py-3 px-6 bg-base-100 text-neutral shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>
          <div className="hidden lg:block">
            <BreadCrumb maxSegmentsToShow={3} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="">{loggedUser?.data?.name}</p>
          </div>

          <img
            src={
              loggedUser?.data?.image
                ? `${import.meta.env.VITE_BACKEND_URL}/user/${loggedUser?.data?.image}`
                : "/images/profile.png"
            }
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
