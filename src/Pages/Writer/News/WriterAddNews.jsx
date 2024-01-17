import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllCategoryQuery } from "../../../redux/category/categoryApi";
import { useCreateNewsMutation } from "../../../redux/news/newsApi";

export default function WriterAddNews() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [logos, setLogos] = useState([]);
  const [details, setDetails] = useState("");

  const { loggedUser } = useSelector((state) => state.user);
  const { data: categoryData } = useGetAllCategoryQuery();
  const [addNews, { isLoading, isSuccess, isError }] = useCreateNewsMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "News Added Successfully", "success");
      navigate("/writer/news");
    }
    if (isError) {
      Swal.fire("", "An error occured when adding this news", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (details === "") {
      alert("Please enter description");
      return;
    }

    if (logos.length === 0) {
      alert("Please choose image");
      return;
    }

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("category", e.target.category.value);
    formData.append("description", details);
    formData.append("image", logos[0].file);
    formData.append("writer", loggedUser?.data?._id);

    await addNews(formData);
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Add News</h1>

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
                      placeholder="Enter Title"
                      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                    />
                  </div>

                  <div className="">
                    <p className="mb-1">Image</p>
                    <div className="p-4 sm:flex items-center gap-4 border rounded-md">
                      <ImageUploading
                        value={logos}
                        onChange={(file) => setLogos(file)}
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

                            <div className={`${logos?.length > 0 && "mt-4"} `}>
                              {logos?.map((img, index) => (
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
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      className="border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:border-primary"
                    >
                      <option disabled>--Select Category--</option>
                      {categoryData?.data?.map((category) => (
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
                        value={details}
                        onBlur={(text) => setDetails(text)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading && "disabled"}
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    {isLoading ? "Loading..." : "Add News"}
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
