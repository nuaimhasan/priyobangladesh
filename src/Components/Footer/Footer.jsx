import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import { useGetAllContactUsQuery } from "../../redux/contactUs/contactUsApi";
import SectionHeader from "../UI/SectionHeader";

export default function Footer() {
  const { data } = useGetAllContactUsQuery();
  const contactUs = data?.data[0];

  const { data: categories } = useGetAllCategoryQuery();
  return (
    <footer className="border-t pt-8 pb-4 bg-secondary text-white">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="w-max">
              <Link to="/">
                <img src="/images/news-portal.png" alt="" className="w-36" />
              </Link>
            </div>

            <div className="mt-2 text-sm text-neutral-content">
              <p>
                Here you can find all the latest news and updates from the
                world. We are a team of dedicated journalists who are working
                hard to provide you with the latest news from all over the
                world.
              </p>
            </div>
          </div>

          <div>
            <SectionHeader title="Categories" />
            <ul className="text-neutral-content text-[15px]">
              {categories?.data?.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/news/${category.slug}`}
                    className="hover:text-primary"
                  >
                    {category.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeader title="Get In Touch" />
            <ul className="text-neutral-content text-[15px]">
              <li className="mb-1">
                <p className="italic">{contactUs?.address}</p>
              </li>
              <li className="mb-1">
                <a
                  href={`mailto:${contactUs?.email}`}
                  className="hover:text-primary"
                >
                  {contactUs?.email}
                </a>
              </li>
              <li>
                <p>{contactUs?.phone}</p>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[15px] text-neutral-content">
            © 2024 <strong>newsportal</strong>. All Rights Reserved. Powered by
            <Link to="emanagerit.com" className="ml-1.5 underline">
              eManager
            </Link>
          </span>
          <ul className="flex items-center gap-2 text-neutral-content mt-3 sm:mt-0">
            <li>
              <a href={contactUs?.facebook} target="_blank" rel="noreferrer">
                <BsFacebook className="text-lg hover:-mt-2 duration-300" />
              </a>
            </li>
            <li>
              <a href={contactUs?.instagram} target="_blank" rel="noreferrer">
                <AiFillInstagram className="text-xl hover:-mt-2 duration-300" />
              </a>
            </li>
            <li>
              <a href={contactUs?.youtube} target="_blank" rel="noreferrer">
                <BsYoutube className="text-xl hover:-mt-2 duration-300" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
