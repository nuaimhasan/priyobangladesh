import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useAddWriterMutation } from "../../../redux/user/userApi";

export default function AddWriter() {
  const navigate = useNavigate();
  const [addWriter, { isLoading, isSuccess, isError }] = useAddWriterMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Writer Added Successfully", "success");
      navigate("/admin/writers");
    }
    if (isError) {
      Swal.fire("", "An error occured when adding this writer", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleAddWriter = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;

    const data = { name, userName, password, phone };

    const res = await addWriter(data);
    console.log(res);
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Add Writer</h1>

          <div className="py-10 md:w-3/4 mx-auto">
            <form onSubmit={handleAddWriter}>
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
                    {isLoading ? "Adding..." : "Add"}
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
