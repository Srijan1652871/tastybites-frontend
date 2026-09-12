import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Register = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let errors = {};
    if (formdata.username === "") errors.username = "Username is required";
    if (formdata.email === "") errors.email = "Email is required";
    else if (!formdata.email.includes("@") || !formdata.email.includes(".")) errors.email = "Invalid email";
    if (formdata.password === "") errors.password = "Password is required";
    if (formdata.confirmpassword !== formdata.password) errors.confirmpassword = "Passwords do not match";
    seterror(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const payload = {
        username: formdata.username,
        email: formdata.email,
        password: formdata.password,
      };
      setisError("");
      setisLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, payload);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/3.webp')" }} />
        <div className="absolute inset-0 bg-[#1a1a2e]/75" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <NavLink to="/" className="flex items-center gap-2 mb-12">
            <img src="/logo.png" alt="TastyBites" className="h-10 object-contain" />
          </NavLink>
          <blockquote className="font-serif text-3xl font-semibold leading-snug mb-6">
            "Join thousands of food<br />
            lovers who choose{" "}
            <span className="text-amber-400 italic">TastyBites.</span>"
          </blockquote>
          <ul className="space-y-3 text-gray-300 text-sm">
            {[
              "Browse the full menu with detailed descriptions",
              "Save your favourite dishes to a wishlist",
              "Book tables & track your reservations",
              "Get member-only offers and early access",
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
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
              Create your account
            </h1>
            <p className="text-gray-400 text-sm mb-7">
              It's free and takes less than a minute.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Username</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  placeholder="e.g. john_doe"
                  value={formdata.username}
                  className="form-input"
                />
                {error.username && <p className="text-red-500 text-xs mt-1">{error.username}</p>}
              </div>

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
                    type={showPass ? "text" : "password"}
                    onChange={handleChange}
                    name="password"
                    placeholder="••••••••"
                    value={formdata.password}
                    className="form-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
              </div>

              <div>
                <label className="form-label">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    onChange={handleChange}
                    name="confirmpassword"
                    placeholder="••••••••"
                    value={formdata.confirmpassword}
                    className="form-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error.confirmpassword && <p className="text-red-500 text-xs mt-1">{error.confirmpassword}</p>}
              </div>

              {isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-red-600">{isError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center py-3.5 mt-2"
              >
                {isLoading ? <><Loader2 className="animate-spin" size={18} /> Creating account...</> : "Create Account"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-2">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-amber-500 font-semibold cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Are you an admin?{" "}
                <span
                  onClick={() => navigate("/admin-signup")}
                  className="text-gray-500 cursor-pointer hover:underline"
                >
                  Admin Signup
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;