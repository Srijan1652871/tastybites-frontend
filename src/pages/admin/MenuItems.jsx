import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/menu-items`);
        setMenuItems(response?.data?.data || []);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/menu-items/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setMenuItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
    }
  };

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Menu items</h1>
        <button
          onClick={() => navigate("/admin/menu-items/add")}
          className="px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
        >
          Add menu item
        </button>
      </div>

      <input
        type="text"
        placeholder="Search menu item"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
      />

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading menu items...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-sm text-gray-500">No menu items found.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Availability</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">{item.category}</td>
                  <td className="px-4 py-3 text-gray-600">₹{item.price}</td>
                  <td className="px-4 py-3">
                    {item.availability ? (
                      <span className="px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium border border-red-200">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => navigate(`/admin/menu-items/edit/${item._id}`)}
                        className="text-gray-500 hover:text-orange-500"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuItems;