import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../Components/AdminComponents/AdminHeader/AdminHeader";
import WriterSidebar from "../../Components/WriterComponents/WriterSidebar";
import "./Writer.css";

export default function WriterLayout() {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".admin_sidebar") &&
          !e.target.closest(".admin_sidebar_btn")) ||
        e.target.closest(".admin_siderbar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  return (
    <section className="flex">
      <aside className={`admin_sidebar ${sidebar && "admin_sidebar_show"}`}>
        <WriterSidebar />
      </aside>
      <div className="admin_content">
        <AdminHeader setSidebar={setSidebar} />
        <main className="sm:p-5 py-5">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
