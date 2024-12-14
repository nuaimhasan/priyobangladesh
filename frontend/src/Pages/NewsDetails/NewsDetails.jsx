import perser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import {
  useGetAllNewsQuery,
  useGetNewsBySlugQuery,
} from "../../redux/news/newsApi";
import CategoryLength from "../../Components/NewsPage/CategoryLength";
import NewsCard from "../../Components/UI/Cards/NewsCard";
import RecentNews from "../../Components/UI/RecentNews/RecentNews";
import SectionHeader from "../../Components/UI/SectionHeader";
import Spinner from "../../Components/Spinner/Spinner";
import { useGetAllAdvertiseQuery } from "../../redux/advertise/advertiseApi";
import SidebarAdd from "../../Components/Advertises/SidebarAdd";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import moment from "moment";
import { Helmet } from "react-helmet-async";

export default function NewsDetails() {
  window.scroll(0, 0);

  const { slug } = useParams();
  const { data, isLoading } = useGetNewsBySlugQuery(slug);
  const news = data?.data;
  const perserDescription = news?.details && perser(news?.details);

  const query = {};
  query["limit"] = 4;
  query["status"] = "active";
  query["category"] = news?.category?.category;
  const { data: newsesData, isLoading: allLoading } = useGetAllNewsQuery({
    ...query,
  });
  const newses = newsesData?.data;

  const detailsAddQuery = {};
  detailsAddQuery["showingPlace"] = "details";
  const { data: detailsAddData } = useGetAllAdvertiseQuery({
    ...detailsAddQuery,
  });
  const detailsAdd = detailsAddData?.data[0];

  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/news/${news?.image}`;
  const url = `${import.meta.env.VITE_FRONT_END_URL}/news/${news?.slug}`;
  const title = news?.title;

  if (isLoading || allLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={perserDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="artical" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news?.title} />
        <meta name="twitter:description" content={perserDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={url} />
      </Helmet>
      <section>
        <div className="container pt-2 pb-4">
          <div className="flex md:flex-row flex-col items-start gap-5">
            <div className="w-full text-gray-800">
              <img
                src={imageUrl}
                alt={news?.title}
                className="w-full md:max-h-[400px] rounded-md"
              />
              <div className="sm:flex items-center justify-between my-2">
                <p className="text-neutral-content text-sm">
                  প্রকাশ: {moment(news?.createdAt).format("DD MMMM YYYY")}
                </p>

                <div className="mt-2 sm:mt-0">
                  <FacebookShareButton
                    url={url}
                    title={title}
                    quote={title}
                    hashtag="#priyoBangladesh"
                  >
                    <FaFacebook className="text-xl text-blue-600" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={url}
                    title={title}
                    via="YourTwitterHandle"
                  >
                    <FaSquareXTwitter className="text-xl" />
                  </TwitterShareButton>
                  <TelegramShareButton url={url} title={title}>
                    <FaTelegram className="text-xl text-sky-500" />
                  </TelegramShareButton>
                  <LinkedinShareButton
                    url={url}
                    title={title}
                    summary="Check out this amazing website!"
                    source="Website Source"
                  >
                    <FaLinkedin className="text-xl text-sky-400" />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={url} title={title}>
                    <FaWhatsappSquare className="text-xl text-green-500" />
                  </WhatsappShareButton>
                </div>
              </div>
              <h1 className="text-2xl font-medium mt-4 mb-2">{news?.title}</h1>
              <div className="text-neutral-content">
                <div className="w-[90%] md:w-1/2 mx-auto">
                  <Link to={detailsAdd?.link} target="_blank">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/advertise/${
                        detailsAdd?.image
                      }`}
                      alt=""
                      className="w-full h-14 mx-auto"
                    />
                  </Link>
                </div>

                <p>{perserDescription}</p>
              </div>
            </div>

            <div className="shrink-0 md:w-72 w-full">
              {/* ----------------সর্বশেষ সংবাদ---------------- */}
              <RecentNews />
              {/* category */}
              <div className=" w-full bg-white p-4 rounded-md mt-5">
                <SectionHeader title="ক্যাটাগরি" />
                <CategoryLength />
              </div>
              <div className="mt-4">
                <SidebarAdd />
              </div>
            </div>
          </div>

          {/* ------------------related news------------------ */}
          <div className="my-10">
            <SectionHeader title="সম্পর্কিত সংবাদ" />
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {newses
                ?.filter((news) => news._id !== data?.data?._id)
                .map((news) => (
                  <NewsCard key={news?._id} news={news} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
