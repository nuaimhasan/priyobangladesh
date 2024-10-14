import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { Link, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useGetAllCategoryQuery } from "../../../redux/category/categoryApi";
import {
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from "../../../redux/news/newsApi";
import Spinner from "../../../Components/Spinner/Spinner";
import { useGetAllSubCategoryQuery } from "../../../redux/subCategoryApi/subCategoryApi";
import toast from "react-hot-toast";

export default function EditNews() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  let query = {};
  query["category"] = selectedCategory;
  const { data: subCategory } = useGetAllSubCategoryQuery({ ...query });
  const subCategories = subCategory?.data;

  const { id } = useParams();
  const { data, isLoading } = useGetNewsByIdQuery(id);

  useEffect(() => {
    if (data?.success) {
      setSelectedCategory(data?.data?.category?._id);
      setSelectedSubCategory(data?.data?.subCategory?._id);
    }
  }, [data]);

  const { data: categoryData } = useGetAllCategoryQuery();

  const [updateNews, { isLoading: updateLoding }] = useUpdateNewsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("category", e.target.category.value);
    formData.append("subCategory", e.target.subCategory.value);
    if (details) {
      formData.append("details", details);
    } else {
      formData.append("details", data?.data?.details);
    }
    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    const res = await updateNews({ id, formData });

    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigate("/writer/news");
    } else {
      toast.error(res?.data?.message || "Failed to update news");
      console.log(res);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Edit News</h1>

          <div className="py-5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 mb-2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="border px-3 py-2 rounded-md focus:outline-none"
                  defaultValue={data?.data?.title}
                />
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    className="border rounded-md p-2 text-sm"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                  >
                    <option value="">--Select Category--</option>
                    {categoryData?.data?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="subCategory">Sub Category</label>
                  <select
                    name="subCategory"
                    className="border rounded-md p-2 text-sm"
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    value={selectedSubCategory}
                  >
                    <option value="">--Select Sub Category--</option>
                    {subCategories?.map((category, i) => (
                      <option key={i} value={category?._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1">Image</p>
                  <div className="sm:flex items-center gap-4">
                    <ImageUploading
                      value={images}
                      onChange={(file) => setImages(file)}
                      dataURLKey="data_url"
                    >
                      {({ onImageUpload, onImageRemove, dragProps }) => (
                        <div
                          className="border rounded border-dashed p-4 w-max flex items-center xl:flex-row flex-col gap-3"
                          {...dragProps}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              onClick={onImageUpload}
                              className="px-4 py-1.5 rounded-2xl text-white bg-secondary cursor-pointer text-sm"
                            >
                              Choose Image
                            </span>

                            <p className="text-neutral-content">or Drop here</p>
                          </div>

                          <div className={`${images?.length > 0 && "mt-4"} `}>
                            {images?.map((img, index) => (
                              <div key={index} className="image-item relative">
                                <img
                                  src={img["data_url"]}
                                  alt=""
                                  className="w-40"
                                />
                                <div
                                  onClick={() => onImageRemove(index)}
                                  className="w-7 h-7 bg-secondary rounded-full flex justify-center items-center text-white absolute top-0 right-0 cursor-pointer"
                                >
                                  <AiFillDelete />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>

                    {data?.data?.image && (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                          data?.data?.image
                        }`}
                        alt=""
                        className="h-16 rounded"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-col gap-1">
                <p>Description</p>
                <div className="mt-px">
                  <JoditEditor
                    ref={editor}
                    value={data?.data?.details}
                    onBlur={(text) => setDetails(text)}
                  />
                </div>
              </div>

              <div className="flex gap-1 mt-2">
                <Link
                  to="/writer/news"
                  className="bg-gray-500 text-base-100 rounded px-4 py-2"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={updateLoding && "disabled"}
                  className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                >
                  {updateLoding ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
