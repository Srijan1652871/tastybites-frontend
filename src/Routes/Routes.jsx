import { createBrowserRouter } from "react-router-dom";

import UserWrapper from "../layouts/user-panel/UserWrapper";
import Home from "../pages/Home";
import MenuItems from "../pages/MenuItems";
import MenuItemDetails from "../pages/MenuItemDetails";
import Register from "../pages/Register";
import AdminSignup from "../pages/AdminSignup";
import UserLogin from "../pages/UserLogin";
import NotFound from "../pages/NotFound";

import AdminProtected from "../components/AdminProtected";
import AdminWrapper from "../layouts/admin-panel/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
import AdminMenuItems from "../pages/admin/MenuItems";
import AddMenuItem from "../pages/admin/AddMenuItem";
import UpdateMenuItem from "../pages/admin/UpdateMenuItem";
import Users from "../pages/admin/Users";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      { path: "", element: <Home /> },
      { path: "menu-items", element: <MenuItems /> },
      { path: "menu/:id", element: <MenuItemDetails /> },
      { path: "register", element: <Register /> },
      { path: "admin-signup", element: <AdminSignup /> },
      { path: "login", element: <UserLogin /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "menu-items", element: <AdminMenuItems /> },
          { path: "menu-items/add", element: <AddMenuItem /> },
          { path: "menu-items/edit/:id", element: <UpdateMenuItem /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Routes;