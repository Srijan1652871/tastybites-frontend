import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userDetails");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold text-gray-900">
          <span className="text-amber-600">TASTY BITES</span>
        </NavLink>

        <div className="flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-violet-600 font-medium"
                : "text-gray-600 hover:text-violet-600 transition-colors"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/menu-items"
            className={({ isActive }) =>
              isActive
                ? "text-violet-600 font-medium"
                : "text-gray-600 hover:text-violet-600 transition-colors"
            }
          >
            Menu Items
          </NavLink>

          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-violet-200 text-violet-600 text-sm font-medium hover:bg-violet-50 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-medium"
                    : "text-gray-600 hover:text-violet-600 transition-colors"
                }
              >
                Login
              </NavLink>

              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
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