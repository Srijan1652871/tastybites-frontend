import { UtensilsCrossed } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          Good food, made simple
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Browse our menu and find something you'll love.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <UtensilsCrossed size={96} strokeWidth={1.3} className="text-orange-500" />
        <span className="text-4xl font-semibold text-gray-900">
          <span className="text-orange-500">TastyBites</span>
        </span>
      </div>
    </div>
  );
};

export default Home;