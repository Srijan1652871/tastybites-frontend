import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import {
  UtensilsCrossed,
  Soup,
  CakeSlice,
  Coffee,
  Sparkles,
  LayoutList,
  UserPlus,
} from "lucide-react";

const Home = () => {
  const token = Cookies.get("token");

  return (
    <div className="px-6 py-6">

      <section className="max-w-5xl mx-auto min-h-[45vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            Good food, Made simple
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Browse our menu and find something you'll love.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo.png"
            alt="TastyBites"
            className="w-[500px] h-auto object-contain"
          />
        </div>

        <NavLink
          to="/menu-items"
          className="px-5 py-2.5 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          Browse Menu
        </NavLink>
      </section>

      <section className="max-w-5xl mx-auto py-6">
        <div className="text-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Featured Items
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            A glimpse of what's on the menu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="aspect-video bg-violet-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/1.jpg"
              alt="Featured food"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="aspect-video bg-violet-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/2.jpg"
              alt="Featured food"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="aspect-video bg-violet-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/3.webp"
              alt="Featured food"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-6">
        <div className="text-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <NavLink
            to="/menu-items"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            <Soup size={17} />
            Starter
          </NavLink>

          <NavLink
            to="/menu-items"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            <UtensilsCrossed size={17} />
            Main Course
          </NavLink>

          <NavLink
            to="/menu-items"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            <CakeSlice size={17} />
            Dessert
          </NavLink>

          <NavLink
            to="/menu-items"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            <Coffee size={17} />
            Beverage
          </NavLink>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-6">
        <div className="text-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Why TastyBites
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
            <Sparkles
              size={22}
              className="mx-auto text-violet-600 mb-3"
            />
            <h3 className="text-sm font-medium text-gray-900">
              Fresh menu, always up to date
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              Explore a menu that is simple and easy to browse.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
            <LayoutList
              size={22}
              className="mx-auto text-violet-600 mb-3"
            />
            <h3 className="text-sm font-medium text-gray-900">
              Simple browsing, no clutter
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              Find menu items and their details without unnecessary steps.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
            <UserPlus
              size={22}
              className="mx-auto text-violet-600 mb-3"
            />
            <h3 className="text-sm font-medium text-gray-900">
              Create a free account
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              Sign up to access the complete menu and item details.
            </p>
          </div>
        </div>
      </section>

      {!token && (
        <section className="max-w-5xl mx-auto py-6">
          <div className="bg-violet-50 border border-violet-100 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Want to see the entire menu?
            </h2>

            <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2">
              Guests can preview 3 menu items. Create a free account to browse
              our entire menu and view complete item details.
            </p>

            <NavLink
              to="/register"
              className="inline-block mt-4 px-5 py-2.5 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              Create a free account
            </NavLink>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;