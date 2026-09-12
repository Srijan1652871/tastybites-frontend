import { useState } from "react";
import { Loader2, Eye, EyeOff, UtensilsCrossed, Star } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";

const UserLogin = () => {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let errors = {};
    if (formdata.email === "") errors.email = "Email is required";
    else if (!formdata.email.includes("@") || !formdata.email.includes(".")) errors.email = "Invalid email";
    if (formdata.password === "") errors.password = "Password is required";
    seterror(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setisError("");
      setisLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, formdata);
        if (response.data.success) {
          toast.success(response.data.message);
          Cookies.set("token", response.data.token);
          Cookies.set("role", response.data.user.role);
          Cookies.set("userDetails", JSON.stringify(response.data.user));
          if (response.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        const errMessage = error?.response?.data?.message;
        toast.error(errMessage);
        setisError(errMessage);
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/1.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#1a1a2e]/75" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <NavLink to="/" className="flex items-center gap-2 mb-12">
            <img src="/logo.png" alt="TastyBites" className="h-10 object-contain" />
          </NavLink>
          <blockquote className="font-serif text-3xl font-semibold leading-snug mb-6">
            "Where every meal<br />
            becomes a <span className="text-amber-400 italic">memory.</span>"
          </blockquote>
          <p className="text-gray-300 text-sm leading-relaxed mb-10">
            Sign in to browse our full menu, view item details and enjoy a personalised dining experience.
          </p>
          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["P", "R", "A", "V"].map((l, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${["from-amber-400 to-orange-500","from-rose-400 to-pink-500","from-blue-400 to-indigo-500","from-emerald-400 to-teal-500"][i]}`}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">500+ happy guests this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-[#fefce8]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <NavLink to="/" className="flex items-center justify-center mb-8 lg:hidden">
            <img src="/logo.png" alt="TastyBites" className="h-10 object-contain" />
          </NavLink>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h1 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-1">
              Welcome back
            </h1>
            <p className="text-gray-400 text-sm mb-7">
              Sign in to your TastyBites account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  placeholder="name@example.com"
                  value={formdata.email}
                  className="form-input"
                />
                {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
              </div>

              <div>
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    name="password"
                    placeholder="••••••••"
                    value={formdata.password}
                    className="form-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
              </div>

              {isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-red-600">{isError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center py-3.5"
              >
                {isLoading ? <><Loader2 className="animate-spin" size={18} /> Signing in...</> : "Sign In"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-amber-500 font-semibold cursor-pointer hover:underline"
                >
                  Create one free
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;