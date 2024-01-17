import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MainLayout() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const showButtonThreshold = 100;

    setShowScrollButton(scrollY > showButtonThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />

      {showScrollButton && (
        <div className="fixed bottom-2 right-2 z-50">
          <button
            type="button"
            className="p-3 bg-primary rounded-full shadow-lg transform transition-transform hover:scale-110 animate-bounce"
            onClick={scrollToTop}
          >
            <FaArrowUp className="text-white" />
          </button>
        </div>
      )}
    </>
  );
}
