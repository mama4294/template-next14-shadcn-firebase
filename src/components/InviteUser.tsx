"use client";

import { useSession } from "next-auth/react";
import * as z from "zod";
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { getUserByEmail } from "@/lib/converters/User";
import { addGroupRef } from "@/lib/converters/GroupMembers";

const formSchema = z.object({
  email: z.string().email("Plese enter a valid email address"),
});

function InviteUser({ groupId }: { groupId: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ groupId });
  const router = useRouter;

  const [open, setOpen] = useState(false);
  const [openInviteLinke, setOpenInviteLinke] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted");

    if (!session?.user.id) return;

    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite...",
    });

    const querySnapshot = await getDocs(getUserByEmail(values.email));

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description: "Resend the invitation once they have signed up",
        variant: "destructive",
      });
      return;
    } else {
      //add invited user to group
      const user = querySnapshot.docs[0].data();

      await setDoc(addGroupRef(groupId, user.id), {
        userId: user.id,
        email: user.email!,
        timestamp: serverTimestamp(),
        groupId: groupId,
        isAdmin: false,
        image: user.image || "",
      })
        .then(() => {
          setOpen(false);
          toast({
            title: "Added to group",
            description: "The user has been added to the group sucessfully",
            className: "bg-green-600 text-white",
          });
          setOpenInviteLinke(true);
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error",
            description: "There was an error",
            variant: "destructive",
          });
          setOpen(false);
        });
    }

    form.reset();
  }

  return (
    adminId == session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add user to group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add user to group</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this
                group{" "}
                <span className="font-bold text-indigo-600">
                  Note: They must be registered
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={"john@doe.com"} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add to Group
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    )
  );
}

export default InviteUser;
