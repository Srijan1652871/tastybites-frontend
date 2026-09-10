import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

const MenuItemCard = ({ item }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="aspect-square bg-violet-100 flex items-center justify-center overflow-hidden">
        {item.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-violet-400 text-sm">No image</span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <span className="text-sm font-semibold text-violet-600 whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>

        <button
          onClick={() => {
            if (token) {
              navigate(`/menu/${item._id}`);
            } else {
              toast.error("Login to view details");
            }
          }}
          className="mt-2 w-full py-2 rounded-md border border-violet-600 text-violet-600 text-sm font-medium hover:bg-violet-600 hover:text-white transition-colors"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;