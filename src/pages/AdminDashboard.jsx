import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/actions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Select only what we need
  const users = useSelector((state) => state.users || []);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Users</h2>
      {users?.length > 0 ? (
        users.map((u) => (
          <div
            key={u._id}
            style={{ borderBottom: "1px solid #ddd", marginBottom: "10px" }}
          >
            <p>
              <b>Name:</b> {u.name}
            </p>
            <p>
              <b>Email:</b> {u.email}
            </p>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default AdminDashboard;
