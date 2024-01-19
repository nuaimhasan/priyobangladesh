/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import Pagination from "../../../Components/UI/Pagination";
import {
  useDeleteNewsMutation,
  useGetNewsByWriterQuery,
} from "../../../redux/news/newsApi";
import Spinner from "../../../Components/Spinner/Spinner";

export default function WriterNewsesList() {
  const { loggedUser } = useSelector((state) => state.user);
  const writerId = loggedUser?.data?._id;

  const [deleteNews, { isSuccess, isError }] = useDeleteNewsMutation();

  const query = {};
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  query["status"] = status;
  query["title"] = title;
  query["page"] = page;
  query["limit"] = limit;
  const { data, isLoading } = useGetNewsByWriterQuery({ writerId, ...query });
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

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (pageNumber > data?.meta?.total / limit) return;

    setPage(pageNumber);
  };
  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="md:text-xl text-base font-semibold">All News</h1>
          <Link
            to="/writer/news/add-news"
            className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
          >
            Add News
          </Link>
        </div>
        <div className="flex items-center gap-5 w-full">
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 rounded-md p-1 text-sm md:w-[20%] w-[35%] focus:outline-none focus:border-primary"
          >
            <option value="" disabled>
              --Select Status--
            </option>
            <option value="" selected>
              All
            </option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>

          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded-md p-1 text-sm md:w-1/4 focus:outline-none focus:border-primary placeholder:text-xs"
            placeholder="Search Title, Category..."
          />
        </div>
      </div>

      {/* all news */}
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1 pb-5 min-h-[80vh]">
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
                <td>
                  {data?.title?.length > 40
                    ? data?.title.slice(0, 40) + "..."
                    : data?.title}
                </td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                      data?.image
                    }`}
                    alt=""
                    className="h-10 rounded"
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
                      to={`/writer/news/${data?._id}`}
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

        {/* pagination */}
        {newses?.length > 5 && (
          <Pagination
            handlePageChange={handlePageChange}
            limit={limit}
            total={data?.meta?.total}
            page={page}
          />
        )}
      </div>
    </div>
  );
}
