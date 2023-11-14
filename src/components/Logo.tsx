import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

function Logo() {
  return (
    <Link
      href="/"
      prefetch={false}
      className="overflow-hidden hidden sm:flex items-center h-10 w-24"
    >
      <Button variant={"outline"}>
        <Image
          priority
          src="/next.svg"
          alt="logo"
          width={100}
          height={100}
          className="dark:filter dark:invert"
        />
      </Button>
    </Link>
  );
}

export default Logo;
