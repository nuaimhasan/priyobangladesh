import { useGetAllCategoryQuery } from "../../../redux/category/categoryApi";
import Spinner from "../../Spinner/Spinner";
import NewsSection from "./NewsSection";

export default function CategoryWaysNews() {
  const { data, isLoading, isError, error } = useGetAllCategoryQuery();
  const categories = data?.data;

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error || "something went wrong"}</p>;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    content = categories?.map((category) => (
      <NewsSection key={category?._id} category={category} />
    ));
  }

  return <>{content}</>;
}
