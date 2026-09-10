import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let errors = {};

    if (formdata.username === "") {
      errors.username = "User name is required";
    }

    if (formdata.email === "") {
      errors.email = "Email is required";
    } else if (!formdata.email.includes("@") || !formdata.email.includes(".")) {
      errors.email = "Invalid email";
    }

    if (formdata.password === "") {
      errors.password = "Password is required";
    }

    if (formdata.confirmpassword !== formdata.password) {
      errors.confirmpassword = "Passwords do not match";
    }

    if (formdata.adminPassword === "") {
      errors.adminPassword = "Admin password is required";
    }

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
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/register`,
          payload
        );
        if (response.data.success) {
          if (response.data.data.role !== "admin") {
            toast.error("Incorrect admin password - account created as a regular user");
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
    <div className="min-h-[80vh] flex justify-center items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 w-96 space-y-3 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-center text-gray-900">
          Create an admin account
        </h1>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">User name</label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            placeholder="Your user name"
            value={formdata.username}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
          />
          {error.username && (
            <p className="text-red-500 text-xs mt-1">{error.username}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="name@example.com"
            value={formdata.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
          />
          {error.email && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="••••••••"
            value={formdata.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
          />
          {error.password && (
            <p className="text-red-500 text-xs mt-1">{error.password}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Confirm password</label>
          <input
            type="password"
            onChange={handleChange}
            name="confirmpassword"
            placeholder="••••••••"
            value={formdata.confirmpassword}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
          />
          {error.confirmpassword && (
            <p className="text-red-500 text-xs mt-1">{error.confirmpassword}</p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-1">
          <label className="text-sm text-gray-600">
            Admin password
          </label>
          <input
            type="password"
            onChange={handleChange}
            name="adminPassword"
            placeholder="Enter the admin access code"
            value={formdata.adminPassword}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
          />
          {error.adminPassword && (
            <p className="text-red-500 text-xs mt-1">
              {error.adminPassword}
            </p>
          )}
        </div>

        {isError && <p className="text-sm text-red-600">{isError}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Create admin account"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-violet-600 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;