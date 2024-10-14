/* eslint-disable react/prop-types */
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbWorldWww } from "react-icons/tb";

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
          <Link to="/" title="Visit Front-End" target="_blank">
            <TbWorldWww className="text-xl" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="">{loggedUser?.data?.name}</p>
          </div>

          <img
            src={
              loggedUser?.data?.image
                ? `${import.meta.env.VITE_BACKEND_URL}/user/${
                    loggedUser?.data?.image
                  }`
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
