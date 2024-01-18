import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useDeleteAdvertiseMutation,
  useGetAllAdvertiseQuery,
} from "../../../../redux/advertise/advertiseApi";
import Spinner from "../../../../Components/Spinner/Spinner";

export default function Advertises() {
  const { data, isLoading } = useGetAllAdvertiseQuery();
  const advertises = data?.data;

  const [deleteAdvertise, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeleteAdvertiseMutation();

  useEffect(() => {
    if (deleteSuccess) {
      Swal.fire("", "Advertise Deleted Successfully", "success");
    }
    if (deleteError) {
      Swal.fire("", "An error occured when deleting", "error");
    }
  }, [deleteSuccess, deleteError]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (confirm) {
      await deleteAdvertise(id);
    }
  };

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between">
        <h1 className="md:text-xl text-base font-semibold">Advertises</h1>
        <Link
          to="/admin/front-end/advertise/add-advertise"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          Add Advertise
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {advertises?.map((advertise, i) => (
              <tr key={advertise?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${
                      advertise?.image
                    }`}
                    alt=""
                    className="h-12"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/front-end/advertise/edit-advertise/${advertise?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FiEdit3 />
                    </Link>
                    <button
                      onClick={() => handleDelete(advertise?._id)}
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
