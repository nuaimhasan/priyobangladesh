import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function BreadCrumb() {
  const { category, subCategory, slug } = useParams();

  return (
    <div className="py-2 text-gray-800 text-sm hidden sm:block">
      <nav aria-label="breadcrumb" className="">
        <ol className="sm:flex items-center">
          <li>
            <Link to="/" className="text-primary">
              <FaHome />
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          {slug && "news / details/" + slug}
          {subCategory ? (
            <>
              <li>
                <Link to={`/news/${category}`}>{category}</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>{subCategory}</li>
            </>
          ) : (
            category && (
              <>
                <li>{category}</li>
              </>
            )
          )}
        </ol>
      </nav>
    </div>
  );
}
