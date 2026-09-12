import { useNavigate } from "react-router-dom";
import { ChefHat, ArrowLeft, UtensilsCrossed } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center bg-[#fefce8]">
      {/* Playful plate animation placeholder */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-[8px] border-amber-100 flex items-center justify-center bg-white shadow-inner mb-4">
          <UtensilsCrossed size={48} className="text-gray-300" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-4 rotate-12">
          <ChefHat size={32} className="text-amber-400" strokeWidth={1.5} />
        </div>
      </div>

      <div>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#1a1a2e] mb-2">404</h1>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-4">
          Oops! The plate is empty.
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-8">
          We can't seem to find the page you're looking for. It might have been moved or removed from our menu.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
        <button
          onClick={() => navigate(-1)}
          className="btn-outline-amber w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
        <button
          onClick={() => navigate("/menu-items")}
          className="btn-primary w-full sm:w-auto justify-center"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
};

export default NotFound;