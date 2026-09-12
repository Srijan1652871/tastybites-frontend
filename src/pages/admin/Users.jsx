import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Trash2, Search, AlertTriangle, ShieldCheck, User, Loader2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/admin`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response?.data?.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/users/admin/${userToDelete._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
        setDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1a1a2e]">Users & Roles</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all registered accounts (admins and customers).</p>
      </div>

      {/* Filters/Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username or email..."
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
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
              <User size={32} />
            </div>
            <p className="text-[#1a1a2e] font-medium mb-1">No users found</p>
            <p className="text-sm text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="group">
                    {/* User */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                          user.role === "admin" 
                            ? "bg-amber-100 text-amber-600" 
                            : "bg-blue-50 text-blue-600"
                        }`}>
                          {user.username[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-[#1a1a2e]">{user.username}</span>
                      </div>
                    </td>
                    
                    {/* Email */}
                    <td>
                      <span className="text-gray-600">{user.email}</span>
                    </td>

                    {/* Role */}
                    <td>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}>
                        {user.role === "admin" ? <ShieldCheck size={12} /> : <User size={12} />}
                        <span className="capitalize">{user.role}</span>
                      </span>
                    </td>

                    {/* Joined */}
                    <td>
                      <span className="text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric"
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => confirmDelete(user)}
                          disabled={user.role === "admin"} // Prevent deleting admins for now
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            user.role === "admin"
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                          }`}
                          title={user.role === "admin" ? "Cannot delete admin" : "Delete User"}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm" onClick={() => !isDeleting && setDeleteModalOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative z-10 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1a2e] mb-2">Delete User?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-[#1a1a2e]">@{userToDelete?.username}</span>? This will permanently remove their account and all associated data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;