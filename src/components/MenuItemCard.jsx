import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Star, Heart, Eye } from "lucide-react";

const MenuItemCard = ({ item }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleView = () => {
    if (token) {
      navigate(`/menu/${item._id}`);
    } else {
      toast.error("Please login to view details");
    }
  };

  return (
    <div className="group card overflow-hidden flex flex-col bg-white rounded-2xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-amber-50">
        {item.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
            <span className="text-4xl">🍽️</span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1a1a2e] text-xs font-semibold px-2.5 py-1 rounded-full shadow">
          {item.category}
        </span>

        {/* Availability dot */}
        <span className="absolute top-3 right-3">
          {item.availability ? (
            <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              Available
            </span>
          ) : (
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1a1a2e]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleView}
            className="flex items-center gap-1.5 bg-amber-400 text-[#1a1a2e] font-semibold text-sm px-4 py-2 rounded-full hover:bg-amber-300 transition-colors"
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif font-semibold text-[#1a1a2e] text-base leading-tight flex-1">
            {item.name}
          </h3>
          <span className="text-amber-500 font-bold text-base whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>

        {/* Stars placeholder */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1">5.0</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <button
            onClick={handleView}
            className="flex-1 py-2 rounded-xl border-2 border-amber-400 text-amber-600 text-sm font-semibold hover:bg-amber-400 hover:text-[#1a1a2e] transition-all duration-200"
          >
            View Details
          </button>
          <button
            className="p-2 rounded-xl border-2 border-gray-100 text-gray-400 hover:border-rose-400 hover:text-rose-400 transition-all duration-200"
            aria-label="Add to wishlist"
            onClick={() => toast.success("Added to wishlist!")}
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;