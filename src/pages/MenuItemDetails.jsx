import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/menu-items/${id}`
        );
        setItem(response?.data?.data || null);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItem();
  }, [id]);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 text-sm py-6">
        Loading...
      </p>
    );
  }

  if (!item) {
    return (
      <p className="text-center text-gray-500 text-sm py-6">
        Menu item not found.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="aspect-video bg-violet-100 flex items-center justify-center overflow-hidden">
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

        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              {item.name}
            </h1>

            <span className="text-lg font-semibold text-violet-600 whitespace-nowrap">
              ₹{item.price}
            </span>
          </div>

          <span className="inline-block text-xs text-violet-600 border border-violet-300 rounded-full px-3 py-1">
            {item.category}
          </span>

          <p className="text-sm text-gray-600">
            {item.description}
          </p>

          {item.availability ? (
            <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200">
              In Stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium border border-red-200">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;