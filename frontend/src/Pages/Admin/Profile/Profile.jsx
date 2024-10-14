import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useGetUserByIdQuery } from "../../../redux/user/userApi";

export default function Profile() {
  const { loggedUser } = useSelector((state) => state.user);
  const id = loggedUser?.data?._id;

  const { data } = useGetUserByIdQuery(id);

  const profile = data?.data;

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <h1 className="md:text-2xl text-xl font-semibold text-center">
            My Profile
          </h1>

          <div className="p-10 md:w-1/2 border border-gray-300 flex md:flex-row flex-col items-center justify-center mx-auto gap-5 rounded-md mt-10 relative">
            <div className="absolute top-2 right-2 border border-gray-400 rounded-full p-1">
              <Link
                to={`/admin/profile/update-profile`}
                className="hover:text-primary text-lg"
              >
                <FiEdit3 />
              </Link>
            </div>
            <img
              src={
                profile?.image
                  ? `${import.meta.env.VITE_BACKEND_URL}/user/${profile?.image}`
                  : "/images/profile.png"
              }
              alt=""
              className="h-32 w-32 rounded-full"
            />
            <div className="text-center md:text-left">
              <h1 className="text-xl font-semibold">{profile?.name}</h1>
              <p className="text-sm font-medium">({profile?.userName})</p>
              <p className="text-gray-500">{profile?.role}</p>
              <p>{profile?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
