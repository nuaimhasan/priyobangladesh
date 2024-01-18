import perser from "html-react-parser";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../../Components/Spinner/Spinner";
import BreadCrumb from "../../../../Components/UI/BreadCrumb";
import {
  useDeleteBreakingNewsMutation,
  useGetBreakingNewsQuery,
} from "../../../../redux/breakingNews/breakingNewsApi";

export default function BreakingNews() {
  const { data, isLoading } = useGetBreakingNewsQuery();
  const breakingNews = data?.data;
  console.log(breakingNews);

  const [
    deleteBreakingNews,
    { isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteBreakingNewsMutation();

  useEffect(() => {
    if (deleteSuccess) {
      Swal.fire("", "Breaking News Deleted Successfully", "success");
    }
    if (deleteError) {
      Swal.fire("", "An error occured when deleting", "error");
    }
  }, [deleteSuccess, deleteError]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (confirm) {
      await deleteBreakingNews(id);
    }
  };

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between">
        <h1 className="md:text-xl text-base font-semibold">Breaking News</h1>
        <Link
          to="/admin/front-end/breaking-news/add-breaking-news"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          Add Breaking News
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-1">
        <table className="min-w-full divide-y divide-gray-200 dashboard_table">
          <thead className="bg-white">
            <tr>
              <th>SL</th>
              <th>News</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {breakingNews?.map((news, i) => {
              const perserDescription = news?.news && perser(news?.news);
              return (
                <tr key={news?._id}>
                  <td>{i + 1}</td>
                  <td>{perserDescription}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(news?._id)}
                        className="hover:text-primary text-lg"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
