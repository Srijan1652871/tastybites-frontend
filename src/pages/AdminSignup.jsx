import { useState } from "react";
import { Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const AdminSignup = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    adminPassword: "",
  });
  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
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
    if (formdata.adminPassword === "") errors.adminPassword = "Admin access code is required";
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
        adminPassword: formdata.adminPassword,
      };
      setisError("");
      setisLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, payload);
        if (response.data.success) {
          if (response.data.data.role !== "admin") {
            toast.error("Incorrect admin code — account created as a regular user");
            navigate("/login");
            return;
          }
          toast.success("Admin account created successfully");
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
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-6 py-16 bg-[#fefce8]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-[#1a1a2e] flex items-center justify-center mb-4">
              <ShieldCheck size={26} className="text-amber-400" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">
              Admin Registration
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              This page is restricted to authorised personnel only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Username</label>
              <input type="text" onChange={handleChange} name="username" placeholder="Admin username" value={formdata.username} className="form-input" />
              {error.username && <p className="text-red-500 text-xs mt-1">{error.username}</p>}
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input type="text" onChange={handleChange} name="email" placeholder="admin@example.com" value={formdata.email} className="form-input" />
              {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} onChange={handleChange} name="password" placeholder="••••••••" value={formdata.password} className="form-input pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input type="password" onChange={handleChange} name="confirmpassword" placeholder="••••••••" value={formdata.confirmpassword} className="form-input" />
              {error.confirmpassword && <p className="text-red-500 text-xs mt-1">{error.confirmpassword}</p>}
            </div>

            {/* Admin code */}
            <div className="border-t border-gray-100 pt-4">
              <label className="form-label flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-amber-500" />
                Admin Access Code *
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Enter the secret admin code provided by your system administrator.
              </p>
              <div className="relative">
                <input type={showAdmin ? "text" : "password"} onChange={handleChange} name="adminPassword" placeholder="Enter admin access code" value={formdata.adminPassword} className="form-input pr-10" />
                <button type="button" onClick={() => setShowAdmin(!showAdmin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showAdmin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error.adminPassword && <p className="text-red-500 text-xs mt-1">{error.adminPassword}</p>}
            </div>

            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-600">{isError}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3.5 mt-1">
              {isLoading ? <><Loader2 className="animate-spin" size={18} /> Creating...</> : <><ShieldCheck size={17} /> Create Admin Account</>}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="text-amber-500 font-semibold cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;