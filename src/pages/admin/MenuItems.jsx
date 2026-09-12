import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Pencil, Trash2, PlusCircle, Search, AlertTriangle, Loader2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/menu-items/admin/${itemToDelete._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setMenuItems((prev) => prev.filter((item) => item._id !== itemToDelete._id));
        setDeleteModalOpen(false);
      }
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">Menu Items</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your restaurant's food and beverage offerings.</p>
        </div>
        <button
          onClick={() => navigate("/admin/menu-items/add")}
          className="btn-primary shrink-0"
        >
          <PlusCircle size={16} />
          Add New Item
        </button>
      </div>

      {/* Filters/Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="form-input pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-500 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin mb-2" size={24} />
            Loading menu items...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-2xl">🍽️</div>
            <p className="text-[#1a1a2e] font-medium mb-1">No items found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or add a new menu item.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="w-16">Image</th>
                  <th>Item Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id} className="group">
                    {/* Image */}
                    <td>
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center shrink-0 border border-gray-200">
                        {item.image?.url ? (
                          <img src={item.image.url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400">No img</span>
                        )}
                      </div>
                    </td>
                    
                    {/* Details */}
                    <td>
                      <p className="font-semibold text-[#1a1a2e] mb-0.5">{item.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px] lg:max-w-xs">{item.description}</p>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="font-semibold text-[#1a1a2e]">₹{item.price}</span>
                    </td>

                    {/* Status */}
                    <td>
                      {item.availability ? (
                        <span className="badge-green">In Stock</span>
                      ) : (
                        <span className="badge-red">Sold Out</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/menu-items/edit/${item._id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => confirmDelete(item)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete"
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm" onClick={() => !isDeleting && setDeleteModalOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative z-10 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1a2e] mb-2">Delete Menu Item?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-[#1a1a2e]">"{itemToDelete?.name}"</span>? This action cannot be undone and will remove it from the public menu permanently.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : "Delete Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;