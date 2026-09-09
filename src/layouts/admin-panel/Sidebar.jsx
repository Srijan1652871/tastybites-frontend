import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm ${
    isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-600 hover:bg-gray-50"
  }`;

const Sidebar = () => {
  return (
    <div className="h-screen w-52 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col gap-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/menu-items" end className={linkClass}>
          Menu Items
        </NavLink>
        <NavLink to="/admin/menu-items/add" className={linkClass}>
          Add Menu Item
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;