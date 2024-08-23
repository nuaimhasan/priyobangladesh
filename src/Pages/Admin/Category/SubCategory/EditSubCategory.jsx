import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../../redux/category/categoryApi";
import { useEffect, useState } from "react";

export default function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(1);
  const [category, setCategory] = useState("");

  const { data } = useGetAllCategoryQuery();
  const categories = data?.data;

  useEffect(() => {
    if (categories?.length > 0) {
      setOrder(categories?.length + 1);
    }
  }, [categories]);

  const [addNewsCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subCategory = e.target.subCategory.value;
    const category = e.target.category.value;
    const order = e.target.order.value;

    const data = {
      subCategory,
      category,
      order,
    };

    let res = await addNewsCategory(data);
    if (res?.data?.success) {
      navigate("/admin/subCategories");
    } else {
      console.log(res);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg lg:w-1/2 w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">
            Add Sub Category
          </h1>

          <div className=" py-10">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-content">Sub Category</p>
                  <input
                    type="text"
                    name="subCategory"
                    className="border px-2 py-1.5 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-content">Category</p>
                  <select
                    name="category"
                    className="border px-2 py-1.5 rounded-md focus:outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-content">Order</p>
                  <input
                    type="number"
                    name="order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="border px-2.5 py-1.5 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading && "disabled"}
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    {isLoading ? "Loading..." : "Submit"}
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
