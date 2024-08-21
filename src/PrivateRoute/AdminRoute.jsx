import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Spinner from "../Components/Spinner/Spinner";

const AdminRoute = ({ children }) => {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem("pb_jwt");
  const role = loggedUser?.data?.role;

  if (!loggedUser?.success && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && role !== "admin") {
    Swal.fire("", "you can't access this page", "error");
    return <Navigate to="/login" replace />;
  }

  if (loggedUser?.success && role === "admin") {
    return children;
  }

  return <Spinner />;
};

export default AdminRoute;
