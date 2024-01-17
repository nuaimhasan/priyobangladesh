import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();
  if (!authChecked) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
