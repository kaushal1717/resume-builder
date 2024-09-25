import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
