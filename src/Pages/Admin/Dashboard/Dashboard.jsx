/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
  useUpdateStatusMutation,
} from "../../../redux/news/newsApi";
import { useGetWritersQuery } from "../../../redux/user/userApi";

export default function Dashboard() {
  const [updateStatus, { isLoading: statusLoading }] =
    useUpdateStatusMutation();
  const [deleteNews, { isSuccess, isError }] = useDeleteNewsMutation();
  const { data: writerData } = useGetWritersQuery();
  const writers = writerData?.data;

  const query = {};
  const [limit, setLimit] = useState(10);
  query["limit"] = limit;
  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "News Deleted Successfully", "success");
    }
    if (isError) {
      Swal.fire("", "An error occured when deleting", "error");
    }
  }, [isSuccess, isError]);

  if (isLoading) return <h1>Loading...</h1>;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirm) return;

    await deleteNews(id);
  };

  const handleStatus = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to change the status of this news?"
    );
    if (!confirm) return;

    await updateStatus(id);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.length > 0 ? newses?.length : 0}
          </h1>
          <p>Total News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((news) => news.status === "pending").length > 0
              ? newses?.filter((news) => news.status === "pending").length
              : 0}
          </h1>
          <p>Pending News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((news) => news.status === "active").length > 0
              ? newses?.filter((news) => news.status === "active").length
              : 0}
          </h1>
          <p>Active News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((news) => news.status === "inactive").length > 0
              ? newses?.filter((news) => news.status === "inactive").length
              : 0}
          </h1>
          <p>Inactive News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {writers?.length > 0 ? writers?.length : 0}
          </h1>
          <p>Writers</p>
        </div>
      </div>

      {/* recent news */}

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between mt-14">
        <h1 className="md:text-xl text-base font-semibold">Recent News</h1>
        <Link
          to="/admin/news"
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
                    className="h-12"
                  />
                </td>
                <td>{data?.category?.category}</td>
                <td>{data?.writer?.name}</td>
                <td>{data?.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    onClick={() => handleStatus(data?._id)}
                    className={`text-white px-2 py-1 rounded-md text-xs ${
                      data?.status === "active"
                        ? "bg-green-500"
                        : data?.status === "inactive"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {statusLoading ? (
                      <span className="text-xs">Updating...</span>
                    ) : (
                      data?.status
                    )}
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/news/${data?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      to={`/admin/news/edit-news/${data?._id}`}
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
