import React from "react";

export const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-semibold text-blue-600">
            Bug Tracker
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.username}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.role === "admin"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-700"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
