import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import {
  UtensilsCrossed,
  Soup,
  CakeSlice,
  Coffee,
  Sparkles,
  ChefHat,
  Star,
  Award,
  Users,
  Clock,
  ArrowRight,
  ArrowDown,
  Heart,
  Leaf,
  Flame,
  CalendarCheck,
  ThumbsUp,
  Zap,
} from "lucide-react";

/* ─── Animated counter ─────────────────────────────────── */
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* ─── Fade-in-up on scroll ─────────────────────────────── */
const FadeInUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Review Card ───────────────────────────────────────── */
const reviews = [
  {
    name: "Priya Sharma",
    initial: "P",
    rating: 5,
    date: "August 2026",
    color: "from-pink-500 to-rose-500",
    text: "Absolutely incredible dining experience! The Butter Chicken was the best I've ever had. Cozy ambience, warm service — we'll be back every month!",
  },
  {
    name: "Rahul Mehta",
    initial: "R",
    rating: 5,
    date: "July 2026",
    color: "from-blue-500 to-indigo-500",
    text: "The chef's tasting menu blew my mind. Every course was a masterpiece. TastyBites has raised the bar for fine dining in the city.",
  },
  {
    name: "Ananya Krishnan",
    initial: "A",
    rating: 5,
    date: "July 2026",
    color: "from-emerald-500 to-teal-500",
    text: "Celebrated our anniversary here and the team went above and beyond. The dessert platter was divine. 10/10 would recommend to everyone!",
  },
  {
    name: "Vikram Singh",
    initial: "V",
    rating: 4,
    date: "June 2026",
    color: "from-amber-500 to-orange-500",
    text: "Great food, beautiful presentation and attentive staff. The lamb chops are a must-try. Slightly long wait on weekends but totally worth it.",
  },
  {
    name: "Divya Nair",
    initial: "D",
    rating: 5,
    date: "June 2026",
    color: "from-purple-500 to-violet-500",
    text: "A hidden gem! The fusion menu is creative without being gimmicky. The mango dessert had me dreaming about it for days.",
  },
];

