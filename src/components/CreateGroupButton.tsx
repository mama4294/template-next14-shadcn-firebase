"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { addGroupRef } from "@/lib/converters/GroupMembers";
import LoadingSpinner from "./LoadingSpinner";

function CreateGroupButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createNewGroup = async () => {
    if (!session?.user.id) return; //don't do anything if they aren't logged in
    setLoading(true);
    toast({
      title: "Creating new group...",
      description: "Hold tight while we create your new group",
      duration: 3000,
    });

    const groupId = uuidv4();
    await setDoc(addGroupRef(groupId, session.user.id), {
      userId: session.user.id,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      groupId: groupId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your group has been created",
          duration: 2000,
        });
        router.push(`/group/${groupId}}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button onClick={createNewGroup} variant={"secondary"} disabled={loading}>
      {loading ? <LoadingSpinner /> : "Create Group"}
    </Button>
  );
}

export default CreateGroupButton;
