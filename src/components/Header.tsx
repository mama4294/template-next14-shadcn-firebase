import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";

async function Header() {
  const session = await getServerSession(authOptions);
  console.log("authOptions", authOptions);
  console.log(session);

  return (
    <div className="sticky top-0 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session ? (
            <Link href={"/chat"} prefetch={false}>
              <MessagesSquareIcon className="text-black dark:text-white" />
            </Link>
          ) : (
            <Link href={"/pricing"} prefetch={false}>
              Pricing
            </Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
