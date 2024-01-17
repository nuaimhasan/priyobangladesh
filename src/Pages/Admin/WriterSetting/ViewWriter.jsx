import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";

const data = [
  {
    _id: 1,
    title: "Messi kick the goal",
    image: "/images/tools.jpeg",
    category: "Sports",
    writer: "Khalid",
    createdAt: "2021-08-01T18:30:00.000Z",
    status: "active",
  },
  {
    _id: 2,
    title: "Messi kick the goal",
    image: "/images/tools.jpeg",
    category: "Sports",
    writer: "Khalid",
    createdAt: "2023-12-01T18:30:00.000Z",
    status: "pending",
  },
];

export default function ViewWriter() {
  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg rounded-md">
        <div className=" p-10  flex md:flex-row flex-col items-center justify-center mx-auto gap-5">
          <img
            src="/images/profile.png"
            alt=""
            className="h-32 w-32 rounded-full"
          />
          <div className="text-center md:text-left">
            <h1 className="text-xl font-semibold">Khalid Hasan</h1>
            <p className="text-sm font-medium">( khalid_hasan )</p>
            <p className="text-gray-500">Writer</p>
            <p>0123456789</p>
          </div>
        </div>
        <div className="flex items-center gap-5 w-full pl-3 pb-3">
          <select
            // value={filter}
            // onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-400 rounded-md p-1 text-sm md:w-[20%] w-[35%] focus:outline-none focus:border-primary"
          >
            <option value="all">--Select Status--</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="deactive">Deactive</option>
          </select>

          <input
            type="text"
            // value={searchQuery}
            // onChange={handleSearchChange}
            className="border border-gray-400 rounded-md p-1 text-sm md:w-1/4 focus:outline-none focus:border-primary placeholder:text-xs"
            placeholder="Search Title..."
          />
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
            {data?.map((data) => (
              <tr key={data?._id}>
                <td>{data?.title}</td>
                <td>
                  <img src={data?.image} alt="" className="h-12 w-24" />
                </td>
                <td>{data?.category}</td>
                <td>{data?.writer}</td>
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
                      to={`/admin/news/${data?._id}`}
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
