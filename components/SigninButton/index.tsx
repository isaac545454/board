import React from "react";
import { FaGithub } from "react-icons/Fa";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

interface UserSchema {
  User: {
    email: string;
    image: string;
    name: string;
  };
}

export default function SigninButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      className="ml-auto flex text-white items-center max-[480px]:flex-col max-[480px]"
      onClick={() => signOut()}
    >
      {session.user.image && (
        <Image
          src={String(session.user.image)}
          alt="steve jobs"
          width="40"
          height="40"
          className="rounded-[50%] mr-4 max-[480px]:mr-1"
        />
      )}
      ola {session.user.name}
      <FiX color="#737380" className="mr-4 max-[480px]:mr-1 " />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => {
        signIn("github");
      }}
      className="ml-auto h-10 rounded-[3rem] bg-transparent flex justify-center items-center max-[480px]:flex-col text-white px-6 font-bold"
    >
      <FaGithub color="#ffb800" size={25} className="mr-4" />
      Entrar com github
    </button>
  );
}
