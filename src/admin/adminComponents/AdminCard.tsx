import React from "react";

const AdminCard = () => {
  return (
    <div className="relative w-52 h-64 text-white cursor-pointer group">
      {/* Glow Layer */}

      {/* Card Content */}
      <div className="relative z-10 h-full w-full bg-white rounded-2xl p-4 shadow-md flex flex-col justify-end">
        <h3 className="text-lg font-bold">Orders</h3>
        <p className="text-sm">Check new orders here</p>
      </div>
    </div>
  );
};

export default AdminCard;
