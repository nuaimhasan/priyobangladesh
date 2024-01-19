import { FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { LuNewspaper } from "react-icons/lu";
import { MdMonitor, MdOutlineDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../../redux/user/userSlice";
import SidebarItems from "./SidebarItems";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAllLogoQuery } from "../../../redux/logo/logoApi";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllLogoQuery();

  const adminSidebarItems = [
    {
      icon: <MdOutlineDashboard />,
      title: "Dashbaord",
      path: "/admin/dashboard",
    },
    {
      icon: <LuNewspaper />,
      title: "News",
      subMenu: [
        {
          title: "Categories",
          path: "/admin/categories",
        },
        {
          title: "All Newses",
          path: "/admin/news",
        },
        {
          title: "Admin Newses",
          path: "/admin/admin-news",
        },
      ],
    },
    {
      icon: <ImProfile />,
      title: "Profile",
      path: "/admin/profile",
    },
    {
      icon: <FaUsers />,
      title: "Admins",
      path: "/admin/admins",
    },
    {
      icon: <FaUsers />,
      title: "Writers",
      path: "/admin/writers",
    },
    {
      icon: <MdMonitor />,
      title: "Front-End Setting",
      subMenu: [
        {
          title: "Logo",
          path: "/admin/front-end/logo",
        },
        {
          title: "About Us",
          path: "/admin/front-end/about-us",
        },
        {
          title: "Contact Us",
          path: "/admin/front-end/contact-us",
        },
        {
          title: "Advertise",
          path: "/admin/front-end/advertise",
        },
        {
          title: "Theme",
          path: "/admin/front-end/theme",
        },
        {
          title: "Breaking News",
          path: "/admin/front-end/breaking-news",
        },
      ],
    },
  ];

  const handelLogout = () => {
    dispatch(userLogout());
    Swal.fire("", "Logout Successfully", "success");
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <Link to="/admin/dashboard" className="block border-b py-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
              data?.data[0]?.logo
            }`}
            alt=""
            className="w-44 sm:w-48 mx-auto"
          />
        </Link>

        <nav className="admin_siderbar">
          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>

        <button
          className="p-3 flex items-center gap-1 text-sm"
          onClick={handelLogout}
        >
          <IoIosLogOut className="text-lg" />
          Log Out
        </button>
      </div>

      <div className="p-2 flex justify-between items-center font-light">
        <p>Visit Front-End :</p>
        <Link to="/" className="text-primary font-medium hover:underline">
          Daily News
        </Link>
      </div>
    </div>
  );
}
