import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const infoCards = [
  {
    icon: <MapPin size={22} />,
    title: "Visit Us",
    lines: ["42, Park Street", "Kolkata – 700 016", "West Bengal, India"],
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: <Phone size={22} />,
    title: "Call Us",
    lines: ["+91 98300 00000", "+91 98300 00001", "Mon–Sun: 10 AM – 10 PM"],
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: <Mail size={22} />,
    title: "Email Us",
    lines: ["hello@tastybites.in", "reservations@tastybites.in", "We reply within 24 hours"],
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: <Clock size={22} />,
    title: "Open Hours",
    lines: ["Mon–Fri: 11 AM – 10 PM", "Sat–Sun: 10 AM – 11 PM", "Holidays: 12 PM – 9 PM"],
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const subjects = [
  "General Enquiry",
  "Reservation Query",
  "Feedback",
  "Event / Private Dining",
  "Career",
  "Media & Press",
  "Other",
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.subject) errs.subject = "Please select a subject";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 15) errs.message = "Message too short";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/contact`, form);
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-[#1a1a2e]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <p className="section-label justify-center text-amber-400 mb-3">
            <MessageSquare size={13} /> We're Here
          </p>
          <h1 className="section-title-light mb-4">
            Get in <span className="text-amber-400 italic">Touch</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Questions, feedback, event enquiries — we'd love to hear from you. Our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infoCards.map((card, i) => (
              <div key={i} className="card p-6 text-center">
                <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mx-auto mb-4`}>
                  {card.icon}
                </div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{card.title}</h3>
                {card.lines.map((line, j) => (
                  <p key={j} className={`text-sm ${j === 2 ? "text-gray-400" : "text-gray-600"}`}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 bg-[#fefce8]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-1">Send a Message</h2>
              <p className="text-gray-400 text-sm mb-7">Use the form below — we promise to reply promptly.</p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1a1a2e] mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Thanks <strong>{form.name}</strong>! We'll reply to <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:"",email:"",subject:"",message:"" }); }}
                    className="btn-outline-amber"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="form-input" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-input" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="form-input appearance-none">
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Write your message here..."
                      className="form-input resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                    {loading ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : <><Send size={17} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Map placeholder */}
            <div className="flex flex-col gap-5">
              {/* Placeholder map */}
              <div className="rounded-3xl overflow-hidden flex-1 min-h-[300px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative z-10 text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center mx-auto mb-3">
                    <MapPin size={22} className="text-[#1a1a2e]" />
                  </div>
                  <p className="text-white font-semibold font-serif text-lg">TastyBites</p>
                  <p className="text-gray-400 text-sm mt-1">42, Park Street</p>
                  <p className="text-gray-400 text-sm">Kolkata – 700 016</p>
                  <a
                    href="https://maps.google.com/?q=Park+Street,+Kolkata"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 text-xs text-amber-400 hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-[#1a1a2e] mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  Follow Us
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Stay updated with our latest dishes, events and exclusive offers on social media.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[["Instagram", "@tastybites.in"], ["Facebook", "TastyBites"], ["Twitter", "@tastybites"]].map(([platform, handle]) => (
                    <a
                      key={platform}
                      href="#"
                      className="px-4 py-2 rounded-full bg-[#fefce8] border border-amber-200 text-sm text-gray-700 hover:bg-amber-400 hover:text-[#1a1a2e] hover:border-amber-400 transition-colors font-medium"
                    >
                      {platform} · {handle}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
