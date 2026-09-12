import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  CalendarCheck,
  Clock,
  Phone,
  MapPin,
  Users,
  ChevronDown,
  Loader2,
  Sparkles,
} from "lucide-react";

const openingHours = [
  { day: "Monday – Friday", hours: "11:00 AM – 10:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 11:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 11:00 PM" },
  { day: "Public Holidays", hours: "12:00 PM – 9:00 PM" },
];

const Reservations = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    requests: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.date) errs.date = "Please select a date";
    else {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errs.date = "Please select a future date";
    }
    if (!form.time) errs.time = "Please select a time";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/reservations`, form);
      setLoading(false);
      setSubmitted(true);
      toast.success("Reservation request submitted! We'll confirm shortly.");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Failed to submit reservation. Please try again.");
    }
  };

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  ];

  const occasions = [
    "Birthday", "Anniversary", "Business Lunch", "Family Gathering",
    "Date Night", "Proposal", "Farewell", "Other",
  ];

  // Today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/3.webp')" }} />
        <div className="absolute inset-0 bg-[#1a1a2e]/80" />
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <p className="section-label justify-center text-amber-400 mb-3">
            <CalendarCheck size={13} /> Reserve Your Spot
          </p>
          <h1 className="section-title-light mb-4">
            Book a <span className="text-amber-400 italic">Table</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Secure your reservation in minutes. We honour every booking with the warmth and care it deserves.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-[#fefce8]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CalendarCheck size={36} className="text-green-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-2">
                    Reservation Requested!
                  </h2>
                  <p className="text-gray-500 mb-2">
                    Thank you, <strong>{form.name}</strong>! We've received your request for{" "}
                    <strong>{form.guests} guests</strong> on{" "}
                    <strong>{new Date(form.date).toDateString()}</strong> at{" "}
                    <strong>{form.time}</strong>.
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    A confirmation will be sent to <strong>{form.email}</strong> shortly. 
                    For urgent enquiries, call us at +91 98300 00000.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:"",email:"",phone:"",date:"",time:"",guests:"2",occasion:"",requests:"" }); }}
                    className="btn-primary"
                  >
                    Make Another Reservation
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-1">
                    Reservation Details
                  </h2>
                  <p className="text-gray-400 text-sm mb-7">
                    Fill in the details below and we'll get back to you within 2 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="form-input"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="form-input"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="form-input"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="form-label">Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          min={today}
                          className="form-input"
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="form-label">Time *</label>
                        <div className="relative">
                          <select
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="form-input appearance-none"
                          >
                            <option value="">Select time</option>
                            {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                      </div>
                      <div>
                        <label className="form-label">
                          <span className="flex items-center gap-1"><Users size={13} /> Number of Guests *</span>
                        </label>
                        <div className="relative">
                          <select
                            name="guests"
                            value={form.guests}
                            onChange={handleChange}
                            className="form-input appearance-none"
                          >
                            {["1","2","3","4","5","6","7","8","10","12+"].map((n) => (
                              <option key={n} value={n}>{n} {n === "1" ? "Guest" : "Guests"}</option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <label className="form-label">Occasion <span className="text-gray-400 font-normal">(optional)</span></label>
                      <div className="relative">
                        <select
                          name="occasion"
                          value={form.occasion}
                          onChange={handleChange}
                          className="form-input appearance-none"
                        >
                          <option value="">Select occasion</option>
                          {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="form-label">Special Requests <span className="text-gray-400 font-normal">(optional)</span></label>
                      <textarea
                        name="requests"
                        value={form.requests}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Dietary requirements, high chair, wheelchair access, birthday cake..."
                        className="form-input resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-3.5"
                    >
                      {loading ? (
                        <><Loader2 className="animate-spin" size={18} /> Processing...</>
                      ) : (
                        <><CalendarCheck size={18} /> Confirm Reservation</>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By booking, you agree to our cancellation policy. Reservations must be cancelled 2 hours in advance.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-5">
              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-amber-500" />
                  Opening Hours
                </h3>
                <ul className="space-y-3">
                  {openingHours.map((h) => (
                    <li key={h.day} className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-gray-700">{h.day}</span>
                      <span className="text-sm text-amber-500">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-[#1a1a2e] mb-4">Contact Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">42, Park Street, Kolkata – 700 016</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-amber-500 shrink-0" />
                    <a href="tel:+919830000000" className="text-gray-600 hover:text-amber-500 transition-colors">+91 98300 00000</a>
                  </li>
                </ul>
              </div>

              {/* Policy */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={14} /> Reservation Policy
                </p>
                <ul className="space-y-1.5 text-xs text-amber-700">
                  <li>• We hold reservations for 15 minutes.</li>
                  <li>• Groups of 10+ require a 50% advance deposit.</li>
                  <li>• For private events, please contact us directly.</li>
                  <li>• Cancellations must be made 2 hours in advance.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
