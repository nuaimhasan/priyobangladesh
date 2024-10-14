import { FaRegEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useGetNewsByWriterQuery,
  useUpdateStatusMutation,
} from "../../../redux/news/newsApi";
import { useGetUserBySlugQuery } from "../../../redux/user/userApi";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";

export default function ViewWriter() {
  const { userName } = useParams();
  const { data: userData } = useGetUserBySlugQuery(userName);
  const user = userData?.data;
  const writerId = user?._id;

  const [currentPage, setCurrentPage] = useState(1);
  const query = {};
  query["limit"] = 5;
  query["page"] = currentPage;

  const { data: newsData } = useGetNewsByWriterQuery({ writerId, ...query });
  const data = newsData?.data;

  const [updateStatus, { isLoading: statusLoading }] =
    useUpdateStatusMutation();

  const handleStatus = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to change the status of this news?"
    );
    if (!confirm) return;

    const res = await updateStatus(id);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message || "Failed to update status");
      console.log(res);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg rounded-md">
        <div className=" p-10  flex md:flex-row flex-col items-center justify-center mx-auto gap-5">
          <img
            src={
              user?.image
                ? `${import.meta.env.VITE_BACKEND_URL}/user/${user?.image}`
                : "/images/profile.png"
            }
            alt=""
            className="h-32 w-32 rounded-full"
          />
          <div className="text-center md:text-left">
            <h1 className="text-xl font-semibold">{user?.name}</h1>
            <p className="text-sm font-medium">({user?.userName})</p>
            <p className="text-gray-500">{user?.role}</p>
            <p>{user?.phone}</p>
          </div>
        </div>
      </div>

      {/* all news */}
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
            {data?.map((news) => (
              <tr key={news?._id}>
                <td>{news?.title}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      news?.image
                    }`}
                    alt=""
                    className="h-12 w-24"
                  />
                </td>
                <td>{news?.category?.category}</td>
                <td>{news?.writer?.name}</td>
                <td>{news?.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    onClick={() => handleStatus(news?._id)}
                    className={`text-white px-2 py-1 rounded-md text-xs ${
                      news?.status === "active"
                        ? "bg-green-500"
                        : news?.status === "inactive"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {statusLoading ? (
                      <span className="text-xs">Updating...</span>
                    ) : (
                      news?.status
                    )}
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/news/${news?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FaRegEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {newsData?.meta?.pages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={newsData?.meta?.pages}
        />
      )}
    </div>
  );
}
