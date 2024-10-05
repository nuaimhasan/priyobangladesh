import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hooks/useAuthCheck";
import Spinner from "./Components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useGetSEOQuery } from "./redux/seo/seoapi";

function App() {
  const authChecked = useAuthCheck();

  const { data: seo } = useGetSEOQuery();
  const seoData = seo?.data;

  if (!authChecked) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>{seoData?.basic?.title || "Your Page Title"}</title>
        <meta
          name="description"
          content={seoData?.basic?.description || "Your Page Description"}
        />
        <meta
          name="keywords"
          content={seoData?.basic?.keywords || "Your Page Keywords"}
        />
        <meta
          name="author"
          content={seoData?.basic?.author || "Your Page Author"}
        />
        <meta
          name="designer"
          content={seoData?.basic?.designer || "Your Page Designer"}
        />
        <meta
          name="subject"
          content={seoData?.basic?.subject || "Your Page Subject"}
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
