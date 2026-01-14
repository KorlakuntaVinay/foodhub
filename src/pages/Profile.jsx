import React from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Please sign in to view profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] bg-gray-200 rounded-md p-8 text-center shadow">
        <img
          src="/profile_image.png"
          alt="profile"
          className="w-28 h-28 mx-auto rounded-full object-cover mb-3"
        />

        <h2 className="text-lg font-semibold">{user.name}</h2>

        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

        <div className="space-y-4 text-sm text-left">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Username</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded">{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Email</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
