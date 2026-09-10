import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userDetails");
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-gray-200 w-full px-5 py-3 flex items-center justify-between">
      <h1 className="text-base font-semibold text-gray-900">Admin panel</h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-violet-200 text-sm text-violet-600 hover:bg-violet-50 transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default Navbar;