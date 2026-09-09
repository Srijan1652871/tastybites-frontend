import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";

const UserLogin = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
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

    if (formdata.email === "") {
      errors.email = "Email is required";
    } else if (!formdata.email.includes("@") || !formdata.email.includes(".")) {
      errors.email = "Invalid email";
    }

    if (formdata.password === "") {
      errors.password = "Password is required";
    }

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
    <div className="min-h-[80vh] flex justify-center items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 w-96 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center text-gray-900">
          Log in to TastyBites
        </h1>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="name@example.com"
            value={formdata.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
          {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="••••••••"
            value={formdata.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
          {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
        </div>

        {isError && <p className="text-sm text-red-600">{isError}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Log in"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;