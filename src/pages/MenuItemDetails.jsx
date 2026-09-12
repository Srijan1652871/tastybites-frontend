import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ChevronRight,
  Star,
  Clock,
  Flame,
  Users,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const MenuItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/menu-items/${id}`
        );
        setItem(response?.data?.data || null);

        // Check if item is in wishlist
        if (token) {
          const userRes = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/users/me`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const wishlist = userRes?.data?.data?.wishlist || [];
          setInWishlist(wishlist.some((w) => w._id === id));
        }
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItem();
  }, [id, token]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    setCartLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/cart`,
        { menuItemId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add to cart.");
    } finally {
      setCartLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!token) {
      toast.error("Please log in to save items to your wishlist.");
      navigate("/login");
      return;
    }
    setWishlistLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/wishlist/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInWishlist(response.data.inWishlist);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update wishlist.");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="aspect-video skeleton" />
          <div className="p-8 space-y-4">
            <div className="h-8 skeleton w-1/2" />
            <div className="h-4 skeleton w-1/4" />
            <div className="h-4 skeleton" />
            <div className="h-4 skeleton w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
        <div className="text-5xl mb-4">🍽️</div>
        <h2 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-2">Item Not Found</h2>
        <p className="text-gray-500 mb-6">This menu item doesn't exist or has been removed.</p>
        <button onClick={() => navigate("/menu-items")} className="btn-primary">
          Back to Menu
        </button>
      </div>
    );
  }

  const quickInfo = [
    { icon: <Flame size={18} />, label: item.calories || "N/A", sub: "Calories", color: "text-orange-500 bg-orange-50" },
    { icon: <Clock size={18} />, label: item.prepTime || "N/A", sub: "Prep Time", color: "text-blue-500 bg-blue-50" },
    { icon: <Users size={18} />, label: item.servings || "N/A", sub: "Servings", color: "text-emerald-500 bg-emerald-50" },
  ];

  return (
    <div className="bg-[#fefce8] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <NavLink to="/" className="hover:text-amber-500 transition-colors">Home</NavLink>
          <ChevronRight size={14} />
          <NavLink to="/menu-items" className="hover:text-amber-500 transition-colors">Menu</NavLink>
          <ChevronRight size={14} />
          <span className="text-amber-500 font-medium truncate">{item.name}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          {/* Hero image */}
          <div className="relative aspect-video overflow-hidden bg-amber-50">
            {item.image?.url ? (
              <img
                src={item.image.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                <span className="text-7xl">🍽️</span>
              </div>
            )}
            {/* Category badge */}
            <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[#1a1a2e] text-sm font-semibold px-3 py-1.5 rounded-full shadow">
              {item.category}
            </span>
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow"
            >
              <ArrowLeft size={18} className="text-[#1a1a2e]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left: Main Info */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="font-serif text-3xl font-bold text-[#1a1a2e] leading-tight">
                    {item.name}
                  </h1>
                  <div className="text-right shrink-0">
                    <p className="text-3xl font-bold text-amber-500 font-serif">
                      ₹{item.price}
                    </p>
                    <p className="text-xs text-gray-400">per serving</p>
                  </div>
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">5.0 (48 reviews)</span>
                </div>

                {/* Availability */}
                <div className="mb-5">
                  {item.availability ? (
                    <span className="badge-green">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      In Stock
                    </span>
                  ) : (
                    <span className="badge-red">Out of Stock</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description || "A beautifully crafted dish that showcases the finest seasonal ingredients, prepared with care by our expert culinary team."}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 btn-primary justify-center py-3 disabled:opacity-60"
                    onClick={handleAddToCart}
                    disabled={cartLoading || !item.availability}
                  >
                    {cartLoading ? <Loader2 size={17} className="animate-spin" /> : <ShoppingBag size={17} />}
                    {item.availability ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    className={`p-3 rounded-full border-2 transition-all ${
                      inWishlist
                        ? "border-rose-400 text-rose-400 bg-rose-50"
                        : "border-gray-100 text-gray-400 hover:border-rose-400 hover:text-rose-400"
                    }`}
                    onClick={handleToggleWishlist}
                    disabled={wishlistLoading}
                    aria-label="Wishlist"
                  >
                    {wishlistLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Heart size={20} className={inWishlist ? "fill-rose-400" : ""} />
                    )}
                  </button>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-5">
                {/* Quick Info from DB */}
                <div className="bg-[#fefce8] rounded-2xl p-5">
                  <h3 className="font-semibold text-[#1a1a2e] mb-4">Quick Info</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {quickInfo.map((info, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-2 p-3 bg-white rounded-xl">
                        <div className={`w-9 h-9 rounded-lg ${info.color} flex items-center justify-center`}>
                          {info.icon}
                        </div>
                        <p className="font-semibold text-sm text-[#1a1a2e]">{info.label}</p>
                        <p className="text-xs text-gray-400">{info.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Tags from DB */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-semibold text-[#1a1a2e] mb-3">Dietary Info</h3>
                  {item.dietaryTags && item.dietaryTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item.dietaryTags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No dietary info available for this item.</p>
                  )}
                </div>

                {/* Reservation prompt */}
                <div className="bg-[#1a1a2e] rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
                    <ShoppingBag size={18} className="text-[#1a1a2e]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      Want to try this at our restaurant?
                    </p>
                    <p className="text-gray-400 text-xs mt-1 mb-3">
                      Book a table and enjoy this dish freshly prepared by our chefs.
                    </p>
                    <NavLink
                      to="/reservations"
                      className="text-amber-400 text-xs font-semibold hover:underline"
                    >
                      Reserve a Table →
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;