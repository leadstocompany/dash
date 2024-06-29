import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <AnimatePresence>
      <Navbar key={"navbar"} />
      <main
        key={"main"}
        className="max-w-screen-2xl mb-5 mx-auto bg-slate-50 p-5 rounded-md flex gap-2 w-full"
      >
        <SideBar />
        <div
          key={"outlet"}
          className="p-2 bg-white rounded-md w-full overflow-x-scroll"
        >
          <Outlet />
        </div>
      </main>
    </AnimatePresence>
  );
};

export default Layout;
