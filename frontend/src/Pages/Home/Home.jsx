import { Helmet } from "react-helmet-async";
import ContentAdd from "../../Components/Advertises/ContentAdd";
import CategoryWaysNews from "../../Components/HomePage/CategoryWaysNews/CategoryWaysNews";
import LatestNews from "../../Components/HomePage/LatestNews";
import TopNews from "../../Components/HomePage/TopNews";

export default function Home() {
  window.scroll(0, 0);

  return (
    <>
      <Helmet>
        <meta
          property="og:title"
          content={`প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির`}
        />
        <meta
          property="og:description"
          content={`প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির`}
        />
        <meta
          property="og:image"
          content="https://www.priyobangladesh.com/images/favicon.png"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:url" content="https://www.priyobangladesh.com" />
        <link rel="canonical" href="https://www.priyobangladesh.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির"
        />
        <meta
          name="twitter:description"
          content="প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির"
        />
        <meta
          name="twitter:image"
          content="https://www.priyobangladesh.com/images/favicon.png"
        />
        <meta name="twitter:url" content="https://www.priyobangladesh.com" />
      </Helmet>

      <div className="container py-5 grid md:grid-cols-2 grid-cols-1 gap-3">
        <LatestNews />
        <TopNews />
      </div>
      <ContentAdd />
      <CategoryWaysNews />
    </>
  );
}
