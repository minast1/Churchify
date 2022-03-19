import React from "react";
import { Outlet } from "remix";
import AdminDashboardLayout from "~/src/components/admin/AdminLayout";

const AdminLayoutRout = () => {
  return (
    <AdminDashboardLayout>
      <Outlet />
    </AdminDashboardLayout>
  );
};

export default AdminLayoutRout;
