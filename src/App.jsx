import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hooks/useAuthCheck";
import Spinner from "./Components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";

function App() {
  const authChecked = useAuthCheck();
  if (!authChecked) {
    return <Spinner />;
  }

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
