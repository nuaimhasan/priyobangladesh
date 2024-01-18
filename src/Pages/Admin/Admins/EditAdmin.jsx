import { useParams } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useGetUserByIdQuery } from "../../../redux/user/userApi";
import Spinner from "../../../Components/Spinner/Spinner";

export default function EditAdmin() {
  const { id } = useParams();

  const { data, isLoading } = useGetUserByIdQuery(id);

  if (isLoading) {
    return <Spinner />;
  }
  const admin = data?.data;

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg min-h-[80vh]">
        <div className="p-5">
          <h1 className="text-xl font-semibold">Update Admin</h1>

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
                    defaultValue={admin?.name}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    defaultValue={admin?.userName}
                    disabled
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
                    className="bg-primary text-white px-3 py-2 rounded-md uppercase"
                  >
                    Update
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
