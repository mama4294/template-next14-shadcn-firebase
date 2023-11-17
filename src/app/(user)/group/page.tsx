import CreateGroupButton from "@/components/CreateGroupButton";
import GroupList from "@/components/GroupList";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

function GroupsPage({ searchParams: { error } }: Props) {
  return (
    <div className="">
      <h1>Groups</h1>
      <CreateGroupButton />
      {/* Admin controls */}
      {/* Group members */}
      <GroupList />
      {/* Recipes */}
    </div>
  );
}

export default GroupsPage;
