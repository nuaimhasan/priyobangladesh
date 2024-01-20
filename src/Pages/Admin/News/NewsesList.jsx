import { Link } from "react-router-dom";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import NewsesListComponent from "../../../Components/AdminComponents/NewsesListComponent/NewsesListComponent";

export default function NewsesList() {
  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white shadow-lg py-3 px-5 rounded-md flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="md:text-xl text-base font-semibold">All News</h1>
          <Link
            to="/admin/news/add-news"
            className="bg-secondary text-white md:px-3 px-2 py-1 rounded-md hover:bg-primary transition hover:scale-105 duration-300 text-xs md:text-sm"
          >
            Add News
          </Link>
        </div>
      </div>

      {/* all news */}
      <NewsesListComponent />
    </div>
  );
}
