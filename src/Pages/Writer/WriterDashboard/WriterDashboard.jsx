import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteNewsMutation,
  useGetNewsByWriterQuery,
} from "../../../redux/news/newsApi";
import Spinner from "../../../Components/Spinner/Spinner";

export default function WriterDashboard() {
  const { loggedUser } = useSelector((state) => state.user);
  const writerId = loggedUser?.data?._id;

  const [deleteNews, { isSuccess, isError }] = useDeleteNewsMutation();
  const { data, isLoading } = useGetNewsByWriterQuery(writerId);
  const newses = data?.data;

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "News Deleted Successfully", "success");
    }
    if (isError) {
      Swal.fire("", "An error occured when deleting", "error");
    }
  }, [isSuccess, isError]);

  if (isLoading) return <Spinner />;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirm) return;

    await deleteNews(id);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.length ? newses?.length : 0}
          </h1>
          <p>Total News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((data) => data?.status === "pending").length}
          </h1>
          <p>Pending News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((data) => data?.status === "active").length}
          </h1>
          <p>Active News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((data) => data?.status === "inactive").length}
          </h1>
          <p>Inactive News</p>
        </div>
      </div>

      {/* recent news */}

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between mt-14">
        <h1 className="md:text-xl text-base font-semibold">Recent News</h1>
        <Link
          to="/writer/news"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          View All News
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Category</th>
              <th>Writer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {newses?.map((data) => (
              <tr key={data?._id}>
                <td>{data?.title}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      data?.image
                    }`}
                    alt=""
                    className="h-12 w-24"
                  />
                </td>
                <td>{data?.category?.category}</td>
                <td>{data?.writer?.name}</td>
                <td>{data?.createdAt.split("T")[0]}</td>
                <td>
                  <span
                    className={`${
                      data?.status === "active"
                        ? "bg-green-500"
                        : data?.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } text-white px-2 py-1 rounded-md text-xs`}
                  >
                    {data?.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/${loggedUser?.data?.role}/news/${data?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      to={`/writer/news/edit-news/${data?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FiEdit3 />
                    </Link>
                    <button
                      onClick={() => handleDelete(data?._id)}
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
