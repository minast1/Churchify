import { User } from "@prisma/client";
import React from "react";
import { ActionFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import { authenticator } from "~/lib/auth.server";
import MembersDashboardLayout from "~/src/members/MembersLayout";

const MembersLayoutRout = () => {
  const parentData = useLoaderData<Omit<User, "password">>();

  return (
    <MembersDashboardLayout>
      <Outlet context={parentData} />
    </MembersDashboardLayout>
  );
};

export default MembersLayoutRout;

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
};

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.logout(request, { redirectTo: "/" });
};
