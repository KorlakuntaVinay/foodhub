import { useAuth } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">Access Denied</p>;
  }

  return children;
};

export default AdminRoute;