/* ─── Why Choose Us items ───────────────────────────────── */
const whyUs = [
  {
    icon: <Leaf size={22} />,
    title: "Farm-Fresh Ingredients",
    desc: "We source 90% of our produce locally, ensuring every dish is bursting with natural freshness.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: <ChefHat size={22} />,
    title: "Master Chefs",
    desc: "Our team of 15+ award-winning chefs brings decades of culinary expertise to your plate.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: <Heart size={22} />,
    title: "Cozy Ambience",
    desc: "Warm lighting, curated music, and elegant interiors create the perfect dining atmosphere.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: <CalendarCheck size={22} />,
    title: "Easy Reservations",
    desc: "Book a table in seconds online — no more waiting. We honour every booking, every time.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: <Zap size={22} />,
    title: "Fast Service",
    desc: "Efficient kitchen-to-table timings without compromising on the quality of every dish.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: <ThumbsUp size={22} />,
    title: "Loyalty Rewards",
    desc: "Earn points with every visit. Regular guests enjoy exclusive offers, early access and more.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

/* ─── Category cards ────────────────────────────────────── */
const categories = [
  {
    icon: <Soup size={28} />,
    label: "Starters",
    count: "12+ dishes",
    gradient: "from-orange-400 to-amber-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    icon: <UtensilsCrossed size={28} />,
    label: "Main Course",
    count: "24+ dishes",
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
  {
    icon: <CakeSlice size={28} />,
    label: "Desserts",
    count: "14+ dishes",
    gradient: "from-purple-400 to-violet-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    icon: <Coffee size={28} />,
    label: "Beverages",
    count: "18+ options",
    gradient: "from-blue-400 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    icon: <Flame size={28} />,
    label: "Chef's Special",
    count: "Seasonal",
    gradient: "from-amber-400 to-yellow-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
];

/* ─── Featured dish placeholders ────────────────────────── */
const featuredDishes = [
  {
    img: "/1.jpg",
    name: "Royal Butter Chicken",
    category: "Main Course",
    price: "₹420",
    badge: "Chef's Pick",
    badgeColor: "bg-amber-400 text-[#1a1a2e]",
  },
  {
    img: "/2.jpg",
    name: "Signature Prawn Tempura",
    category: "Starter",
    price: "₹380",
    badge: "Best Seller",
    badgeColor: "bg-rose-500 text-white",
  },
  {
    img: "/3.webp",
    name: "Mango Cardamom Panna Cotta",
    category: "Dessert",
    price: "₹220",
    badge: "New",
    badgeColor: "bg-emerald-500 text-white",
  },
];

/* ══════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════ */
const Home = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      {/* ── SECTION 1: CINEMATIC HERO ──────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/85 via-[#1a1a2e]/70 to-[#1a1a2e]/95" />

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto animate-fade-in">
          {/* Award pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-sm font-medium mb-6">
            <Award size={15} className="shrink-0" />
            Awarded Best Restaurant, Kolkata 2024 &nbsp;·&nbsp; Est. 2018
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            Where Every Bite{" "}
            <span className="text-amber-400 italic">Tells a Story</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Experience the finest blend of traditional flavours and modern
            culinary artistry. A dining journey crafted for the discerning
            palate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/reservations" className="btn-primary">
              <CalendarCheck size={17} />
              Reserve a Table
            </NavLink>
            <NavLink to="/menu-items" className="btn-outline">
              Explore Menu
              <ArrowRight size={17} />
            </NavLink>
          </div>

          {/* Ratings row */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-white/80">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9 / 5 rating</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="text-white/60 text-sm">500+ Happy Guests Monthly</span>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <span className="text-white/60 text-sm">120+ Menu Items</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ArrowDown size={22} />
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ───────────────────────────── */}
      <section className="bg-[#1a1a2e] py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <UtensilsCrossed size={22} />, end: 120, suffix: "+", label: "Menu Items" },
              { icon: <Star size={22} />, end: 49, suffix: "/50", label: "Avg. Rating" },
              { icon: <ChefHat size={22} />, end: 15, suffix: "+", label: "Expert Chefs" },
              { icon: <Award size={22} />, end: 8, suffix: "", label: "Awards Won" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-amber-400">{stat.icon}</div>
                <p className="text-3xl font-bold text-white font-serif">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ABOUT SNIPPET ───────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <FadeInUp>
              <div className="relative grid grid-cols-2 gap-3 h-[420px]">
                <div className="col-span-1 rounded-2xl overflow-hidden">
                  <img src="/2.jpg" alt="Food" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                  <div className="rounded-2xl overflow-hidden flex-1">
                    <img src="/3.webp" alt="Food" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden flex-1">
                    <img src="/1.jpg" alt="Food" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Est. badge */}
                <div className="absolute -bottom-5 -left-3 bg-amber-400 rounded-2xl p-4 shadow-xl">
                  <p className="text-[#1a1a2e] font-bold text-xl font-serif leading-none">Est.</p>
                  <p className="text-[#1a1a2e] font-black text-2xl font-serif">2018</p>
                </div>
              </div>
            </FadeInUp>

            {/* Text */}
            <FadeInUp delay={150}>
              <p className="section-label">
                <Sparkles size={13} />
                Our Story
              </p>
              <h2 className="section-title mb-5">
                Crafted With Passion,{" "}
                <span className="text-amber-500 italic">Served With Soul</span>
              </h2>
              <blockquote className="border-l-4 border-amber-400 pl-4 italic text-gray-600 text-lg leading-relaxed mb-6">
                "We believe good food is the foundation of genuine happiness."
              </blockquote>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2018, TastyBites was born from a simple dream —
                to bring people together through the magic of extraordinary food.
                What started as a small family kitchen has grown into one of
                Kolkata's most beloved dining destinations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our chefs travel across India and the world to gather flavours,
                techniques and inspiration — bringing them back to your plate
                in a way that's both authentic and surprising.
              </p>
              <NavLink to="/about" className="btn-outline-amber inline-flex">
                Our Full Story
                <ArrowRight size={16} />
              </NavLink>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FEATURED DISHES ─────────────────────── */}
      <section className="py-20 bg-[#fefce8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeInUp className="text-center mb-12">
            <p className="section-label justify-center">
              <Sparkles size={13} />
              From Our Kitchen
            </p>
            <h2 className="section-title">
              Featured <span className="text-amber-500 italic">Dishes</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Handpicked by our Head Chef — the dishes our guests keep coming back for.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredDishes.map((dish, i) => (
              <FadeInUp key={i} delay={i * 100}>
                <div className="group card overflow-hidden cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Badge */}
                    <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${dish.badgeColor} shadow`}>
                      {dish.badge}
                    </span>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#1a1a2e]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <NavLink
                        to="/menu-items"
                        className="bg-amber-400 text-[#1a1a2e] font-semibold text-sm px-5 py-2 rounded-full hover:bg-amber-300 transition-colors"
                      >
                        View Details
                      </NavLink>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                      {dish.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[#1a1a2e] mt-1 mb-2">
                      {dish.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-500 font-bold text-lg">
                        {dish.price}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>

          <div className="text-center mt-10">
            <NavLink to="/menu-items" className="btn-primary inline-flex">
              View Full Menu
              <ArrowRight size={17} />
            </NavLink>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CATEGORIES ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeInUp className="text-center mb-12">
            <p className="section-label justify-center">
              <UtensilsCrossed size={13} />
              What We Offer
            </p>
            <h2 className="section-title">
              Explore by <span className="text-amber-500 italic">Category</span>
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <FadeInUp key={i} delay={i * 60}>
                <NavLink
                  to="/menu-items"
                  className={`group flex flex-col items-center gap-3 p-6 rounded-2xl ${cat.bg} border-2 border-transparent hover:border-current hover:shadow-md transition-all duration-300 ${cat.text}`}
                >
                  <div className={`text-current`}>{cat.icon}</div>
                  <h3 className="font-semibold text-sm text-center">{cat.label}</h3>
                  <span className="text-xs opacity-70">{cat.count}</span>
                </NavLink>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY CHOOSE US ───────────────────────── */}
      <section className="py-20 bg-[#fefce8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeInUp className="text-center mb-12">
            <p className="section-label justify-center">
              <Award size={13} />
              Why TastyBites
            </p>
            <h2 className="section-title">
              More Than Just a <span className="text-amber-500 italic">Meal</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We go the extra mile so that every visit feels special — from the first bite to the last.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <FadeInUp key={i} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: REVIEWS ─────────────────────────────── */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeInUp className="text-center mb-12">
            <p className="section-label justify-center text-amber-400">
              <Star size={13} />
              Guest Voices
            </p>
            <h2 className="section-title-light">
              What Our Guests <span className="text-amber-400 italic">Say</span>
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((review, i) => (
              <FadeInUp key={i} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center font-bold text-white`}>
                      {review.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">"{review.text}"</p>
                </div>
              </FadeInUp>
            ))}
          </div>

          {/* More reviews row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            {reviews.slice(3).map((review, i) => (
              <FadeInUp key={i} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center font-bold text-white`}>
                      {review.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">"{review.text}"</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: RESERVATION CTA ─────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-400 to-amber-500">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <FadeInUp>
            <h2
              className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-4"
            >
              Ready for an Unforgettable
              <br />
              <span className="italic">Dining Experience?</span>
            </h2>
            <p className="text-[#1a1a2e]/70 text-lg mb-8 max-w-xl mx-auto">
              Reserve your table today and let us take care of everything. Walk-ins welcome, reservations prioritised.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink
                to="/reservations"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a2e] text-white font-semibold rounded-full hover:bg-[#16213e] transition-colors"
              >
                <CalendarCheck size={18} />
                Book a Table
              </NavLink>
              <NavLink
                to="/menu-items"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#1a1a2e]/30 text-[#1a1a2e] font-semibold rounded-full hover:bg-[#1a1a2e]/10 transition-colors"
              >
                Browse Menu
              </NavLink>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── SECTION: SIGNUP CTA (for guests) ───────────────── */}
      {!token && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-5 text-center">
            <Users size={32} className="text-amber-400 mx-auto mb-3" />
            <h2 className="font-serif text-2xl font-semibold text-[#1a1a2e] mb-2">
              Join Our Community
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Create a free account to browse our full menu, view item details, 
              and unlock member-only perks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <NavLink to="/register" className="btn-primary">
                Create Free Account
              </NavLink>
              <NavLink
                to="/login"
                className="text-sm text-gray-500 hover:text-amber-500 transition-colors font-medium"
              >
                Already have an account? Login →
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;