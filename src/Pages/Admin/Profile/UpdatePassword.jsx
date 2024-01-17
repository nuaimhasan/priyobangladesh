import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useUpdatePasswordMutation } from "../../../redux/user/userApi";

export default function UpdatePassword() {
  const navigate = useNavigate();

  const { loggedUser } = useSelector((state) => state.user);
  const profile = loggedUser?.data;
  const id = profile?._id;

  const [updatePassword, { isLoading, isSuccess, isError }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Admin Added Successfully", "success");
      navigate("/admin/profile");
    }
    if (isError) {
      Swal.fire("", "An error occured when adding this admin", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;

    const data = { oldPassword, newPassword };

    await updatePassword({ id, data });
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Update Profile</h1>

          <div className="py-10 md:w-3/4 mx-auto">
            <form
              onSubmit={handleUpdatePassword}
              className="flex flex-col gap-5
            "
            >
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
