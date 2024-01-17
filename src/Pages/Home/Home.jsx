import Education from "../../Components/HomePage/Education";
import Headline from "../../Components/HomePage/Headline";
import Health from "../../Components/HomePage/Health";
import International from "../../Components/HomePage/International";
import LatestNews from "../../Components/HomePage/LatestNews";
import Politics from "../../Components/HomePage/Politics";
import PopulerNews from "../../Components/HomePage/PopulerNews";
import RecentNewsSection from "../../Components/HomePage/RecentNewsSection";
import Sports from "../../Components/HomePage/Sports";
import Technology from "../../Components/HomePage/Technology";
import TopTechnologySection from "../../Components/HomePage/TopTechnologySection";
import Travel from "../../Components/HomePage/Travel";

export default function Home() {
  return (
    <>
      <Headline />
      <div className="container py-10 grid md:grid-cols-2 grid-cols-1 gap-3">
        <LatestNews />
        <TopTechnologySection />
      </div>
      <PopulerNews />
      <div className="container py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <Sports />
        <Education />
      </div>
      <Health />
      <div className="container py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <Politics />
        <Travel />
      </div>
      <International />
      <div className="container py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <Technology />
        <RecentNewsSection />
      </div>
    </>
  );
}
