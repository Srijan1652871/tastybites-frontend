import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed,
  Users,
  MessageSquareText,
  CalendarCheck,
  ArrowUpRight,
  ChevronRight,
  Clock,
  PlusCircle,
  Package,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userDetails = Cookies.get("userDetails")
    ? JSON.parse(Cookies.get("userDetails"))
    : null;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dashboard/admin/getStats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response?.data?.data || null);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Menu Items",
      value: stats?.totalMenuItems ?? 0,
      icon: <UtensilsCrossed size={22} />,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      trend: `${stats?.availableMenuItems ?? 0} available`,
    },
    {
      title: "Registered Users",
      value: stats?.totalUsers ?? 0,
      icon: <Users size={22} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      trend: "all time",
    },
    {
      title: "Total Reservations",
      value: stats?.totalReservations ?? 0,
      icon: <CalendarCheck size={22} />,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      trend: `${stats?.pendingReservations ?? 0} pending`,
    },
    {
      title: "Guest Messages",
      value: stats?.totalMessages ?? 0,
      icon: <MessageSquareText size={22} />,
      color: "bg-rose-50 text-rose-600 border-rose-100",
      trend: "contact enquiries",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: <Package size={22} />,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      trend: `${stats?.pendingOrders ?? 0} pending`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">
            Welcome back, {userDetails?.username || "Admin"} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening with your restaurant today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/menu-items/add" className="btn-primary !px-4 !py-2 text-sm shadow-sm">
            <PlusCircle size={16} />
            Add Menu Item
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="h-10 w-10 skeleton rounded-xl mb-4" />
                <div className="h-6 skeleton w-1/2 mb-2" />
                <div className="h-4 skeleton w-1/3" />
              </div>
            ))
          : statCards.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.color} mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#1a1a2e]">
                    {stat.value}
                  </h3>
                  <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    <ArrowUpRight size={12} className="mr-0.5" />
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity (Placeholder) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-bold text-[#1a1a2e]">Recent Reservations</h2>
            <Link to="/admin/reservations" className="text-sm text-amber-500 hover:text-amber-600 font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-gray-400 text-center py-4">Loading...</p>
            ) : stats?.recentReservations?.length > 0 ? (
              stats.recentReservations.map((res, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {res.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1a2e] text-sm">{res.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Users size={12} /> {res.guests} guests · <Clock size={12} className="ml-1" /> {res.time}
                      </p>
                    </div>
                  </div>
                  <span className={res.status === "Confirmed" ? "badge-green" : res.status === "Cancelled" ? "badge-red" : "badge-amber"}>
                    {res.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No reservations yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-serif text-lg font-bold text-[#1a1a2e] mb-6">Quick Links</h2>
          <div className="space-y-3">
            <Link to="/admin/menu-items" className="flex items-center p-3 rounded-xl hover:bg-amber-50 group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mr-3 group-hover:bg-amber-200 transition-colors">
                <UtensilsCrossed size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a2e]">Manage Menu</p>
                <p className="text-xs text-gray-500">Edit prices & availability</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-amber-500" />
            </Link>
            
            <Link to="/admin/users" className="flex items-center p-3 rounded-xl hover:bg-blue-50 group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                <Users size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a2e]">Manage Users</p>
                <p className="text-xs text-gray-500">View roles & accounts</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
            </Link>
            
            <Link to="/admin/orders" className="flex items-center p-3 rounded-xl hover:bg-purple-50 group transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                <Package size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a2e]">Manage Orders</p>
                <p className="text-xs text-gray-500">Update delivery statuses</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-500" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;