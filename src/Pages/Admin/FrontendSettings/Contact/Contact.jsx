import { useEffect } from "react";
import {
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../../../redux/contact/contactApi";

import { toast } from "react-hot-toast";
import Spinner from "../../../../Components/Spinner/Spinner";

export default function Contact() {
  const { data, isLoading, isError, error } = useGetContactQuery();
  const [
    updateContact,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateContactMutation();

  const [
    addContact,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError },
  ] = useAddContactMutation();

  const id = data?.data[0]?._id;

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const whatsapp = form.whatsapp.value;
    const email = form.email.value;
    const address = form.address.value;
    const cheifEditor = form.cheifEditor.value;
    const editor = form.editor.value;
    const regiNumber = form.regiNumber.value;
    const bio = form.bio.value;

    const contactInfo = {
      phone,
      whatsapp,
      email,
      address,
      cheifEditor,
      editor,
      regiNumber,
      bio,
    };

    if (id) {
      await updateContact({ id, contactInfo });
    } else {
      await addContact(contactInfo);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Update Success");
    }
    if (addSuccess) {
      toast.success("Add Success");
    }
    if (addError) {
      toast.error("Somethin Wrong, please try again");
      console.log(addError);
    }
    if (updateError) {
      toast.error("Somethin Wrong, please try again");
      console.log(updateError);
    }
  }, [updateSuccess, updateError, addSuccess, addError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <p>
        {error?.data?.message ? error?.data?.message : "something went wrong"}
      </p>
    );
  }

  return (
    <section className="bg-base-100 shadow rounded pb-4 min-h-[86vh]">
      <div className="p-4 border-b text-neutral font-medium">
        <h3>Contact Info</h3>
      </div>
      <form
        onSubmit={handleUpdateContact}
        className="p-4 form_group flex flex-col gap-3 border rounded mt-3 text-sm"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Phone</p>
            <input
              type="text"
              name="phone"
              defaultValue={data?.data[0]?.phone}
            />
          </div>

          <div>
            <p className="text-neutral-content">Whatsapp</p>
            <input
              type="text"
              name="whatsapp"
              defaultValue={data?.data[0]?.whatsapp}
            />
          </div>

          <div>
            <p className="text-neutral-content">Email</p>
            <input
              type="email"
              name="email"
              defaultValue={data?.data[0]?.email}
            />
          </div>

          <div>
            <p className="text-neutral-content">Chief Editor Name</p>
            <input
              type="text"
              name="cheifEditor"
              defaultValue={data?.data[0]?.cheifEditor}
            />
          </div>

          <div>
            <p className="text-neutral-content">Editor Name</p>
            <input
              type="text"
              name="editor"
              defaultValue={data?.data[0]?.editor}
            />
          </div>

          <div>
            <p className="text-neutral-content">Regi Number</p>
            <input
              type="text"
              name="regiNumber"
              defaultValue={data?.data[0]?.regiNumber}
            />
          </div>
        </div>

        <div>
          <p className="text-neutral-content">Bio for Footer</p>
          <textarea
            name="bio"
            rows="2"
            defaultValue={data?.data[0]?.bio}
          ></textarea>
        </div>

        <div>
          <p className="text-neutral-content">Address</p>
          <textarea
            name="address"
            rows="3"
            defaultValue={data?.data[0]?.address}
          ></textarea>
        </div>

        <div>
          <button
            disabled={updateLoading && "disabled"}
            className="primary_btn"
          >
            {updateLoading || addLoading ? "Loading..." : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
