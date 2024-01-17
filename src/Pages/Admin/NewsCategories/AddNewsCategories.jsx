import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../redux/category/categoryApi";

export default function AddNewsCategories() {
  const navigate = useNavigate();

  const { data } = useGetAllCategoryQuery();

  const [addNewsCategory, { isLoading, isSuccess, isError }] =
    useCreateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Categories Added Successfully", "success");
      navigate("/admin/categories");
    }
    if (isError) {
      Swal.fire("", "An error occured when adding", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const order = e.target.order.value;

    const data = {
      category,
      order,
    };

    await addNewsCategory(data);
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg md:w-1/2 w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">
            Add News Category
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
                    defaultValue={data?.data?.length + 1}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading && "disabled"}
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    {isLoading ? "Loading..." : "Add Category"}
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
