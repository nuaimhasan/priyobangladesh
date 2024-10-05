import Swal from "sweetalert2";
import {
  useAddSocialMutation,
  useGetSocialQuery,
  useUpdateSocialMutation,
} from "../../../../redux/socialApi";

export default function Social() {
  const { data } = useGetSocialQuery();
  const social = data?.data;
  const id = social?.data?._id;

  const [addSocial, { isLoading }] = useAddSocialMutation();
  const [updateSocial, { isLoading: uIsLoading }] = useUpdateSocialMutation();

  const handleSocial = async (e) => {
    e.preventDefault();
    const facebook = e.target.facebook.value;
    const twitter = e.target.twitter.value;
    const youtube = e.target.youtube.value;

    const data = {
      facebook,
      twitter,
      youtube,
    };

    if (id) {
      let res = await updateSocial({ id, data });

      if (res?.data?.success) {
        Swal.fire("", "social link update success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    } else {
      let res = await addSocial(data);

      if (res?.data?.success) {
        Swal.fire("", "social link add success", "success");
      } else {
        Swal.fire("", "something went wrong!", "error");
        console.log(res);
      }
    }
  };
  return (
    <div className="bg-base-100 rounded shadow p-3">
      <h2>Social Setting</h2>

      <form
        onSubmit={handleSocial}
        className="mt-3 flex flex-col gap-3 text-sm"
      >
        <div>
          <p className="tetx-neutral mb-2">Facebook</p>
          <input
            type="text"
            name="facebook"
            className="w-full border px-2 py-1.5 rounded  outline-none"
            defaultValue={social?.facebook}
          />
        </div>

        <div>
          <p className="tetx-neutral mb-2">Twitter</p>
          <input
            type="text"
            name="twitter"
            className="w-full border px-2 py-1.5 rounded  outline-none"
            defaultValue={social?.twitter}
          />
        </div>

        <div>
          <p className="tetx-neutral mb-2">Youtube</p>
          <input
            type="text"
            name="youtube"
            className="w-full border px-2 py-1.5 rounded  outline-none"
            defaultValue={social?.youtube}
          />
        </div>

        <div>
          <button className="bg-secondary px-4 py-1.5 rounded text-base-100">
            {isLoading || uIsLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
