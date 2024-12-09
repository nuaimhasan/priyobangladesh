import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination/Pagination";
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
  useUpdateStatusMutation,
} from "../../../redux/news/newsApi";
import Spinner from "../../Spinner/Spinner";
import toast from "react-hot-toast";

export default function NewsesListComponent() {
  const [updateStatus, { isLoading: statusLoading }] =
    useUpdateStatusMutation();
  const [deleteNews] = useDeleteNewsMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");

  const query = {};
  query["limit"] = 5;
  query["status"] = status;
  query["title"] = title;
  query["page"] = currentPage;
  query["limit"] = 10;

  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirm) return;

    const res = await deleteNews(id);
    if (res?.data) {
      toast.success("News Deleted Successfully");
    } else {
      toast.error(res?.error?.message || "Failed to delete news");
      console.log(res);
    }
  };

  const handleStatus = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to change the status of this news?"
    );
    if (!confirm) return;

    const res = await updateStatus(id);

    if (res?.data?.success) {
      toast.success("Status Updated Successfully");
    } else {
      toast.error(res?.error?.message || "Failed to update status");
      console.log(res);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-base-100 rounded p-4 mt-1">
      <div className="flex items-center gap-5 w-full">
        <select
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className="border border-gray-400 rounded-md p-1 text-sm md:w-[20%] w-[35%] focus:outline-none focus:border-primary"
        >
          <option value="" selected>
            All
          </option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>

        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-gray-400 rounded-md p-1 text-sm md:w-1/4 focus:outline-none focus:border-primary placeholder:text-xs"
          placeholder="Search Title, Category..."
        />
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Writer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newses?.map((data) => (
              <tr key={data?._id}>
                <td>
                  {data?.title?.length > 30
                    ? data?.title?.slice(0, 30) + "..."
                    : data?.title}
                </td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      data?.image
                    }`}
                    alt=""
                    className="h-8 rounded"
                  />
                </td>
                <td>{data?.category?.category}</td>
                <td>{data?.subCategory?.name}</td>
                <td>{data?.writer?.name}</td>
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

      {data?.meta?.pages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={data?.meta?.pages}
        />
      )}
    </div>
  );
}
