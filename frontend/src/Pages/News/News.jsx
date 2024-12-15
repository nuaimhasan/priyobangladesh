import { useEffect } from "react";
import AllNews from "../../Components/NewsPage/AllNews";
import { Helmet } from "react-helmet-async";

export default function News() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
        <meta
          name="twitter:url"
          content="https://www.priyobangladesh.com/news"
        />
      </Helmet>

      <AllNews />
    </>
  );
}
