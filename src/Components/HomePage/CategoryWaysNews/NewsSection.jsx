import { useGetAllNewsQuery } from "../../../redux/news/newsApi";
import Spinner from "../../Spinner/Spinner";
import BigNewsCard from "../../UI/Cards/BigNewsCard";
import SecondaryNewsCard from "../../UI/Cards/SecondaryNewsCard";
import SectionHeader from "../../UI/SectionHeader";

export default function NewsSection({ category }) {
  const query = {};
  query["category"] = category?.slug;
  const { data, isLoading, isError, error } = useGetAllNewsQuery({
    ...query,
  });
  const newses = data?.data;

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && newses?.length > 0) {
    content = (
      <section>
        <div className="grid grid-cols-3 gap-4">
          <div>{newses?.length > 0 && <BigNewsCard news={newses[0]} />}</div>
          <div>{newses?.length > 1 && <BigNewsCard news={newses[1]} />}</div>
          <div className="flex flex-col gap-3 h-auto">
            {newses?.slice(2, 6)?.map((news) => (
              <SecondaryNewsCard key={news?._id} news={news} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (newses?.length > 0) {
    return (
      <div className="pb-10">
        <div className="container">
          <SectionHeader title={category?.category} />

          {content}
        </div>
      </div>
    );
  }
}
