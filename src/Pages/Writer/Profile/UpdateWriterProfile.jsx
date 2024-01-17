import { useState } from "react";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";

export default function UpdateWriterProfile() {
  const [logos, setLogos] = useState([]);

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Update Profile</h1>

          <div className="py-10 md:w-3/4 mx-auto">
            <form>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                    defaultValue="khalid_hasan"
                    disabled
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Enter Password"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter Password"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
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
                  className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
