import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../../redux/news/newsApi";
import { useGetWritersQuery } from "../../../redux/user/userApi";
import Spinner from "../../../Components/Spinner/Spinner";
import NewsesListComponent from "../../../Components/AdminComponents/NewsesListComponent/NewsesListComponent";

export default function Dashboard() {
  const { data: writerData } = useGetWritersQuery();
  const writers = writerData?.data;
  const { data, isLoading } = useGetAllNewsQuery();
  const newses = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-5">
        <div className="flex flex-col items-center justify-center py-5 sm:py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.length > 0 ? data?.meta?.total : 0}
          </h1>
          <p>Total News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-5 sm:py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((news) => news.status === "pending").length > 0
              ? newses?.filter((news) => news.status === "pending").length
              : 0}
          </h1>
          <p>Pending News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-5 sm:py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((news) => news.status === "active").length > 0
              ? newses?.filter((news) => news.status === "active").length
              : 0}
          </h1>
          <p>Active News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-5 sm:py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {newses?.filter((news) => news.status === "inactive").length > 0
              ? newses?.filter((news) => news.status === "inactive").length
              : 0}
          </h1>
          <p>Inactive News</p>
        </div>
        <div className="flex flex-col items-center justify-center py-5 sm:py-10 bg-white shadow-lg rounded-md">
          <h1 className="text-xl font-medium mb-2">
            {writers?.length > 0 ? writers?.length : 0}
          </h1>
          <p>Writers</p>
        </div>
      </div>

      {/* সর্বশেষ সংবাদ */}
      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex items-center justify-between mt-2">
        <h1 className="md:text-xl text-base font-semibold">সর্বশেষ সংবাদ</h1>
        <Link
          to="/admin/news"
          className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
        >
          View All News
        </Link>
      </div>

      <NewsesListComponent />
    </div>
  );
}
