import { Menu, Bell, Search, ChevronRight } from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  // Generate simple breadcrumbs from path
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isDashboard = pathnames.length === 1 && pathnames[0] === "admin";

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-[60px] bg-white/80 backdrop-blur-md border-b border-gray-200 z-30 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-4 sm:px-8">
        
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center text-sm text-gray-500">
            <NavLink to="/admin/dashboard" className="hover:text-amber-500 transition-colors">
              Admin
            </NavLink>
            {!isDashboard && pathnames.slice(1).map((name, index) => {
              const isLast = index === pathnames.length - 2;
              const formattedName = name.replace("-", " ");
              return (
                <div key={name} className="flex items-center">
                  <ChevronRight size={14} className="mx-1" />
                  <span className={`capitalize ${isLast ? "text-[#1a1a2e] font-semibold" : ""}`}>
                    {formattedName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search bar (UI only) */}
          <div className="hidden md:flex relative mr-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-9 pr-4 py-1.5 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all w-48 lg:w-64"
            />
          </div>

          {/* Notification bell (UI only) */}
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;