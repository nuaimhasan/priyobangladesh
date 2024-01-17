import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useAddAdminMutation } from "../../../redux/user/userApi";

export default function AddAdmin() {
  const navigate = useNavigate();
  const [addAdmin, { isLoading, isError, isSuccess, error }] =
    useAddAdminMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Admin Added Successfully", "success");
      navigate("/admin/admins");
    }
    if (isError) {
      Swal.fire("", "Username & number should  be unique!", "error");
    }
  }, [isSuccess, isError, error, navigate]);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const userName = form.userName.value;
    const password = form.password.value;
    const phone = form.phone.value;

    const info = {
      name,
      userName,
      password,
      phone,
    };

    await addAdmin(info);
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Add Admin</h1>

          <div className="py-10 md:w-3/4 mx-auto">
            <form onSubmit={handleAddAdmin}>
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
                    placeholder="Enter Unique User-Name"
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
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

                <div className="flex flex-col gap-1 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading && "disabled"}
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    {isLoading ? "Loading..." : "Add Admin"}
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
