import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hooks/useAuthCheck";
import Spinner from "./Components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useGetSEOQuery } from "./redux/seo/seoapi";

function App() {
  const authChecked = useAuthCheck();

  const { data: seo } = useGetSEOQuery();
  const seoData = seo?.data;

  console.log(seoData);

  if (!authChecked) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>
          {seoData?.basic?.title || "প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির"}
        </title>
        <meta
          name="description"
          content={
            seoData?.basic?.description || "প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির"
          }
        />
        <meta
          name="keywords"
          content={seoData?.basic?.keywords || "প্রিয় বাংলাদেশ"}
        />
        <meta
          name="author"
          content={seoData?.basic?.author || "প্রিয় বাংলাদেশ"}
        />
        <meta
          name="designer"
          content={seoData?.basic?.designer || "Nasim Uddin"}
        />
        <meta name="subject" content={seoData?.basic?.subject || "article"} />

        {/* og */}
        <meta
          property="og:title"
          content={seoData?.og?.ogtitle || "প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির"}
        />
        <meta property="og:type" content={seoData?.og?.ogtype || "website"} />
        <meta
          property="og:url"
          content={seoData?.og?.ogurl || "https://priyobangladesh.com"}
        />
        <meta
          property="og:image"
          content={
            seoData?.og?.ogimage ||
            "https://www.api.priyobangladesh.com/logo/1724320066592-priyo%20bangla%20final.png"
          }
        />
        <meta
          property="og:site_name"
          content={seoData?.og?.ogsitename || "প্রিয় বাংলাদেশ"}
        />
        <meta
          property="og:description"
          content={
            seoData?.og?.ogdescription || "প্রিয় বাংলাদেশ | বিশ্বজুড়ে বাঙালির"
          }
        />

        {seoData?.basic?.copyright && (
          <meta name="copyright" content={seoData?.basic?.copyright} />
        )}
        {seoData?.basic?.url && (
          <meta name="url" content={seoData?.basic?.url} />
        )}

        {seoData?.custom?.facebook_domain_verification && (
          <meta
            name="facebook-domain-verification"
            content={seoData?.custom?.facebook_domain_verification}
          />
        )}

        {seoData?.custom?.google_site_verification && (
          <meta
            name="google-site-verification"
            content={seoData?.custom?.google_site_verificatio}
          />
        )}
      </Helmet>

      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
