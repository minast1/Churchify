import React from "react";
import { Outlet } from "remix";
import MembersDashboardLayout from "~/src/members/MembersLayout";

const MembersLayoutRout = () => {
  return (
    <MembersDashboardLayout>
      <Outlet />
    </MembersDashboardLayout>
  );
};

export default MembersLayoutRout;
