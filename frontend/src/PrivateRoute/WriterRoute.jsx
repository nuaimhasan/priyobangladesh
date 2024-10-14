import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../Components/Spinner/Spinner";


const WriterRoute = ({ children }) => {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem("pb_jwt");
  const role = loggedUser?.data?.role;

  if (!loggedUser?.success && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && role !== "writer") {
    return <Navigate to="/login" replace />;
  }

  if (loggedUser?.success && role === "writer") {
    return children;
  }

  return <Spinner />;
};

export default WriterRoute;
