import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import { useGetAllCategoryQuery } from "../../../../redux/category/categoryApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetSubCategoryByIdQuery,
  useUpdateSubCategoryMutation,
} from "../../../../redux/subCategoryApi/subCategoryApi";

export default function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSubCategoryByIdQuery(id);
  const subCategory = data?.data;

  const [category, setCategory] = useState("");
  useEffect(() => {
    if (subCategory) {
      setCategory(subCategory?.category?._id);
    }
  }, [subCategory]);

  const { data: cData } = useGetAllCategoryQuery();
  const categories = cData?.data;

  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.subCategory.value;
    const category = e.target.category.value;
    const order = e.target.order.value;

    const data = {
      name,
      category,
      order,
    };

    let res = await updateSubCategory({ id, data });

    if (res?.data?.success) {
      toast.success("Sub Category Updated Successfully");
      navigate("/admin/subCategories");
    } else {
      console.log(res);
      toast.error(res?.data?.message || "Something went wrong");
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
            Edit Sub Category
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
                    defaultValue={subCategory?.name}
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
                    className="border px-2.5 py-1.5 rounded-md focus:outline-none"
                    defaultValue={subCategory?.order}
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
