import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import { useAddBreakingNewsMutation } from "../../../../redux/breakingNews/breakingNewsApi";

export default function AddBreakingNews() {
  const editor = useRef(null);
  const [details, setDetails] = useState("");
  const navigate = useNavigate();
  const [addBreakingNews, { isLoading, isSuccess, isError }] =
    useAddBreakingNewsMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Breaking News Added Successfully", "success");
      navigate("/admin/front-end/breaking-news");
    }
    if (isError) {
      Swal.fire("", "An error occured when adding", "error");
    }
  }, [isSuccess, isError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details) {
      return Swal.fire("", "Please add some news", "error");
    }

    const data = {
      news: details,
    };

    await addBreakingNews(data);
  };

  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={4} />
      </div>

      <div className="bg-white rounded-md shadow-lg md:w-3/4 w-full">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">
            Add Breaking News
          </h1>

          <div className="py-10">
            <div className=" border rounded p-4">
              <JoditEditor
                ref={editor}
                value={details}
                onBlur={(text) => setDetails(text)}
              />
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading && "disabled"}
                className="bg-primary text-white px-3 py-2 rounded-md uppercase"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
