import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  UtensilsCrossed,
  PlusCircle,
  Users,
  MessageSquareText,
  CalendarCheck,
  LogOut,
  X,
  Package,
  Home,
} from "lucide-react";

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const userDetails = Cookies.get("userDetails")
    ? JSON.parse(Cookies.get("userDetails"))
    : null;

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userDetails");
    window.location.href = "/login";
  };

  const navGroups = [
    {
      title: "Menu Management",
      links: [
        { to: "/admin/menu-items", icon: <UtensilsCrossed size={18} />, label: "All Items", end: true },
        { to: "/admin/menu-items/add", icon: <PlusCircle size={18} />, label: "Add New Item", end: false },
      ]
    },
    {
      title: "Operations",
      links: [
        { to: "/admin/reservations", icon: <CalendarCheck size={18} />, label: "Reservations", end: false },
        { to: "/admin/orders", icon: <Package size={18} />, label: "Orders", end: false },
        { to: "/admin/reviews", icon: <MessageSquareText size={18} />, label: "Guest Reviews", end: false },
      ]
    },
    {
      title: "Access",
      links: [
        { to: "/admin/users", icon: <Users size={18} />, label: "Users & Roles", end: false },
      ]
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-[#1a1a2e] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-[60px] flex items-center justify-between px-6 border-b border-white/10 shrink-0">
        <NavLink to="/admin/dashboard" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-7 object-contain" />
          <span className="font-serif font-bold text-lg tracking-wide text-amber-400">Admin</span>
        </NavLink>
        <button
          className="lg:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        {/* Dashboard Link */}
        <div className="space-y-1">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-400 text-[#1a1a2e] shadow-lg shadow-amber-400/20"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <Home size={18} />
            Back to Website
          </NavLink>
        </div>

        {/* Grouped Links */}
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-amber-400 text-[#1a1a2e] shadow-lg shadow-amber-400/20"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer - User Profile */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-[#1a1a2e] shrink-0">
            {userDetails?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-semibold text-white truncate">
              {userDetails?.username || "Admin User"}
            </p>
            <p className="text-xs text-amber-400 capitalize">
              {userDetails?.role || "Admin"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;