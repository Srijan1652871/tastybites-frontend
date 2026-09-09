import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MenuItemCard from "../components/MenuItemCard";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/menu-items`);
        const allItems = response?.data?.data || [];

        if (token) {
          setMenuItems(allItems);
        } else {
          const shuffled = [...allItems].sort(() => 0.5 - Math.random());
          setMenuItems(shuffled.slice(0, 3));
        }
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Menu items</h1>
        {!token && (
          <p className="text-sm text-gray-500">
            Showing a few picks from our menu — log in to see everything.
          </p>
        )}
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 text-sm">Loading menu...</p>
      ) : menuItems.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No menu items available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuItems.map((item) => (
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItems;