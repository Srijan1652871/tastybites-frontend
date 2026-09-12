import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Navbar (fixed top) */}
      <Navbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex flex-1 pt-[60px]">
        {/* Sidebar */}
        <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 p-5 sm:p-8 w-full transition-all duration-300">
          <Outlet />
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#1a1a2e]/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminWrapper;