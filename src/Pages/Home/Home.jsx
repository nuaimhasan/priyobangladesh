import ContentAdd from "../../Components/Advertises/ContentAdd";
import MobileFooterAdd from "../../Components/Advertises/MobileFooterAdd";
import CategoryWaysNews from "../../Components/HomePage/CategoryWaysNews/CategoryWaysNews";
import Headline from "../../Components/HomePage/Headline";
import LatestNews from "../../Components/HomePage/LatestNews";
import PopulerNews from "../../Components/HomePage/PopulerNews";
import TopNews from "../../Components/HomePage/TopNews";

export default function Home() {
  window.scroll(0, 0);
  return (
    <>
      <Headline />
      <div className="container py-5 grid md:grid-cols-2 grid-cols-1 gap-3">
        <LatestNews />
        <TopNews />
      </div>
      <ContentAdd />
      <PopulerNews />
      <CategoryWaysNews />
      <MobileFooterAdd />
    </>
  );
}
