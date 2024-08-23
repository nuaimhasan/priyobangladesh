import ContentAdd from "../../Components/Advertises/ContentAdd";
import CategoryWaysNews from "../../Components/HomePage/CategoryWaysNews/CategoryWaysNews";
import LatestNews from "../../Components/HomePage/LatestNews";
import TopNews from "../../Components/HomePage/TopNews";

export default function Home() {
  window.scroll(0, 0);
  return (
    <>
      <div className="container py-5 grid md:grid-cols-2 grid-cols-1 gap-3">
        <LatestNews />
        <TopNews />
      </div>
      <ContentAdd />
      <CategoryWaysNews />
    </>
  );
}
