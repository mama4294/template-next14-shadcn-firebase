import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

function Logo() {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
            priority
            src="/next.svg"
            alt="logo"
            width={100}
            height={100}
            className="dark:filter dark:invert"
          />
        </AspectRatio>
      </div>
    </Link>
  );
}

export default Logo;
