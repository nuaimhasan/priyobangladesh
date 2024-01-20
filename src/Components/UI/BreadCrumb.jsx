/* eslint-disable react/prop-types */
import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumb({ maxSegmentsToShow }) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter((segment) => segment);

  if (!segments || segments.length === 0) {
    return (
      <div className="py-1 bg-gray-50 text-gray-800">
        <nav aria-label="breadcrumb" className="container">
          <ol className="flex h-8 space-x-2">
            <li className="flex items-center">
              <Link to="/">
                <FaHome className="" />
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    );
  }

  const visibleSegments = maxSegmentsToShow
    ? segments.slice(0, maxSegmentsToShow)
    : segments;

  return (
    <div className="py-2 text-gray-800 text-sm hidden sm:block">
      <nav aria-label="breadcrumb" className="">
        <ol className="sm:flex items-center">
          <li className="flex items-center">
            {segments[0] === "admin" ? (
              <Link to="/admin/dashboard" className="capitalize">
                <MdOutlineSpaceDashboard className="text-base" />
              </Link>
            ) : (
              <Link to="/">
                <FaHome className="" />
              </Link>
            )}
            <span className="mx-2">/</span>
          </li>
          {visibleSegments.map((segment, i) => (
            <li key={i} className="flex items-center">
              <Link
                to={`/${visibleSegments.slice(0, i + 1).join("/")}`}
                className="capitalize"
              >
                {segment}
              </Link>
              <span className="mx-2">
                {i < visibleSegments.length - 1 && " / "}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
