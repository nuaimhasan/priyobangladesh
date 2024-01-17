import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useGetWritersQuery,
  useUpdateWriterStatusMutation,
} from "../../../redux/user/userApi";

export default function AllWriters() {
  const query = {};
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  query["status"] = status;
  query["name"] = name;
  const { data, isLoading } = useGetWritersQuery({ ...query });

  const [updateStatus, { isLoading: statusLoading }] =
    useUpdateWriterStatusMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const writers = data?.data;

  const handleStatus = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to change the status of this news?"
    );
    if (!confirm) return;

    await updateStatus(id);
  };

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="md:text-xl text-base font-semibold">All Writers</h1>
          <Link
            to="/admin/writers/add-writer"
            className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
          >
            Add Writer
          </Link>
        </div>
        <div className="flex items-center gap-5 w-full">
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 rounded-md p-1 text-sm md:w-[20%] w-[35%] focus:outline-none focus:border-primary"
          >
            <option value="">--Select Status--</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded-md p-1 text-sm md:w-1/4 focus:outline-none focus:border-primary placeholder:text-xs"
            placeholder="Search Name..."
          />
        </div>
      </div>

      {/* all news */}
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>User-Name</th>
              <th>Image</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {writers?.map((writer, i) => (
              <tr key={writer?._id}>
                <td>{i + 1}</td>
                <td>{writer?.name}</td>
                <td>{writer?.userName}</td>
                <td>
                  <img
                    src={
                      writer?.image
                        ? `${import.meta.env.VITE_BACKEND_URL}/user/${
                            writer?.image
                          }`
                        : "/images/profile.png"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                </td>

                <td>{writer?.phone}</td>
                <td>
                  <button
                    onClick={() => handleStatus(writer?._id)}
                    className={`text-white px-2 py-1 rounded-md text-xs ${
                      writer?.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {statusLoading ? (
                      <span className="text-xs">Updating...</span>
                    ) : (
                      writer?.status
                    )}
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/writers/${writer?.userName}`}
                      className="hover:text-primary text-lg"
                    >
                      <FaRegEye />
                    </Link>
                    <button className="hover:text-primary text-lg">
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
