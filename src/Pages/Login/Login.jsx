import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../redux/user/userApi";

export default function Login() {
  const { loggedUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname
    ? location.state.from.pathname
    : loggedUser?.data?.role === "admin"
    ? "/admin"
    : "/writer";

  const [login, { isLoading, isError }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      Swal.fire("", "An error occured when login", "error");
    }
  }, [isError]);

  if (loggedUser?.success && !isError) {
    navigate(from, { replace: true });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.userName.value;
    const password = form.password.value;

    const info = {
      userName,
      password,
    };

    await login(info);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[90vh] px-5">
      <div className="md:w-96 w-full">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-y-3 mt-5">
            <input
              type="text"
              name="userName"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Password"
            />
            <button
              type="submit"
              disabled={isLoading && "disabled"}
              className="bg-primary text-white py-2 rounded-md"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
