import CreateGroupButton from "@/components/CreateGroupButton";
import GroupMembersBadges from "@/components/GroupMemberBadges";
import InviteUser from "@/components/InviteUser";

type Props = {
  params: {
    groupId: string;
  };
};

function GroupPage({ params: { groupId } }: Props) {
  console.log("groupId from params ", groupId);

  return (
    <div className="">
      <CreateGroupButton />
      {/* Admin controls */}
      <InviteUser groupId={groupId} />
      {/* Group members */}
      <GroupMembersBadges groupId={groupId} />
      {/* Recipes */}
    </div>
  );
}

export default GroupPage;
