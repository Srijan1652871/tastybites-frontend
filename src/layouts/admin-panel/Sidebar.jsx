import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Plus,
  Users,
} from "lucide-react";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
    isActive
      ? "bg-violet-50 text-violet-600 font-medium"
      : "text-gray-600 hover:bg-gray-50"
  }`;

const Sidebar = () => {
  return (
    <div className="h-screen w-52 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col gap-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/menu-items" end className={linkClass}>
          <UtensilsCrossed size={16} />
          Menu Items
        </NavLink>

        <NavLink to="/admin/menu-items/add" className={linkClass}>
          <Plus size={16} />
          Add Menu Item
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={16} />
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;