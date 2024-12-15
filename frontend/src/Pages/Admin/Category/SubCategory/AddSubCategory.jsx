import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import { useGetAllCategoryQuery } from "../../../../redux/category/categoryApi";
import {
  useAddSubCategoryMutation,
  useGetAllSubCategoryQuery,
} from "../../../../redux/subCategoryApi/subCategoryApi";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(1);
  const { data } = useGetAllSubCategoryQuery();

  const { data: categoryData } = useGetAllCategoryQuery();
  const categories = categoryData?.data;

  useEffect(() => {
    if (data?.data?.length > 0) {
      setOrder(data?.data?.length + 1);
    }
  }, [data]);

  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.subCategory.value;
    const nameEN = e.target.subCategoryEN.value;
    const category = e.target.category.value;
    const order = e.target.order.value;

    const data = {
      name,
      nameEN,
      category,
      order,
    };

    let res = await addSubCategory(data);

    if (res?.data?.success) {
      Swal.fire("", "sub category add success", "success");
      navigate("/admin/subCategories");
    } else {
      Swal.fire("", "something went wrong!", "error");
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
                  <p className="text-sm text-neutral-content">
                    Sub Category BN
                  </p>
                  <input
                    type="text"
                    name="subCategory"
                    className="border px-2 py-1.5 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-content">
                    Sub Category EN
                  </p>
                  <input
                    type="text"
                    name="subCategoryEN"
                    className="border px-2 py-1.5 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-content">Category</p>
                  <select
                    name="category"
                    className="border px-2 py-1.5 rounded-md focus:outline-none"
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
