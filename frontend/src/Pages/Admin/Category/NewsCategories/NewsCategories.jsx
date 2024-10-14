import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../../redux/category/categoryApi";
import Spinner from "../../../../Components/Spinner/Spinner";
import { toast } from "react-hot-toast";

export default function NewsCategories() {
  const { data, isLoading } = useGetAllCategoryQuery();
  const categories = data?.data;
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    const res = await deleteCategory(id);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message || "Failed to delete category");
      console.log(res);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between">
        <h1 className="md:text-xl text-base font-semibold">News Categories</h1>
        <Link
          to="/admin/categories/add-category"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          Add Category
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>SL</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories?.map((category, i) => (
              <tr key={category?._id}>
                <td>{i + 1}</td>
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
