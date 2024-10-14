import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useDeleteUserMutation,
  useGetAdminsQuery,
} from "../../../redux/user/userApi";
import Spinner from "../../../Components/Spinner/Spinner";
import { useSelector } from "react-redux";

export default function AllAdmins() {
  const { loggedUser } = useSelector((state) => state.user);
  const { data, isLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteUserMutation();

  if (isLoading) return <Spinner />;

  const admins = data?.data;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirm) return;

    if (admins?.length === 1) {
      toast.error("You can't delete the last admin");
      return;
    }

    if (loggedUser?.data?._id === id) {
      toast.error("You can't delete yourself");
      return;
    }

    const res = await deleteAdmin(id);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message || "Failed to delete admin");
      console.log(res);
    }
  };

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between">
        <h1 className="md:text-xl text-base font-semibold">All Admins</h1>
        <Link
          to="/admin/admins/add-admin"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          Add Admin
        </Link>
      </div>

      {/* all news */}
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Name</th>
              <th>User-Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins?.map((admin, i) => (
              <tr key={admin?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={
                      admin?.image
                        ? `${import.meta.env.VITE_BACKEND_URL}/user/${
                            admin?.image
                          }`
                        : "/images/profile.png"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td>{admin?.name}</td>
                <td>{admin?.userName}</td>

                <td>{admin?.phone}</td>

                <td>
                  <div className="flex items-center gap-2">
                    {/* <Link
                      to={`/admin/admins/edit-admin/${admin?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FiEdit3 />
                    </Link> */}
                    <button
                      onClick={() => handleDelete(admin?._id)}
                      className="hover:text-primary text-lg"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
