import { useEffect } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import {
  useCreateThemeMutation,
  useGetAllThemeQuery,
  useUpdateThemeMutation,
} from "../../../redux/theme/themeApi";

export default function Theme() {
  const { data: themeData } = useGetAllThemeQuery();
  const theme = themeData?.data[0];
  const id = theme?._id;

  const [
    updateTheme,
    {
      isLoading: updateThemeLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateThemeMutation();

  const [
    addTheme,
    { isLoading: addThemeLoading, isSuccess: addSuccess, isError: addError },
  ] = useCreateThemeMutation();

  useEffect(() => {
    if (addSuccess) {
      Swal.fire("", "Theme Added Successfully", "success");
    }
    if (addError) {
      Swal.fire("", "An error occured when adding this theme", "error");
    }
    if (updateSuccess) {
      Swal.fire("", "Theme Updated Successfully", "success");
    }
    if (updateError) {
      Swal.fire("", "An error occured when updating this theme", "error");
    }
  }, [addSuccess, addError, updateSuccess, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const primary = e.target.primary.value;
    const secondary = e.target.secondary.value;
    const accent = e.target.accent.value;
    const neutral = e.target.neutral.value;

    const data = {
      primary,
      secondary,
      accent,
      neutral,
    };

    if (id) {
      await updateTheme({ id, data });
    } else {
      await addTheme(data);
    }
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">Theme Info</h1>

          <form onSubmit={handleSubmit} action="" className="my-10">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="primary">Primary</label>
                <input
                  type="text"
                  id="primary"
                  name="primary"
                  defaultValue={theme?.primary}
                  placeholder="Enter Primary Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="secondary">Secondary</label>
                <input
                  type="text"
                  id="secondary"
                  name="secondary"
                  defaultValue={theme?.secondary}
                  placeholder="Enter Secondary Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="accent">Accent</label>
                <input
                  type="text"
                  id="accent"
                  name="accent"
                  defaultValue={theme?.accent}
                  placeholder="Enter Accent Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="neutral">Neutral</label>
                <input
                  type="text"
                  id="neutral"
                  name="neutral"
                  defaultValue={theme?.neutral}
                  placeholder="Enter Neutral Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <button
                type="submit"
                disabled={addThemeLoading || (updateThemeLoading && "disabled")}
                className="bg-primary text-white px-3 py-2 rounded-md uppercase sm:w-1/4"
              >
                {addThemeLoading || updateThemeLoading
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
