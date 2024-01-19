import { createBrowserRouter } from "react-router-dom";
import NewsDetails from "../Components/NewsDetails/NewsDetails";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import MainLayout from "../Layout/MainLayout";
import WriterLayout from "../Layout/WriterLayout/WriterLayout";
import AddAdmin from "../Pages/Admin/Admins/AddAdmin";
import AllAdmins from "../Pages/Admin/Admins/AllAdmins";
import EditAdmin from "../Pages/Admin/Admins/EditAdmin";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AboutUs from "../Pages/Admin/FrontendSettings/AboutUs";
import AddAdvertise from "../Pages/Admin/FrontendSettings/Advertise/AddAdvertise";
import Advertises from "../Pages/Admin/FrontendSettings/Advertise/Advertises";
import EditAdvertise from "../Pages/Admin/FrontendSettings/Advertise/EditAdvertise";
import AddBreakingNews from "../Pages/Admin/FrontendSettings/BreakingNews/AddBreakingNews";
import BreakingNews from "../Pages/Admin/FrontendSettings/BreakingNews/BreakingNews";
import ContactUs from "../Pages/Admin/FrontendSettings/ContactUs";
import Logo from "../Pages/Admin/FrontendSettings/Logo";
import Theme from "../Pages/Admin/FrontendSettings/Theme";
import AddNews from "../Pages/Admin/News/AddNews";
import AdminViewNews from "../Pages/Admin/News/AdminViewNews";
import EditNews from "../Pages/Admin/News/EditNews";
import NewsesList from "../Pages/Admin/News/NewsesList";
import AddNewsCategories from "../Pages/Admin/NewsCategories/AddNewsCategories";
import EditNewsCategories from "../Pages/Admin/NewsCategories/EditNewsCategories";
import NewsCategories from "../Pages/Admin/NewsCategories/NewsCategories";
import Profile from "../Pages/Admin/Profile/Profile";
import UpdatePassword from "../Pages/Admin/Profile/UpdatePassword";
import UpdateProfile from "../Pages/Admin/Profile/UpdateProfile";
import AddWriter from "../Pages/Admin/WriterSetting/AddWriter";
import AllWriters from "../Pages/Admin/WriterSetting/AllWriters";
import EditWriter from "../Pages/Admin/WriterSetting/EditWriter";
import ViewWriter from "../Pages/Admin/WriterSetting/ViewWriter";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import News from "../Pages/News/News";
import WriterAddNews from "../Pages/Writer/News/WriterAddNews";
import WriterEditNews from "../Pages/Writer/News/WriterEditNews";
import WriterNewsesList from "../Pages/Writer/News/WriterNewses";
import WriterViewNews from "../Pages/Writer/News/WriterViewNews";
import UpdateWriterPassword from "../Pages/Writer/Profile/UpdateWriterPassword";
import UpdateWriterProfile from "../Pages/Writer/Profile/UpdateWriterProfile";
import WriterProfile from "../Pages/Writer/Profile/WriterProfile";
import WriterDashboard from "../Pages/Writer/WriterDashboard/WriterDashboard";
import AdminRoute from "../PrivateRoute/AdminRoute";
import WriterRoute from "../PrivateRoute/WriterRoute";
import AdminNewses from "../Pages/Admin/News/AdminNewsws";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:category",
        element: <News />,
      },
      {
        path: "/news/:category/:slug",
        element: <NewsDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/categories",
        element: <NewsCategories />,
      },
      {
        path: "/admin/categories/add-category",
        element: <AddNewsCategories />,
      },
      {
        path: "/admin/categories/edit-category/:id",
        element: <EditNewsCategories />,
      },
      {
        path: "/admin/news",
        element: <NewsesList />,
      },
      {
        path: "/admin/admin-news",
        element: <AdminNewses />,
      },
      {
        path: "/admin/news/add-news",
        element: <AddNews />,
      },
      {
        path: "/admin/news/edit-news/:id",
        element: <EditNews />,
      },
      {
        path: "/admin/news/:id",
        element: <AdminViewNews />,
      },
      {
        path: "/admin/writers",
        element: <AllWriters />,
      },
      {
        path: "/admin/writers/add-writer",
        element: <AddWriter />,
      },
      {
        path: "/admin/writers/edit-writer/:id",
        element: <EditWriter />,
      },
      {
        path: "/admin/writers/:userName",
        element: <ViewWriter />,
      },
      {
        path: "/admin/admins",
        element: <AllAdmins />,
      },
      {
        path: "/admin/admins/add-admin",
        element: <AddAdmin />,
      },
      {
        path: "/admin/admins/edit-admin/:id",
        element: <EditAdmin />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        path: "/admin/profile/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/admin/profile/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "/admin/front-end/logo",
        element: <Logo />,
      },
      {
        path: "/admin/front-end/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/admin/front-end/about-us",
        element: <AboutUs />,
      },
      {
        path: "/admin/front-end/theme",
        element: <Theme />,
      },
      {
        path: "/admin/front-end/advertise",
        element: <Advertises />,
      },
      {
        path: "/admin/front-end/advertise/add-advertise",
        element: <AddAdvertise />,
      },
      {
        path: "/admin/front-end/advertise/edit-advertise/:id",
        element: <EditAdvertise />,
      },
      {
        path: "/admin/front-end/breaking-news",
        element: <BreakingNews />,
      },
      {
        path: "/admin/front-end/breaking-news/add-breaking-news",
        element: <AddBreakingNews />,
      },
    ],
  },
  // writer
  {
    path: "/writer",
    element: (
      <WriterRoute>
        <WriterLayout />
      </WriterRoute>
    ),
    children: [
      {
        path: "/writer",
        element: <WriterDashboard />,
      },
      {
        path: "/writer/dashboard",
        element: <WriterDashboard />,
      },
      {
        path: "/writer/news",
        element: <WriterNewsesList />,
      },
      {
        path: "/writer/news/add-news",
        element: <WriterAddNews />,
      },
      {
        path: "/writer/news/edit-news/:id",
        element: <WriterEditNews />,
      },
      {
        path: "/writer/news/:id",
        element: <WriterViewNews />,
      },
      {
        path: "/writer/profile",
        element: <WriterProfile />,
      },
      {
        path: "/writer/profile/update-profile",
        element: <UpdateWriterProfile />,
      },
      {
        path: "/writer/profile/update-password",
        element: <UpdateWriterPassword />,
      },
    ],
  },
]);
