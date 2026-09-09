import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtected = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const isAuth = token && role === "admin";

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtected;