import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";

import Spinner from "../Components/Spinner/Spinner";

const AdminLayout = lazy(() => import("../Layout/AdminLayout/AdminLayout"));
const WriterLayout = lazy(() => import("../Layout/WriterLayout/WriterLayout"));
const AddAdmin = lazy(() => import("../Pages/Admin/Admins/AddAdmin"));
const AllAdmins = lazy(() => import("../Pages/Admin/Admins/AllAdmins"));
const EditAdmin = lazy(() => import("../Pages/Admin/Admins/EditAdmin"));
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard/Dashboard"));
const AddAdvertise = lazy(() =>
  import("../Pages/Admin/FrontendSettings/Advertise/AddAdvertise")
);
const Advertises = lazy(() =>
  import("../Pages/Admin/FrontendSettings/Advertise/Advertises")
);

const EditAdvertise = lazy(() =>
  import("../Pages/Admin/FrontendSettings/Advertise/EditAdvertise")
);

const Social = lazy(() =>
  import("../Pages/Admin/FrontendSettings/Social/Social")
);

const Logo = lazy(() => import("../Pages/Admin/FrontendSettings/Logo"));
const AddNews = lazy(() => import("../Pages/Admin/News/AddNews"));
const AdminViewNews = lazy(() => import("../Pages/Admin/News/AdminViewNews"));
const EditNews = lazy(() => import("../Pages/Admin/News/EditNews"));
const NewsesList = lazy(() => import("../Pages/Admin/News/NewsesList"));

//------------Category
const NewsCategories = lazy(() =>
  import("../Pages/Admin/Category/NewsCategories/NewsCategories")
);
const AddNewsCategories = lazy(() =>
  import("../Pages/Admin/Category/NewsCategories/AddNewsCategories")
);
const EditNewsCategories = lazy(() =>
  import("../Pages/Admin/Category/NewsCategories/EditNewsCategories")
);

//------------SubCategory
const SubCategories = lazy(() =>
  import("../Pages/Admin/Category/SubCategory/SubCategories")
);
const AddSubCategory = lazy(() =>
  import("../Pages/Admin/Category/SubCategory/AddSubCategory")
);
const EditSubCategory = lazy(() =>
  import("../Pages/Admin/Category/SubCategory/EditSubCategory")
);

const Profile = lazy(() => import("../Pages/Admin/Profile/Profile"));
const UpdatePassword = lazy(() =>
  import("../Pages/Admin/Profile/UpdatePassword")
);
const UpdateProfile = lazy(() =>
  import("../Pages/Admin/Profile/UpdateProfile")
);
const AddWriter = lazy(() => import("../Pages/Admin/WriterSetting/AddWriter"));
const AllWriters = lazy(() =>
  import("../Pages/Admin/WriterSetting/AllWriters")
);
const EditWriter = lazy(() =>
  import("../Pages/Admin/WriterSetting/EditWriter")
);
const ViewWriter = lazy(() =>
  import("../Pages/Admin/WriterSetting/ViewWriter")
);

const Login = lazy(() => import("../Pages/Login/Login"));
const News = lazy(() => import("../Pages/News/News"));
const NewsDetails = lazy(() => import("../Pages/NewsDetails/NewsDetails"));
const WriterAddNews = lazy(() => import("../Pages/Writer/News/WriterAddNews"));
const WriterEditNews = lazy(() =>
  import("../Pages/Writer/News/WriterEditNews")
);
const WriterNewsesList = lazy(() =>
  import("../Pages/Writer/News/WriterNewses")
);
const WriterViewNews = lazy(() =>
  import("../Pages/Writer/News/WriterViewNews")
);
const UpdateWriterPassword = lazy(() =>
  import("../Pages/Writer/Profile/UpdateWriterPassword")
);
const UpdateWriterProfile = lazy(() =>
  import("../Pages/Writer/Profile/UpdateWriterProfile")
);
const WriterProfile = lazy(() =>
  import("../Pages/Writer/Profile/WriterProfile")
);
const WriterDashboard = lazy(() =>
  import("../Pages/Writer/WriterDashboard/WriterDashboard")
);
const AdminRoute = lazy(() => import("../PrivateRoute/AdminRoute"));
const WriterRoute = lazy(() => import("../PrivateRoute/WriterRoute"));
const AdminNewses = lazy(() => import("../Pages/Admin/News/AdminNewses"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <MainLayout />
      </Suspense>
    ),
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
        path: "/news/:category/:subCategory",
        element: <News />,
      },
      {
        path: "/news/details/:slug",
        element: <NewsDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Spinner />}>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </Suspense>
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

      //------------------category
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
      //------------------sub category
      {
        path: "/admin/subCategories",
        element: <SubCategories />,
      },
      {
        path: "/admin/subCategories/add",
        element: <AddSubCategory />,
      },
      {
        path: "/admin/subCategories/edit/:id",
        element: <EditSubCategory />,
      },
      //------------------news
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
        path: "/admin/front-end/social",
        element: <Social />,
      },
    ],
  },
  // writer
  {
    path: "/writer",
    element: (
      <Suspense fallback={<Spinner />}>
        <WriterRoute>
          <WriterLayout />
        </WriterRoute>
      </Suspense>
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
