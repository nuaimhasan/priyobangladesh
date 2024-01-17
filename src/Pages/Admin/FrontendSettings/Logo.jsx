import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useCreateLogoMutation,
  useGetAllLogoQuery,
  useUpdateLogoMutation,
} from "../../../redux/logo/logoApi";

export default function Logo() {
  const [logos, setLogos] = useState([]);
  const { data } = useGetAllLogoQuery();
  const id = data?.data[0]?._id;

  const [
    addLogo,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError },
  ] = useCreateLogoMutation();

  const [
    updateLogo,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateLogoMutation();

  useEffect(() => {
    if (addSuccess) {
      setLogos([]);
      Swal.fire("", "Logo Added Successfully", "success");
    }
    if (addError) {
      Swal.fire("", "An error occured when adding this logo", "error");
    }
    if (updateSuccess) {
      setLogos([]);
      Swal.fire("", "Logo Updated Successfully", "success");
    }
    if (updateError) {
      Swal.fire("", "An error occured when updating this logo", "error");
    }
  }, [addSuccess, addError, updateSuccess, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (logos.length === 0) return alert("Please select an image");

    const formData = new FormData();
    if (logos.length > 0) formData.append("logo", logos[0].file);

    if (id) {
      await updateLogo({ id, formData });
    } else {
      await addLogo(formData);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg md:w-2/4 w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">Add Logo</h1>

          <div className="py-10">
            <p className="mb-1">Logo</p>
            <div className="p-4 sm:flex items-center gap-4 border rounded-md">
              <ImageUploading
                value={logos}
                onChange={(file) => setLogos(file)}
                dataURLKey="data_url"
              >
                {({ onImageUpload, onImageRemove, dragProps }) => (
                  <div
                    className="border rounded border-dashed p-4 flex items-center w-full flex-col gap-3"
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

                    <div className={`${logos?.length > 0 && "mt-4"} `}>
                      {logos?.map((img, index) => (
                        <div key={index} className="image-item relative">
                          <img src={img["data_url"]} alt="" className="w-40" />
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
            {data?.data[0]?.logo && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                  data?.data[0]?.logo
                }`}
                alt=""
                className="mt-2 w-32"
              />
            )}

            <div className="flex flex-col gap-1 mt-5">
              <button
                onClick={handleSubmit}
                disabled={addLoading && updateLoading && "disabled"}
                className="bg-primary text-white px-3 py-2 rounded-md uppercase"
              >
                {addLoading && updateLoading
                  ? "Loading..."
                  : id
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
