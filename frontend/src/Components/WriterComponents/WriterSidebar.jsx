import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userLogout } from "../../redux/user/userSlice";
import SidebarItems from "../AdminComponents/AdminSidebar/SidebarItems";

export default function WriterSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const writerSidebarItems = [
    {
      icon: <MdOutlineDashboard />,
      title: "Dashbaord",
      path: "/writer/dashboard",
    },
    {
      icon: <LuNewspaper />,
      title: "News",
      subMenu: [
        {
          title: "All Newses",
          path: "/writer/news",
        },
      ],
    },
    {
      icon: <ImProfile />,
      title: "Profile",
      path: "/writer/profile",
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
        <Link to="/writer/dashboard" className="block border-b py-4">
          {/* <img
            src={'/images/news-portal.png'}
            alt=""
            className="w-28 mx-auto h-16"
          /> */}
          <p className="text-2xl font-bold text-primary px-5 uppercase">
            Daily News
          </p>
        </Link>

        <nav className="admin_siderbar">
          <ul>
            {writerSidebarItems?.map((item, i) => (
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
