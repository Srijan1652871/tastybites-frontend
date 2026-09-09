import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading stats...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total menu items</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {stats?.totalMenuItems ?? 0}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total users</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {stats?.totalUsers ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;