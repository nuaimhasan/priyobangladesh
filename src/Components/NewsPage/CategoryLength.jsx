import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";

export default function CategoryLength() {
  const { data: categoryData } = useGetAllCategoryQuery();

  const { data } = useGetAllNewsQuery();
  const newses = data?.data;
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {categoryData?.data?.map((category) => (
        <li key={category?._id} className="hover:text-primary">
          <Link to={`/news/${category.slug}`}>
            {category.category} (
            {
              newses?.filter((news) => news.category._id === category._id)
                .length
            }
            )
          </Link>
        </li>
      ))}
    </ul>
  );
}
