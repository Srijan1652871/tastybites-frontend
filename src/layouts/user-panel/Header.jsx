import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  UtensilsCrossed,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");
  const userDetails = Cookies.get("userDetails")
    ? JSON.parse(Cookies.get("userDetails"))
    : null;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userDetails");
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/menu-items", label: "Menu", end: false },
    { to: "/about", label: "About", end: false },
    { to: "/reservations", label: "Reservations", end: false },
    { to: "/contact", label: "Contact", end: false },
  ];

  const activeLinkClass =
    "text-amber-400 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-amber-400 after:rounded-full";

  const inactiveLinkClass =
    "text-gray-300 hover:text-white font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-amber-400 after:rounded-full after:transition-all after:duration-300";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-[#1a1a2e]/80 backdrop-blur-sm"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="TastyBites"
            className="h-9 w-auto object-contain"
            style={{ filter: "brightness(1.1)" }}
          />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7 text-[0.9rem]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? activeLinkClass : inactiveLinkClass
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#1a1a2e]">
                    {userDetails?.username?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>

                <span className="max-w-[80px] truncate">
                  {userDetails?.username || "Account"}
                </span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${userMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-scale-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userDetails?.email}
                    </p>
                  </div>

                  {userDetails?.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin/dashboard")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2"
                    >
                      <UtensilsCrossed size={14} />
                      Admin Panel
                    </button>
                  )}

                  {userDetails?.role === "user" && (
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2"
                    >
                      <User size={14} />
                      My Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() =>
                  navigate("/login", {
                    state: { from: location.pathname },
                  })
                }
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="btn-primary !py-2 !px-5 !text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1a2e] border-t border-white/10 animate-slide-down">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="border-t border-white/10 mt-2 pt-3 flex flex-col gap-2">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() =>
                      navigate("/login", {
                        state: { from: location.pathname },
                      })
                    }
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-left"
                  >
                    Login
                  </button>

                  <NavLink
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-center text-[#1a1a2e] bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    Create Account
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;