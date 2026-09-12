import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Package, Search, Loader2, MapPin, Phone, ChevronDown } from "lucide-react";

const ALL_STATUSES = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

const statusColors = {
  Pending: "badge-amber",
  Preparing: "bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full",
  "Out for Delivery": "bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full",
  Delivered: "badge-green",
  Cancelled: "badge-red",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/orders/admin`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response?.data?.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/orders/admin/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
        toast.success(`Order status updated to ${status}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.item?.name?.toLowerCase().includes(q) ||
      o.userId?.username?.toLowerCase().includes(q) ||
      o.userId?.email?.toLowerCase().includes(q) ||
      o.deliveryDetails?.address?.toLowerCase().includes(q)
    );
  });

  const summaryCards = [
    { label: "Total Orders", value: orders.length, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Pending", value: orders.filter((o) => o.status === "Pending").length, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { label: "Delivered", value: orders.filter((o) => o.status === "Delivered").length, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage customer orders and update their delivery status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${card.color}`}>
              <Package size={18} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="font-serif text-2xl font-bold text-[#1a1a2e]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by item, customer, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-500 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin mb-2" size={24} />
            Loading orders...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
              <Package size={32} />
            </div>
            <p className="text-[#1a1a2e] font-medium mb-1">No orders found</p>
            <p className="text-sm text-gray-500">
              {search ? "Try adjusting your search." : "Customer orders will appear here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((order) => (
              <div key={order._id} className="p-5 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  
                  {/* Item image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {order.item?.image?.url ? (
                      <img src={order.item.image.url} alt={order.item.name} className="w-full h-full object-cover" />
                    ) : <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>}
                  </div>

                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p className="font-semibold text-[#1a1a2e]">{order.item?.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Qty: {order.item?.quantity} · <span className="text-amber-600 font-semibold">₹{order.totalAmount}</span>
                        </p>
                      </div>
                      <span className={statusColors[order.status] || "badge-amber"}>{order.status}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="font-medium text-[#1a1a2e]">Customer:</span>
                        {order.userId?.username} ({order.userId?.email})
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={11} className="text-amber-500" />
                        {order.deliveryDetails?.address}{order.deliveryDetails?.city ? `, ${order.deliveryDetails.city}` : ""}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone size={11} className="text-amber-500" />
                        {order.deliveryDetails?.phone}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}
                      </p>
                    </div>

                    {/* Status update */}
                    <div className="mt-3 flex items-center gap-2">
                      <label className="text-xs text-gray-500 font-medium shrink-0">Update status:</label>
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          disabled={updatingId === order._id}
                          className="appearance-none text-xs border border-gray-200 rounded-lg px-3 py-1.5 pr-7 bg-white text-gray-700 focus:outline-none focus:border-amber-400 disabled:opacity-50 cursor-pointer"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {updatingId === order._id ? (
                          <Loader2 size={12} className="animate-spin absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                        ) : (
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
