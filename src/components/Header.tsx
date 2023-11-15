import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";
import Nav from "./Nav";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-0 flex p-3 bg-background justify-between">
      <Logo />
      <Nav />
      <div className="flex items-center justify-end space-x-1">
        {/* {session ? (
          <Link href={"/chat"} prefetch={false}>
            <MessagesSquareIcon className="text-black dark:text-white" />
          </Link>
        ) : (
          <Link href={"/pricing"} prefetch={false}>
            Pricing
          </Link>
        )} */}
        <DarkModeToggle />
        <UserButton session={session} />
      </div>
    </div>
  );
}

export default Header;
