import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full min-w-full m-0 p-0 overflow-x-hidden">

      <Navbar />

      <main className="flex-grow w-full min-w-full">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default Layout;