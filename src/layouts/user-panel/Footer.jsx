import { NavLink } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ChefHat } from "lucide-react";

// Inline SVG brand icons (lucide-react does not include brand logos)
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/menu-items", label: "Our Menu" },
    { to: "/about", label: "About Us" },
    { to: "/reservations", label: "Reservations" },
    { to: "/contact", label: "Contact" },
  ];

  const openingHours = [
    { day: "Monday – Friday", hours: "11:00 AM – 10:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 11:00 PM" },
    { day: "Public Holidays", hours: "12:00 PM – 9:00 PM" },
  ];

  const socialLinks = [
    {
      icon: <InstagramIcon size={18} />,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: <FacebookIcon size={18} />,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-400",
    },
    {
      icon: <TwitterIcon size={18} />,
      href: "#",
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      icon: <YoutubeIcon size={18} />,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-400",
    },
  ];

  return (
    <footer className="bg-[#1a1a2e] text-gray-400">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 – Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="TastyBites"
                className="h-10 w-auto object-contain"
                style={{ filter: "brightness(1.15)" }}
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              A celebration of authentic flavours, crafted with passion and
              served with warmth. Every dish tells a story of our love for food.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${s.color} hover:border-current transition-all duration-200`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-amber-400">
                      →
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Opening Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Opening Hours
            </h3>
            <ul className="space-y-3">
              {openingHours.map((item) => (
                <li key={item.day} className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-gray-300">
                    {item.day}
                  </span>
                  <span className="text-sm text-amber-400/80 flex items-center gap-1">
                    <Clock size={12} className="shrink-0" />
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin
                  size={16}
                  className="text-amber-400 shrink-0 mt-0.5"
                />
                <span>42, Park Street, Kolkata – 700 016, West Bengal</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <a
                  href="tel:+919830000000"
                  className="hover:text-amber-400 transition-colors"
                >
                  +91 98300 00000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a
                  href="mailto:hello@tastybites.in"
                  className="hover:text-amber-400 transition-colors"
                >
                  hello@tastybites.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <ChefHat size={16} className="text-amber-400 shrink-0" />
                <span>Est. 2018 · Award Winning Kitchen</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {currentYear} TastyBites. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;