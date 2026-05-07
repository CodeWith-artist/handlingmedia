import Image from "next/image";
import Link from "next/link";

export const Logo = ({ src }: { src: string }) => (
  <Link href="/" className="flex items-center gap-2 mr-8">
    <Image src={src} alt="Vercel Logo" width={32} height={32} />
    <span className="text-white font-semibold text-lg font-(family-name:--font-satoshi)">
      handlingmedia
    </span>
  </Link>
);