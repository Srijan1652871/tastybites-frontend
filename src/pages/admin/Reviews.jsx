import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { MessageSquareText, Search, Loader2, Mail, Tag } from "lucide-react";

const AdminReviews = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/contact/admin`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response?.data?.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch messages");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [token]);

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">Guest Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          View all contact form submissions from guests.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 max-w-xs">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center border bg-amber-50 text-amber-600 border-amber-100">
          <MessageSquareText size={18} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Messages</p>
          <p className="font-serif text-2xl font-bold text-[#1a1a2e]">{messages.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-500 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin mb-2" size={24} />
            Loading messages...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
              <MessageSquareText size={32} />
            </div>
            <p className="text-[#1a1a2e] font-medium mb-1">No messages found</p>
            <p className="text-sm text-gray-500">
              {search ? "Try adjusting your search." : "Guest contact messages will appear here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((msg) => (
              <div key={msg._id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: sender info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0 text-sm">
                      {msg.name[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1a1a2e] text-sm">{msg.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail size={11} /> {msg.email}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
                        <Tag size={10} /> {msg.subject}
                      </span>
                    </div>
                  </div>

                  {/* Right: date */}
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Message body */}
                <div className="mt-3 ml-13 pl-13">
                  <p
                    className={`text-sm text-gray-600 mt-2 leading-relaxed ${
                      expanded === msg._id ? "" : "line-clamp-2"
                    }`}
                  >
                    {msg.message}
                  </p>
                  {msg.message.length > 120 && (
                    <button
                      onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
                      className="text-xs text-amber-500 hover:text-amber-600 font-medium mt-1"
                    >
                      {expanded === msg._id ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
