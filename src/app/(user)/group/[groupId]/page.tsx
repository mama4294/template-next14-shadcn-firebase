import CreateGroupButton from "@/components/CreateGroupButton";
import GroupMembersBadges from "@/components/GroupMemberBadges";

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
      {/* Group members */}
      <GroupMembersBadges groupId={groupId} />
      {/* Recipes */}
    </div>
  );
}

export default GroupPage;
