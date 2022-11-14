import React from "react";
import { FaGithub } from "react-icons/Fa";
import { FiX } from "react-icons/fi";
import Image from "next/image";

export default function SigninButton() {
  const session = false;
  return session === false ? (
    <button
      type="button"
      onClick={() => {}}
      className="ml-auto h-10 rounded-[3rem] bg-transparent flex justify-center items-center text-white px-6 font-bold"
    >
      <FaGithub color="#ffb800" size={25} className="mr-4" />
      Entrar com github
    </button>
  ) : (
    <button className="ml-auto flex text-white">
      <Image
        src="https://sujeitoprogramador.com/wp-content/uploads/2022/08/home.png"
        alt="steve jobs"
        width="30"
        height="50"
        className="rounded-[50%] mr-4"
      />
      ola isaac
      <FiX color="#737380" className="ml-4" />
    </button>
  );
}
