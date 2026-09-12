import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const UserWrapper = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fefce8]">
      <Header />
      <div className="flex-1 pt-[68px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserWrapper;