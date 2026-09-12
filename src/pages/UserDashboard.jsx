import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Package,
  Trash2,
  Loader2,
  ShoppingBag,
  X,
  MapPin,
  Phone,
  FileText,
  ChevronRight,
} from "lucide-react";

const statusColors = {
  Pending: "badge-amber",
  Preparing: "bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full",
  "Out for Delivery": "bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full",
  Delivered: "badge-green",
  Cancelled: "badge-red",
};

// ─── Order Modal ─────────────────────────────────────
const OrderModal = ({ item, onClose, onSuccess }) => {
  const token = Cookies.get("token");
  const userDetails = Cookies.get("userDetails") ? JSON.parse(Cookies.get("userDetails")) : null;
  const [form, setForm] = useState({
    name: userDetails?.username || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/orders`,
        {
          menuItemId: item.menuItemId._id,
          name: item.menuItemId.name,
          price: item.menuItemId.price,
          quantity: item.quantity,
          image: item.menuItemId.image,
          deliveryDetails: form,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-serif text-lg font-bold text-[#1a1a2e]">Delivery Details</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={16} />
          </button>
        </div>
        {/* Order summary */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3 mb-4">
            {item.menuItemId.image?.url && (
              <img src={item.menuItemId.image.url} alt={item.menuItemId.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#1a1a2e] text-sm truncate">{item.menuItemId.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-amber-600 shrink-0">₹{item.menuItemId.price * item.quantity}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          <div>
            <label className="form-label">Full Name *</label>
            <input type="text" className="form-input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Recipient name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="form-label">Phone *</label>
            <input type="text" className="form-input" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+91 98000 00000" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="form-label">Delivery Address *</label>
            <textarea rows={2} className="form-input resize-none" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="House / Flat No., Street, Area" />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="form-label">City</label>
            <input type="text" className="form-input" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="Kolkata" />
          </div>
          <div>
            <label className="form-label">Additional Notes</label>
            <input type="text" className="form-input" value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} placeholder="Leave at door, etc." />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
            {loading ? <><Loader2 size={17} className="animate-spin" /> Placing Order...</> : <><ShoppingBag size={17} /> Confirm Order</>}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────
const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("wishlist");
  const [orderModal, setOrderModal] = useState(null); // item object
  const [removingId, setRemovingId] = useState(null);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [userRes, ordersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_SERVER_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_SERVER_URL}/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setUserData(userRes.data.data);
      setOrders(ordersRes.data.data || []);
    } catch (error) {
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchData();
  }, [token]);

  const handleRemoveFromWishlist = async (menuId) => {
    setRemovingId(menuId);
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/wishlist/${menuId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData((prev) => ({ ...prev, wishlist: prev.wishlist.filter((w) => w._id !== menuId) }));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  const handleRemoveFromCart = async (menuId) => {
    setRemovingId(menuId);
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/users/cart/${menuId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData((prev) => ({ ...prev, cart: prev.cart.filter((c) => c.menuItemId._id !== menuId) }));
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddWishlistToCart = async (menuItem) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/cart`,
        { menuItemId: menuItem._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${menuItem.name} added to cart!`);
      fetchData(); // Refresh to show in cart tab
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const tabs = [
    { id: "wishlist", label: "Wishlist", icon: <Heart size={16} />, count: userData?.wishlist?.length },
    { id: "cart", label: "Your Cart", icon: <ShoppingCart size={16} />, count: userData?.cart?.length },
    { id: "orders", label: "My Orders", icon: <Package size={16} />, count: orders.length },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-amber-500 mx-auto mb-3" size={40} />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-5 sm:px-8">
      {orderModal && (
        <OrderModal
          item={orderModal}
          onClose={() => setOrderModal(null)}
          onSuccess={fetchData}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-amber-400 text-sm font-medium mb-1">Welcome back</p>
            <h1 className="font-serif text-2xl font-bold text-white">{userData?.username}</h1>
            <p className="text-gray-400 text-sm mt-1">{userData?.email}</p>
          </div>
          <NavLink to="/menu-items" className="btn-primary !px-5 !py-2.5 text-sm shrink-0 inline-flex items-center gap-2">
            <ShoppingBag size={15} /> Browse Menu
          </NavLink>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50/50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center shrink-0">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* ── Wishlist Tab ──────────────────────── */}
            {activeTab === "wishlist" && (
              <div>
                {userData?.wishlist?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                      <Heart size={28} className="text-rose-300" />
                    </div>
                    <p className="font-medium text-[#1a1a2e] mb-1">Your wishlist is empty</p>
                    <p className="text-sm text-gray-500 mb-5">Save items you love by clicking the heart icon.</p>
                    <NavLink to="/menu-items" className="btn-primary !px-5 !py-2 text-sm inline-flex">Browse Menu</NavLink>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userData.wishlist.map((item) => (
                      <div key={item._id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                        <div className="relative aspect-video overflow-hidden bg-gray-50">
                          {item.image?.url ? (
                            <img src={item.image.url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <p className="font-semibold text-[#1a1a2e] text-sm">{item.name}</p>
                              <p className="text-amber-500 font-bold text-base mt-0.5">₹{item.price}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveFromWishlist(item._id)}
                              disabled={removingId === item._id}
                              className="w-8 h-8 rounded-lg bg-rose-50 text-rose-400 hover:bg-rose-100 flex items-center justify-center transition-colors shrink-0"
                            >
                              {removingId === item._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddWishlistToCart(item)}
                              className="flex-1 py-2 bg-[#1a1a2e] text-white text-xs font-semibold rounded-lg hover:bg-[#2d2d4e] transition-colors flex items-center justify-center gap-1.5"
                            >
                              <ShoppingCart size={12} /> Add to Cart
                            </button>
                            <NavLink
                              to={`/menu/${item._id}`}
                              className="py-2 px-3 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                            >
                              View <ChevronRight size={12} />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Cart Tab ─────────────────────────── */}
            {activeTab === "cart" && (
              <div>
                {userData?.cart?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart size={28} className="text-amber-300" />
                    </div>
                    <p className="font-medium text-[#1a1a2e] mb-1">Your cart is empty</p>
                    <p className="text-sm text-gray-500 mb-5">Add items from the menu to get started.</p>
                    <NavLink to="/menu-items" className="btn-primary !px-5 !py-2 text-sm inline-flex">Browse Menu</NavLink>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userData.cart.map((cartItem) => (
                      <div key={cartItem.menuItemId._id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                          {cartItem.menuItemId.image?.url ? (
                            <img src={cartItem.menuItemId.image.url} alt={cartItem.menuItemId.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#1a1a2e] text-sm truncate">{cartItem.menuItemId.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {cartItem.quantity}</p>
                          <p className="text-amber-600 font-bold text-sm mt-1">₹{cartItem.menuItemId.price * cartItem.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setOrderModal(cartItem)}
                            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <ShoppingBag size={13} /> Order Now
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(cartItem.menuItemId._id)}
                            disabled={removingId === cartItem.menuItemId._id}
                            className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors"
                          >
                            {removingId === cartItem.menuItemId._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── My Orders Tab ─────────────────────── */}
            {activeTab === "orders" && (
              <div>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <Package size={28} className="text-blue-300" />
                    </div>
                    <p className="font-medium text-[#1a1a2e] mb-1">No orders yet</p>
                    <p className="text-sm text-gray-500 mb-5">Add items to cart and place your first order.</p>
                    <button onClick={() => setActiveTab("cart")} className="btn-primary !px-5 !py-2 text-sm inline-flex">Go to Cart</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white overflow-hidden border border-gray-200 shrink-0">
                              {order.item?.image?.url ? (
                                <img src={order.item.image.url} alt={order.item.name} className="w-full h-full object-cover" />
                              ) : <div className="w-full h-full flex items-center justify-center text-lg">🍽️</div>}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1a1a2e]">{order.item?.name}</p>
                              <p className="text-xs text-gray-500">Qty: {order.item?.quantity} · ₹{order.totalAmount}</p>
                            </div>
                          </div>
                          <span className={statusColors[order.status] || "badge-amber"}>{order.status}</span>
                        </div>
                        <div className="px-4 py-3 flex flex-wrap gap-x-6 gap-y-1">
                          <p className="text-xs text-gray-500 flex items-center gap-1.5">
                            <MapPin size={12} className="text-amber-500" />
                            {order.deliveryDetails?.address}{order.deliveryDetails?.city ? `, ${order.deliveryDetails.city}` : ""}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1.5">
                            <Phone size={12} className="text-amber-500" />
                            {order.deliveryDetails?.phone}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
