import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userDetails");
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold text-gray-900">
          <span className="text-orange-500">TastyBites</span>
        </NavLink>
        <div className="flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu-items"
            className={({ isActive }) =>
              isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
            }
          >
            Menu Items
          </NavLink>

          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
                }
              >
                Login
              </NavLink>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;