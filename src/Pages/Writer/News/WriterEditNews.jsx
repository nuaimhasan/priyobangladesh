import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from "../../../redux/news/newsApi";
import { useGetAllCategoryQuery } from "../../../redux/category/categoryApi";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../Components/Spinner/Spinner";

export default function WriterEditNews() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");

  const { id } = useParams();
  const { data, isLoading } = useGetNewsByIdQuery(id);
  const { data: categoryData } = useGetAllCategoryQuery();
  const [updateNews, { isLoading: updateLoding, isSuccess, isError }] =
    useUpdateNewsMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "News Updated Successfully", "success");
      navigate("/writer/news");
    }
    if (isError) {
      Swal.fire("", "An error occured when updating this news", "error");
    }
  }, [isSuccess, isError, navigate]);

  if (isLoading) return <Spinner />;
  const news = data?.data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("category", e.target.category.value);
    formData.append("shortDescription", e.target.short_description.value);
    if (details) {
      formData.append("details", details);
    } else {
      formData.append("details", news?.details);
    }
    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    await updateNews({ id, formData });
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Edit News</h1>

          <div className="py-10">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={news?.title}
                      placeholder="Enter Title"
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                    />
                  </div>

                  <div className="">
                    <p className="mb-1">Image</p>
                    <div className="p-4 sm:flex items-center gap-4 border rounded-md">
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

                              <p className="text-neutral-content">
                                or Drop here
                              </p>
                            </div>

                            <div className={`${images?.length > 0 && "mt-4"} `}>
                              {images?.map((img, index) => (
                                <div
                                  key={index}
                                  className="image-item relative"
                                >
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
                    </div>
                    {news?.image && (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/news/${
                          news?.image
                        }`}
                        alt=""
                        className="mt-2 h-28"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="title">Short Description</label>
                    <textarea
                      name="short_description"
                      rows="4"
                      className="border rounded w-full p-3 outline-none focus:border-red-500"
                      defaultValue={news?.shortDescription}
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="category">Category</label>
                    <select
                      defaultValue={news?.category?._id}
                      name="category"
                      className="border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value={news?.category?._id}>
                        {news?.category?.category}
                      </option>
                      {categoryData?.data
                        ?.filter(
                          (category) => category._id !== news?.category?._id
                        )
                        .map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p>Description</p>
                    <div className="mt-1 border rounded p-4">
                      <JoditEditor
                        ref={editor}
                        value={news?.details ? news?.details : details}
                        onBlur={(text) => setDetails(text)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={updateLoding && "disabled"}
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    {updateLoding ? "Updating..." : "Update"}
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
