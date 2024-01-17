import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useUpdateUserMutation } from "../../../redux/user/userApi";

export default function UpdateProfile() {
  const [logos, setLogos] = useState([]);
  const navigate = useNavigate();

  const { loggedUser } = useSelector((state) => state.user);
  const profile = loggedUser?.data;
  const id = profile?._id;

  const [updateProfile, { isLoading, isSuccess, isError }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Profile info updated Successfully", "success");
      navigate("/admin/profile");
      window.location.reload();
    }
    if (isError) {
      Swal.fire("", "An error occured when adding this admin", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (logos[0]) {
      formData.append("image", logos[0].file);
    }

    await updateProfile({ id, formData }).unwrap();
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h1 className="md:text-xl text-base font-semibold">
              Update Profile Info
            </h1>
            <Link
              to="/admin/profile/update-password"
              className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
            >
              Update Password
            </Link>
          </div>

          <div className="py-10 md:w-3/4 mx-auto">
            <form onSubmit={handleUpdateProfile}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={profile?.name}
                    placeholder="Enter Name"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    defaultValue={profile?.userName}
                    disabled
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    defaultValue={profile?.phone}
                    placeholder="Enter Phone Number"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="">
                  <p className="mb-1">Profile Image</p>
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
              <div className="flex flex-col gap-1 mt-5">
                <button
                  type="submit"
                  disabled={isLoading && "disabled"}
                  className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
