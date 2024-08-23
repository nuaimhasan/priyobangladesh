import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../../redux/category/categoryApi";
import Spinner from "../../../../Components/Spinner/Spinner";

export default function SubCategories() {
  const { data, isLoading } = useGetAllCategoryQuery();
  const categories = data?.data;
  const [deleteCategory, { isSuccess, isError }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Category Deleted Successfully", "success");
    }
    if (isError) {
      Swal.fire("", "An error occured when deleting", "error");
    }
  }, [isSuccess, isError]);

  if (isLoading) return <Spinner />;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    await deleteCategory(id);
  };

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between">
        <h1 className="md:text-xl text-base font-semibold">Sub Categories</h1>
        <Link
          to="/admin/subCategories/add"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>SL</th>
              <th>Sub Category</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories?.map((category, i) => (
              <tr key={category?._id}>
                <td>{i + 1}</td>
                <td>{category?.category}</td>
                <td>{category?.category}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/categories/edit-category/${category?._id}`}
                      className="hover:text-primary text-lg"
                    >
                      <FiEdit3 />
                    </Link>
                    <button
                      onClick={() => handleDelete(category?._id)}
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
