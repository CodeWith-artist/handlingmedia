import Image from "next/image";
import Link from "next/link";

export const Logo = ({ src }: { src: string }) => (
  <Link
    href="/"
    className="relative mr-8 flex h-10 w-40 items-center"
  >
    <Image
      src={src}
      alt="handlingmedia "
      fill
      className="object-contain object-left"
      priority
    />
  </Link>
);