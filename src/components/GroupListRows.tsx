"use client";

import { GroupMembers, groupMemberCollectionRef } from "@/lib/GroupMembers";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CreateGroupButton from "./CreateGroupButton";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { Skeleton } from "./ui/skeleton";

function GroupListRows({ initialGroups }: { initialGroups: GroupMembers[] }) {
  const { data: session } = useSession();

  const [members, loading, error] = useCollectionData<GroupMembers>(
    session && groupMemberCollectionRef(session.user.id!),
    {
      initialValue: initialGroups,
    }
  );

  if (members?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-40 space-y-2">
        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">Create your first group!</h2>
        <CreateGroupButton />
      </div>
    );
  }

  return (
    <div>
      {members?.map((member, i) => (
        <ChatListRow key={member.groupId} groupId={member.groupId} />
      ))}
    </div>
  );
}

function ChatListRow({ groupId }: { groupId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  //   function prettyUUID(n = 4) {
  //     return groupId.substring(0, 4);
  //   }

  if (!session) {
    return (
      <div className="flex p-5 items-center space-x-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-input"
      onClick={() => router.push(`/group/${groupId}`)}
    >
      <UserAvatar
        name={session?.user.name || ""}
        image={session?.user.image || ""}
      />

      <div className="flex-1">
        <p className="font-bold">{groupId}</p>
      </div>
    </div>
  );
}

export default GroupListRows;
