import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  CalendarCheck,
  Search,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Trash2,
} from "lucide-react";

const statusColors = {
  Pending: "badge-amber",
  Confirmed: "badge-green",
  Cancelled: "badge-red",
};

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/reservations/admin`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReservations(response?.data?.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch reservations");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, [token]);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/reservations/admin/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setReservations((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
        toast.success(`Reservation ${status.toLowerCase()} successfully`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this reservation?")) return;
    setDeletingId(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/reservations/admin/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setReservations((prev) => prev.filter((r) => r._id !== id));
        toast.success("Reservation deleted successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete reservation");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = reservations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">Reservations</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage table bookings and update their status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total", value: reservations.length, icon: <CalendarCheck size={18} />, color: "bg-blue-50 text-blue-600 border-blue-100" },
          { label: "Pending", value: reservations.filter((r) => r.status === "Pending").length, icon: <Clock size={18} />, color: "bg-amber-50 text-amber-600 border-amber-100" },
          { label: "Confirmed", value: reservations.filter((r) => r.status === "Confirmed").length, icon: <CheckCircle size={18} />, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
        ].map((card) => (
          <div key={card.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="font-serif text-2xl font-bold text-[#1a1a2e]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-500 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin mb-2" size={24} />
            Loading reservations...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
              <CalendarCheck size={32} />
            </div>
            <p className="text-[#1a1a2e] font-medium mb-1">No reservations found</p>
            <p className="text-sm text-gray-500">
              {search ? "Try adjusting your search." : "Reservation bookings will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Contact</th>
                  <th>Date & Time</th>
                  <th>Guests</th>
                  <th>Occasion</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((res) => (
                  <tr key={res._id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">
                          {res.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[#1a1a2e] text-sm">{res.name}</p>
                          <p className="text-xs text-gray-500">{res.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray-600 text-sm">{res.phone}</span>
                    </td>
                    <td>
                      <p className="text-sm text-[#1a1a2e]">
                        {new Date(res.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-500">{res.time}</p>
                    </td>
                    <td>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Users size={13} /> {res.guests}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-500">{res.occasion || "—"}</span>
                    </td>
                    <td>
                      <span className={statusColors[res.status]}>{res.status}</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        {updatingId === res._id ? (
                          <Loader2 size={16} className="animate-spin text-gray-400" />
                        ) : (
                          <>
                            {res.status !== "Confirmed" && (
                              <button
                                onClick={() => handleStatusUpdate(res._id, "Confirmed")}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Confirm"
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            {res.status !== "Cancelled" && (
                              <button
                                onClick={() => handleStatusUpdate(res._id, "Cancelled")}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                                title="Cancel"
                              >
                                <XCircle size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(res._id)}
                              disabled={deletingId === res._id}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === res._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservations;
