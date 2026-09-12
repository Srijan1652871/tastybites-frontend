import {
  Award,
  ChefHat,
  Heart,
  Leaf,
  Star,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const FadeInUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const chefs = [
  { name: "Chef Arjun Kapoor", title: "Head Chef & Co-Founder", specialty: "North Indian Cuisine", years: "12 Years Experience", initial: "A", gradient: "from-amber-400 to-orange-500" },
  { name: "Chef Meera Iyer", title: "Executive Pastry Chef", specialty: "Desserts & Confectionery", years: "9 Years Experience", initial: "M", gradient: "from-rose-400 to-pink-500" },
  { name: "Chef Rohan Das", title: "Senior Sous Chef", specialty: "Continental & Asian Fusion", years: "7 Years Experience", initial: "R", gradient: "from-blue-400 to-indigo-500" },
];

const milestones = [
  { year: "2018", title: "The Beginning", desc: "TastyBites opens its doors in Park Street with a 30-seat dining room and a menu of 40 dishes." },
  { year: "2019", title: "First Award", desc: "Named 'Best New Restaurant' by Kolkata Food & Travel Magazine. Expanded seating to 80 guests." },
  { year: "2021", title: "Pandemic Pivot", desc: "Launched home delivery and meal kits to stay connected with our community during difficult times." },
  { year: "2022", title: "Chef's Table Launch", desc: "Introduced the Chef's Table experience — a 7-course tasting menu with wine pairing." },
  { year: "2023", title: "Second Location", desc: "Opened our second outlet in Salt Lake with a dedicated private dining room for events." },
  { year: "2024", title: "Best Restaurant Award", desc: "Awarded 'Best Fine Dining Restaurant' by Kolkata Culinary Awards — our proudest milestone yet." },
];

const values = [
  { icon: <Leaf size={20} />, title: "Sustainability", desc: "We minimise waste, source locally and support farmers who practise responsible agriculture.", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: <Heart size={20} />, title: "Hospitality", desc: "Every guest is family. We train our team to provide warmth-first, service-second experiences.", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: <ChefHat size={20} />, title: "Craft", desc: "Our chefs never stop learning. We encourage innovation while respecting culinary traditions.", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: <Users size={20} />, title: "Community", desc: "We partner with local charities, schools and events to give back to the city we love.", color: "text-blue-500", bg: "bg-blue-50" },
];

const About = () => (
  <div className="overflow-x-hidden">
    {/* Hero */}
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/2.jpg')" }} />
      <div className="absolute inset-0 bg-[#1a1a2e]/80" />
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        <p className="section-label justify-center text-amber-400 mb-3">
          <Sparkles size={13} /> Our Story
        </p>
        <h1 className="section-title-light mb-4">
          About <span className="text-amber-400 italic">TastyBites</span>
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          More than a restaurant — a culinary journey shaped by passion, tradition and an unwavering love for extraordinary food.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeInUp>
            <p className="section-label"><Sparkles size={13} /> Our Mission</p>
            <h2 className="section-title mb-5">
              Food That Brings <span className="text-amber-500 italic">People Together</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At TastyBites, we believe the table is where memories are made. Our mission is simple: to serve food so good that it becomes the backdrop for life's best moments — celebrations, reunions, dates and quiet dinners alike.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We achieve this by pairing the finest seasonal ingredients with techniques honed over decades — and by never compromising on the love we put into every single dish.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[["500+", "Happy Guests/Month"], ["8", "Culinary Awards"], ["120+", "Menu Items"], ["15+", "Expert Chefs"]].map(([n, l]) => (
                <div key={l} className="bg-[#fefce8] rounded-xl p-4">
                  <p className="font-serif text-2xl font-bold text-amber-500">{n}</p>
                  <p className="text-sm text-gray-600 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </FadeInUp>
          <FadeInUp delay={150}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-square">
                <img src="/3.webp" alt="Restaurant interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-4 bg-amber-400 rounded-2xl p-5 shadow-xl">
                <Award size={28} className="text-[#1a1a2e] mb-1" />
                <p className="font-bold text-[#1a1a2e] font-serif text-sm leading-tight">Best Restaurant<br />Kolkata 2024</p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>

    {/* Our Values */}
    <section className="py-20 bg-[#fefce8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeInUp className="text-center mb-12">
          <p className="section-label justify-center"><Heart size={13} /> What We Stand For</p>
          <h2 className="section-title">Our <span className="text-amber-500 italic">Core Values</span></h2>
        </FadeInUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <FadeInUp key={i} delay={i * 70}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className={`w-12 h-12 rounded-xl ${v.bg} ${v.color} flex items-center justify-center mx-auto mb-4`}>{v.icon}</div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* Our Journey / Timeline */}
    <section className="py-20 bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeInUp className="text-center mb-14">
          <p className="section-label justify-center text-amber-400"><Award size={13} /> Our Journey</p>
          <h2 className="section-title-light">Six Years of <span className="text-amber-400 italic">Excellence</span></h2>
        </FadeInUp>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <FadeInUp key={i} delay={i * 80}>
                <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className="sm:flex-1 sm:text-right hidden sm:block">
                    {i % 2 !== 0 && (
                      <div>
                        <span className="inline-block text-amber-400 font-bold text-xl font-serif">{m.year}</span>
                        <h3 className="text-white font-semibold mt-1">{m.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    )}
                  </div>
                  {/* Dot */}
                  <div className="shrink-0 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center z-10 relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a2e]" />
                  </div>
                  <div className="sm:flex-1">
                    <div className="sm:hidden">
                      <span className="text-amber-400 font-bold text-xl font-serif">{m.year}</span>
                    </div>
                    {i % 2 === 0 && (
                      <div className="hidden sm:block">
                        <span className="inline-block text-amber-400 font-bold text-xl font-serif">{m.year}</span>
                        <h3 className="text-white font-semibold mt-1">{m.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    )}
                    <div className="sm:hidden">
                      <h3 className="text-white font-semibold mt-1">{m.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Meet the Chefs */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeInUp className="text-center mb-12">
          <p className="section-label justify-center"><ChefHat size={13} /> The Talent</p>
          <h2 className="section-title">Meet Our <span className="text-amber-500 italic">Chefs</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">The brilliant minds and skilled hands behind every dish that leaves our kitchen.</p>
        </FadeInUp>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {chefs.map((chef, i) => (
            <FadeInUp key={i} delay={i * 80}>
              <div className="card text-center p-8">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${chef.gradient} flex items-center justify-center text-4xl font-bold text-white mx-auto mb-5 font-serif`}>
                  {chef.initial}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a2e]">{chef.name}</h3>
                <p className="text-amber-500 text-sm font-medium mt-1">{chef.title}</p>
                <div className="h-px bg-gray-100 my-4" />
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{chef.specialty}</p>
                <p className="text-xs text-gray-400 mt-1">{chef.years}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-gradient-to-r from-amber-400 to-amber-500">
      <div className="max-w-2xl mx-auto px-5 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#1a1a2e] mb-4">
          Come Experience It Yourself
        </h2>
        <p className="text-[#1a1a2e]/70 mb-7">Reserve a table and let our story become yours.</p>
        <NavLink to="/reservations" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a2e] text-white font-semibold rounded-full hover:bg-[#16213e] transition-colors">
          Book a Table <ArrowRight size={16} />
        </NavLink>
      </div>
    </section>
  </div>
);

export default About;
