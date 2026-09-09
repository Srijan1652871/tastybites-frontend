import { useNavigate } from "react-router-dom";

const MenuItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <div className="h-40 bg-orange-100 flex items-center justify-center overflow-hidden">
        {item.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-orange-400 text-sm">No image</span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <span className="text-sm font-semibold text-orange-500 whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>
        <p className="text-sm text-gray-500 flex-1 line-clamp-2">
          {item.description}
        </p>
        <button
          onClick={() => navigate(`/menu/${item._id}`)}
          className="mt-2 w-full py-2 rounded-md border border-orange-500 text-orange-500 text-sm font-medium hover:bg-orange-500 hover:text-white transition-colors"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;