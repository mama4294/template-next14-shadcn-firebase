import React from "react";
import InviteUser from "./InviteUser";

function AdminControls({ groupId }: { groupId: string }) {
  return (
    <div className="flex justify-end space-x-2 m-5 mb-0">
      <InviteUser groupId={groupId} />
    </div>
  );
}

export default AdminControls;
