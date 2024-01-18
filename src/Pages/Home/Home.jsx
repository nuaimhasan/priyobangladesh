import CategoryWaysNews from "../../Components/HomePage/CategoryWaysNews/CategoryWaysNews";
import Headline from "../../Components/HomePage/Headline";
import LatestNews from "../../Components/HomePage/LatestNews";
import PopulerNews from "../../Components/HomePage/PopulerNews";
import TopTechnologySection from "../../Components/HomePage/TopTechnologySection";

export default function Home() {
  return (
    <>
      <Headline />
      <div className="container py-5 grid md:grid-cols-2 grid-cols-1 gap-3">
        <LatestNews />
        <TopTechnologySection />
      </div>
      <PopulerNews />
      <CategoryWaysNews />
    </>
  );
}
