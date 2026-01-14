import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/actions";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, admin, isAdminLoggedIn } = useSelector(
    (state) => state
  );

  useEffect(() => {
    if (isAdminLoggedIn && admin?.email === "admin@food.com") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, isAdminLoggedIn, admin]);

  if (!isAdminLoggedIn) return <h2>Please login as admin</h2>;
  if (loading) return <h2>Loading users...</h2>;

  return (
    <div>
      <h2>All Users</h2>
      {users.map((user) => (
        <p key={user._id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
};

export default Users;
