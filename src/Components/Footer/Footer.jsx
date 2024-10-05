import { BsFacebook, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/category/categoryApi";
import { useGetAllLogoQuery } from "../../redux/logo/logoApi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineMail } from "react-icons/md";
import { useGetSocialQuery } from "../../redux/socialApi";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  const { data: logo } = useGetAllLogoQuery();

  const { data: categories } = useGetAllCategoryQuery();
  const { data: social } = useGetSocialQuery();

  return (
    <footer className="border-t pt-8 pb-4 bg-base-100">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="w-max">
              <Link to="/">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                    logo?.data[0]?.logo
                  }`}
                  alt=""
                  className="w-40 sm:w-48"
                />
              </Link>

              <h2 className="text-xl font-medium">Priyo Bangladesh</h2>
            </div>

            <div className="mt-2"></div>
          </div>

          <div>
            <ul className="text-[15px]">
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
            <ul className="text-[15px]">
              <li className="mb-1">
                <p className="font-semibold mb-1">প্রধান সম্পাদক</p>
                <p className="text-neutral-content">জাহিদ আলামিন</p>
              </li>
              <li className="mb-1">
                <p className="font-semibold mb-1">সম্পাদক</p>
                <p className="text-neutral-content">মিজানুর রহমান</p>
              </li>
              <li className="mb-1">
                <p className="font-semibold">রেজি নম্বর</p>
                <p className="text-neutral-content">১৭৪</p>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-[15px]">
              <li className="mb-1 flex items-start gap-1">
                <p>
                  <IoLocationOutline className="text-lg mt-1.5" />
                </p>
                <p>২৭০-বি,(৩য় তলা),তেজগাঁও শিল্প এলাকা,ঢাকা-১২০৪</p>
              </li>
              <li className="mb-1 flex items-start gap-1">
                <p>
                  <MdOutlinePhone className="text-lg mt-1" />
                </p>
                <p>০১৯১১-৪৯৫৯০৯</p>
              </li>
              <li className="mb-1 flex items-start gap-1">
                <p>
                  <MdOutlineMail className="text-lg mt-1" />
                </p>
                <p>editorpriyobangladesh@outlook.com</p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-gray-200 sm:mx-auto" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[13px] text-neutral-content">
            © 2024 priyobangladesh. All Rights Reserved. Develop by
            <Link
              to="https://emanagerit.com"
              target="blank"
              className="ml-1.5 underline"
            >
              eManager
            </Link>
          </span>
          <ul className="flex items-center gap-2 mt-3 sm:mt-0">
            <li>
              <Link to={social?.data?.facebook} target="_blank">
                <BsFacebook className="text-base hover:-mt-1 duration-300" />
              </Link>
            </li>
            <li>
              <Link to={social?.data?.twitter} target="_blank">
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link to={social?.data?.youtube} target="_blank">
                <BsYoutube className="text-[19px] hover:-mt-1 duration-300" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
