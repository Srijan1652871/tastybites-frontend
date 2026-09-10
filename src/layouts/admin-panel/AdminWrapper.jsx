import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-5 bg-violet-50/40">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;