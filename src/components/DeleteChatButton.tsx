"use client";

import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAdminId from "@/hooks/useAdminId";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

function DeleteChatButton({ groupId }: { groupId: string }) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const adminId = useAdminId({ groupId });

  const handleDelete = async () => {
    toast({
      title: "Deleting Chat",
      description: "Please what while we delete the chat...",
    });

    await fetch("/api/group/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId: groupId }),
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response from server");
        }
        toast({
          title: "Success",
          description: "Your group has been deleted",
          className: "bg-green-600 text-white",
          duration: 3000,
        });
        router.replace("/group");
      })
      .catch((err) => {
        console.error(err.message);
        toast({
          title: "Error",
          description: "There was an error deleting your group",
          variant: "destructive",
        });
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    session?.user.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Delete Group</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the group for all users
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
}

export default DeleteChatButton;
