import AdminControls from "@/components/AdminControls";
import GroupMembersBadges from "@/components/GroupMemberBadges";

type Props = {
  params: {
    groupId: string;
  };
};

function GroupPage({ params: { groupId } }: Props) {
  return (
    <div className="">
      {/* Admin controls */}
      <AdminControls groupId={groupId} />
      {/* Group members */}
      <GroupMembersBadges groupId={groupId} />
      {/* Recipes */}
    </div>
  );
}

export default GroupPage;
