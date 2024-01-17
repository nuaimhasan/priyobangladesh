import { useEffect } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useCreateContactUsMutation,
  useGetAllContactUsQuery,
  useUpdateContactUsMutation,
} from "../../../redux/contactUs/contactUsApi";

export default function ContactUs() {
  const { data } = useGetAllContactUsQuery();
  const id = data?.data[0]?._id;

  const [
    addContactUs,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError },
  ] = useCreateContactUsMutation();

  const [
    updateContactUs,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateContactUsMutation();

  useEffect(() => {
    if (addSuccess) {
      Swal.fire("", "ContactUs Added Successfully", "success");
    }
    if (addError) {
      Swal.fire("", "An error occured when adding", "error");
    }
    if (updateSuccess) {
      Swal.fire("", "ContactUs Updated Successfully", "success");
    }
    if (updateError) {
      Swal.fire("", "An error occured when updating", "error");
    }
  }, [addSuccess, addError, updateSuccess, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const facebook = e.target.facebook.value;
    const twitter = e.target.twitter.value;
    const instagram = e.target.instagram.value;
    const youtube = e.target.youtube.value;

    const data = {
      email,
      phone,
      address,
      facebook,
      twitter,
      instagram,
      youtube,
    };

    if (id) {
      await updateContactUs({ id, data });
    } else {
      await addContactUs(data);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">Contact Us</h1>

          <form onSubmit={handleSubmit} action="" className="my-10">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={data?.data[0]?.email}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue={data?.data[0]?.phone}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={data?.data[0]?.address}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="facebook">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  defaultValue={data?.data[0]?.facebook}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="twitter">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  defaultValue={data?.data[0]?.twitter}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="instagram">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  defaultValue={data?.data[0]?.instagram}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="youtube">Youtube</label>
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  defaultValue={data?.data[0]?.youtube}
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <button
                type="submit"
                disabled={addLoading && updateLoading && "disabled"}
                className="bg-primary text-white px-3 py-2 rounded-md uppercase sm:w-1/2"
              >
                {addLoading && updateLoading
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
