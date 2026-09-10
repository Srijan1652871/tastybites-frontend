import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UtensilsCrossed } from "lucide-react";
import MenuItemCard from "../components/MenuItemCard";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/menu-items`
        );
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
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-5">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Menu items
        </h1>

        {!token && (
          <p className="text-sm text-gray-500">
            Login to browse more
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-9 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : menuItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <UtensilsCrossed
            size={32}
            strokeWidth={1.5}
            className="text-violet-400 mb-3"
          />
          <p className="text-sm text-gray-500">
            No menu items available right now.
          </p>
        </div>
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