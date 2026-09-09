import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const UserWrapper = () => {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50/40">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserWrapper;