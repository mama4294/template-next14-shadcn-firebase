"use client";

import { Dispatch, SetStateAction } from "react";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import { Label } from "./ui/label";

function ShareLink({
  isOpen,
  groupId,
  setIsOpen,
}: {
  isOpen: boolean;
  groupId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const host = window.location.host;

  const linkToGroup =
    process.env.NODE_ENV === "development"
      ? `http://${host}/group/${groupId}`
      : `https://${host}/group/${groupId}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(linkToGroup);
      toast({
        title: "Copied successfully",
        description:
          "Share this with the user you want to add to the group. Note: They must be already added to the group to access it",
        className: "bg-green-600 text-white",
      });
    } catch {
      () => {
        console.error("Failed to copy text.");
      };
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={isOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Copy className="mr-2" />
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Any user who as been{" "}
            <span className="font-bold text-indigo-600">grated access</span>
            can use this link.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={linkToGroup} readOnly />
          </div>
          <Button
            type="submit"
            onClick={() => copyToClipboard()}
            size={"sm"}
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareLink;
