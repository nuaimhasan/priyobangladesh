import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useCreateAboutUsMutation,
  useGetAllAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../../redux/aboutUs/aboutUsApi";

export default function AboutUs() {
  const editor = useRef(null);
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const { data } = useGetAllAboutUsQuery();
  const id = data?.data[0]?._id;

  const [
    addAboutUs,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError },
  ] = useCreateAboutUsMutation();

  const [
    updateAboutUs,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateAboutUsMutation();

  useEffect(() => {
    if (addSuccess) {
      setImages([]);
      Swal.fire("", "AboutUS Added Successfully", "success");
    }
    if (addError) {
      Swal.fire("", "An error occured when adding", "error");
    }
    if (updateSuccess) {
      setImages([]);
      Swal.fire("", "AboutUs Updated Successfully", "success");
    }
    if (updateError) {
      Swal.fire("", "An error occured when updating", "error");
    }
  }, [addSuccess, addError, updateSuccess, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("title", title);
    if (details) {
      formData.append("description", details);
    } else {
      formData.append("description", data?.data[0]?.description);
    }
    if (images.length > 0) formData.append("image", images[0].file);

    if (id && data?.data !== undefined) {
      await updateAboutUs({ id, formData });
    } else {
      await addAboutUs(formData);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">About Us</h1>

          {/* make a aboutUs form where title, description image */}
          <form onSubmit={handleSubmit} className="my-10">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Title"
                    defaultValue={data?.data[0]?.title}
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
                  </div>
                  {data?.data[0]?.image && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${
                        data?.data[0]?.image
                      }`}
                      alt=""
                      className="mt-2 w-32"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>Description</p>
                <div className=" border rounded p-4">
                  <JoditEditor
                    ref={editor}
                    value={
                      data?.data[0]?.description
                        ? data?.data[0]?.description
                        : details
                    }
                    onBlur={(text) => setDetails(text)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <button
                type="submit"
                disabled={addLoading || (updateLoading && "disabled")}
                className="bg-primary text-white px-3 py-2 rounded-md uppercase sm:w-1/4"
              >
                {addLoading || updateLoading
                  ? "Loading..."
                  : id
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
