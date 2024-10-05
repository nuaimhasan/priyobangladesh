import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../../redux/news/newsApi";

export default function TopNews() {
  const query = {};
  query["limit"] = 4;
  query["status"] = "active";

  const { data, isLoading } = useGetAllNewsQuery({ ...query });
  const newses = data?.data;

  let content = null;
  if (isLoading) {
    content = (
      <>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[150px] rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[150px] rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[150px] rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-base-100 h-[150px] rounded"></div>
        </div>
      </>
    );
  }

  if (!isLoading && data?.data?.length > 0) {
    content = newses?.map((news) => (
      <Link key={news?._id} to={`/news/${news?.slug}`}>
        <div className="w-full h-40 rounded-md relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
          <div className="bg-[#00000054] rounded w-full h-full absolute top-0 left-0 text-white flex flex-col justify-end px-4 pb-2">
            <span className="w-max text-xs bg-primary py-1 px-3 rounded-md">
              {news?.category?.category}
            </span>
            <h3 className="text-xl font-medium">
              {news?.title?.length > 22
                ? news?.title?.slice(0, 22) + "..."
                : news?.title?.length}
            </h3>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">{content}</div>
    </div>
  );
}
