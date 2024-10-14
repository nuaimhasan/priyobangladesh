import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../../redux/category/categoryApi";

export default function EditNewsCategories() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetCategoryByIdQuery(id);
  const category = data?.data;

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const order = e.target.order.value;

    const data = {
      category,
      order,
    };

    const res = await updateCategory({ id, data });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigate("/admin/categories");
    } else {
      toast.error(res?.data?.message || "Failed to update category");
      console.log(res);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg md:w-1/2 w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">
            Edit News Category
          </h1>

          <div className=" py-10">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Enter Category"
                    defaultValue={category?.category}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Order</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    placeholder="Enter Order"
                    defaultValue={category?.order}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading && "disabled"}
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    {isLoading ? "Loading..." : "Update Category"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
