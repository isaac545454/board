import Image from "next/image";
import Link from "next/link";
import SigninButton from "../SigninButton";

export default function Header() {
  return (
    <header className="h-24 bg-[#141a29]">
      <div className="max-w-[1120px] h-24 mx-auto flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo meu board"
            className="cursor-pointer max-[480px]:w-14"
            width={80}
            height={90}
          />
        </Link>
        <nav className="ml-20 h-20">
          <Link
            href="/"
            className="inline-block relative px-2 h-20 leading-[5rem] text-white"
          >
            Home
          </Link>
          <Link
            href="/board"
            className="inline-block relative px-2 h-20 leading-[5rem] text-white ml-7"
          >
            Meu Board
          </Link>
        </nav>
        <SigninButton />
      </div>
    </header>
  );
}
