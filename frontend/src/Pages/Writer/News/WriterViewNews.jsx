import { useParams } from "react-router-dom";
import ViewNews from "../../../Components/Dashboard/ViewNews";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useGetNewsByIdQuery } from "../../../redux/news/newsApi";
import Spinner from "../../../Components/Spinner/Spinner";

export default function WriterViewNews() {
  const { id } = useParams();
  const { data, isLoading } = useGetNewsByIdQuery(id);

  if (isLoading) return <Spinner />;

  const news = data?.data;

  return (
    <div>
      <div className="lg:hidden block">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <ViewNews news={news} />
    </div>
  );
}
