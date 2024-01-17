import { useParams } from "react-router-dom";
import ViewNews from "../../../Components/Dashboard/ViewNews";
import BreadCrumb from "../../../Components/UI/BreadCrumb";
import { useGetNewsByIdQuery } from "../../../redux/news/newsApi";

export default function WriterViewNews() {
  const { id } = useParams();
  const { data, isLoading } = useGetNewsByIdQuery(id);

  if (isLoading) return <h1>Loading...</h1>;

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
