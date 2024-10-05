import { FaChartLine, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { LuNewspaper } from "react-icons/lu";
import { MdMonitor, MdOutlineDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../../redux/user/userSlice";
import SidebarItems from "./SidebarItems";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
          title: "Category",
          subSubMenu: [
            {
              title: "Categories",
              path: "/admin/categories",
            },
            {
              title: "Sub Categories",
              path: "/admin/subCategories",
            },
          ],
        },
        {
          title: "All Newses",
          path: "/admin/news",
        },
        {
          title: "My Newses",
          path: "/admin/my-news",
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
          title: "Advertise",
          path: "/admin/front-end/advertise",
        },
        {
          title: "Social",
          path: "/admin/front-end/social",
        },
        {
          title: "Contact",
          path: "/admin/front-end/contact",
        },
      ],
    },
    {
      icon: <FaChartLine />,
      title: "SEO Setting",
      path: "/admin/seo",
    },
  ];

  const handelLogout = () => {
    let isConfirm = window.confirm("Are you sure you want to logout?");
    if (!isConfirm) return;
    dispatch(userLogout());
    toast.success("Logout Success");
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
      </div>

      <div className="p-2 ">
        <button
          className="w-full p-3 flex items-center justify-center gap-1 text-sm bg-primary text-base-100"
          onClick={handelLogout}
        >
          <IoIosLogOut className="text-lg" />
          Log Out
        </button>
      </div>
    </div>
  );
}
