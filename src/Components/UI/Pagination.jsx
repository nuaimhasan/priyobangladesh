
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({ handlePageChange, page, limit, total }) {
  return (
    <>
      <div className="flex items-center justify-center mt-16">
        <div className="flex items-center overflow-hidden text-sm border border-gray-300">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <FaArrowLeft />
          </button>
          <p className="px-4 py-2 ">{page}</p>
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={() => handlePageChange(page + 1)}
            disabled={total && page === total / limit}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
