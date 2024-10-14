import { useEffect } from "react";
import AllNews from "../../Components/NewsPage/AllNews";

export default function News() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <AllNews />
    </>
  );
}
