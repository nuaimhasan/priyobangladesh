import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hooks/useAuthCheck";
import Spinner from "./Components/Spinner/Spinner";

function App() {
  const authChecked = useAuthCheck();
  if (!authChecked) {
    return <Spinner />;
  }

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
