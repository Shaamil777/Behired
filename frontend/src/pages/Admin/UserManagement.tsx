import React, { useEffect, useState } from "react";
import { Eye, Ban } from "lucide-react";
import { fetchAllUsers, toggleUserStatus } from "../../services/admin.service";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active"); // Active | Inactive | All
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();

        if (data && data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.warn("Unexpected data structure:", data);
        }
      } catch (err) {
        console.error("Failed to load users:", err);
        toast.error("Failed to fetch users.");
      }
    };
    getUsers();
  }, []);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const isActive = user.isActive !== false;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && isActive) ||
      (statusFilter === "Inactive" && !isActive);

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleView = (user: any) => {
    Swal.fire({
      title: `${user.firstname} ${user.lastname || ""}`,
      html: `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Status:</strong> ${user.isActive ? "Active" : "Inactive"}</p>
        <p><strong>Joined:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#3085d6",
      background: "#1f2937",
      color: "#fff",
    });
  };

  const handleBan = async (user: any) => {
    const action = user.isActive ? "ban" : "unban";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} ${user.firstname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action}`,
      background: "#1f2937",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      toast.promise(toggleUserStatus(user._id), {
        loading: `${action === "ban" ? "Banning" : "Unbanning"} user...`,
        success: (data) => {
          setUsers((prev) =>
            prev.map((u) =>
              u._id === user._id ? { ...u, isActive: !u.isActive } : u
            )
          );

          Swal.fire({
            title: "Success!",
            text:
              data.message ||
              `User ${action === "ban" ? "banned" : "unbanned"} successfully.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            background: "#1f2937",
            color: "#fff",
          });

          return `User ${action === "ban" ? "banned" : "unbanned"} successfully!`;
        },
        error: "Action failed. Please try again.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong while updating user status.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by Name or Email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            Search
          </button>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="All">All</option>
        </select>
      </div>

      {/* User Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Registered On</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => {
              const isUserActive = user.isActive !== false;
              const statusText = isUserActive ? "Active" : "Inactive";
              const statusColor = isUserActive ? "bg-green-500" : "bg-red-500";

              return (
                <tr
                  key={user._id || index}
                  className="border-t border-gray-700 hover:bg-gray-750"
                >
                  <td className="px-6 py-4 text-sm">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 text-sm">
                    {user.firstname
                      ? `${user.firstname} ${user.lastname || ""}`
                      : user.name}
                  </td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                      {statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(user)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button
                        onClick={() => handleBan(user)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Ban size={16} />
                        {isUserActive ? "Ban" : "Unban"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* (Optional) Pagination can go here */}
      </div>
    </div>
  );
};

export default UserManagement;
