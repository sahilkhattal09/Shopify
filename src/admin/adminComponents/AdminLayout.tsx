// src/admin/AdminLayout.tsx
import React from "react";
import AppBar from "./AppBar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AppBar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
