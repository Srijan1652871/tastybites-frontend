import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UtensilsCrossed, Soup, CakeSlice, Coffee, Search, Flame, SlidersHorizontal } from "lucide-react";
import MenuItemCard from "../components/MenuItemCard";

const categoryConfig = [
  { label: "All", icon: <UtensilsCrossed size={15} /> },
  { label: "Starter", icon: <Soup size={15} /> },
  { label: "Main Course", icon: <UtensilsCrossed size={15} /> },
  { label: "Dessert", icon: <CakeSlice size={15} /> },
  { label: "Beverage", icon: <Coffee size={15} /> },
  { label: "Chef's Special", icon: <Flame size={15} /> },
];

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/menu-items`);
        const allItems = response?.data?.data || [];
        setMenuItems(allItems);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, [token]);

  const filteredItems = menuItems
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      search.trim() === ""
        ? true
        : item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="overflow-x-hidden">
      {/* Banner */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/2.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#1a1a2e]/80" />
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <p className="section-label justify-center text-amber-400 mb-3">
            <UtensilsCrossed size={13} /> What We Serve
          </p>
          <h1 className="section-title-light mb-4">
            Our <span className="text-amber-400 italic">Menu</span>
          </h1>
          <p className="text-gray-300 text-lg">
            From starters to desserts — every dish is crafted with love, fresh ingredients and years of culinary expertise.
          </p>
          {!token && (
            <p className="mt-4 text-amber-300/80 text-sm">
              🔒 Login to browse the full menu and view detailed item information.
            </p>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-9 !py-2 !text-sm"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categoryConfig.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === cat.label
                      ? "bg-amber-400 border-amber-400 text-[#1a1a2e]"
                      : "bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-600"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-[#fefce8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Result count */}
          {!isLoading && (
            <p className="text-sm text-gray-500 mb-6">
              Showing{" "}
              <span className="font-semibold text-[#1a1a2e]">{filteredItems.length}</span>{" "}
              {filteredItems.length === 1 ? "item" : "items"}
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              {search && ` for "${search}"`}
            </p>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="aspect-[4/3] skeleton" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 skeleton w-3/4" />
                    <div className="h-3 skeleton w-1/2" />
                    <div className="h-9 skeleton" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-5">
                <UtensilsCrossed size={32} className="text-amber-400" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1a1a2e] mb-2">
                No items found
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                {search
                  ? `No menu items match "${search}". Try a different search.`
                  : `No items in "${selectedCategory}" right now. Check back soon!`}
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="mt-5 btn-outline-amber !text-sm !px-5 !py-2"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <MenuItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenuItems;