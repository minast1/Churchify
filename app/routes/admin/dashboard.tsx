import React from "react";
import { ActionFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import { authenticator } from "~/lib/auth.server";
import AdminDashboardLayout from "~/src/components/admin/AdminLayout";

const DashboardLayout = () => {
  const parentData = useLoaderData();

  return (
    <AdminDashboardLayout>
      <Outlet context={parentData} />
    </AdminDashboardLayout>
  );
};

export default DashboardLayout;

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
};

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.logout(request, { redirectTo: "/admin/?index" });
};
