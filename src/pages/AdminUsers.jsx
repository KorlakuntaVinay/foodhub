import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">Access Denied</p>;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://food-backend-wb32.onrender.com/api/auth",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      {users.map((u) => (
        <div
          key={u.id}
          className="flex justify-between border p-3 rounded mb-2"
        >
          <span>{u.name}</span>
          <span className="text-gray-500">{u.email}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
