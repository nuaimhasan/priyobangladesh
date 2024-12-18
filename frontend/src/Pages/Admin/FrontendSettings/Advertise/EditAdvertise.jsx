import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useAdvertiseByIdQuery,
  useUpdateAdvertiseMutation,
} from "../../../../redux/advertise/advertiseApi";

export default function EditAdvertise() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useAdvertiseByIdQuery(id);

  const [images, setImages] = useState([]);

  const [updateAdvertise, { isLoading, isSuccess, isError }] =
    useUpdateAdvertiseMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Advertise Updated Successfully", "success");
      navigate("/admin/front-end/advertise");
    }
    if (isError) {
      Swal.fire("", "An error occured when adding", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const showingPlace = e.target.showingPlace.value;

    const formData = new FormData();
    formData.append("showingPlace", showingPlace);
    if (images.length > 0) {
      formData.append("image", images[0]?.file);
    }
    

    await updateAdvertise({ id, formData });
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={4} />
      </div>

      <div className="bg-white rounded-md shadow-lg md:w-2/4 w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">Edit Advertise</h1>

          <form onSubmit={handleSubmit} className="py-10">
            <p className="mb-1">Image</p>
            <div className="p-4 sm:flex items-center gap-4 border rounded-md">
              <ImageUploading
                value={images}
                onChange={(file) => setImages(file)}
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

                    <div className={`${images?.length > 0 && "mt-4"} `}>
                      {images?.map((img, index) => (
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
            {data?.data?.image && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${
                  data?.data?.image
                }`}
                alt=""
                className="mt-2 w-32"
              />
            )}

            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="showingPlace">Showing Place</label>
              <select
                name="showingPlace"
                className="border rounded-md p-2 text-sm focus:outline-none focus:border-primary"
              >
                 <option disabled defaultValue={data?.data?.showingPlace}>Select Value</option>
                <option value="header">Header</option>
                <option value="section">Between Section</option>
                <option value="sidebar">Sidebar</option>
                <option value="details">Between News Details</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <button
                type="submit"
                disabled={isLoading && "disabled"}
                className="bg-primary text-white px-3 py-2 rounded-md uppercase"
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
