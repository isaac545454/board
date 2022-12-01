import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import firebase from "../services/firebaseConnect";
import { useState } from "react";

interface Props {
  data: string;
}

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
};

export default function Home({ data }: Props) {
  const [donaters, serDonaters] = useState<Data>(JSON.parse(data));
  return (
    <>
      <Head>
        <title>Board - organizando suas tarefas</title>
      </Head>
      <main className="max-w-[1200px] mx-auto px-8 flex items-center justify-center flex-col">
        <Image
          src="/board-user.svg"
          width="500"
          height="500"
          alt="board"
          className="mt-8"
        />
        <section className="max-w-[700px]">
          <h1 className="text-3xl mt-4 font-bold text-center">
            Uma ferramenta para seu dia a dia, Escreva, planeje e organize-se.
          </h1>
          <p className="mt-4 text-2xl text-center">
            <span className="text-[#04dd75] font-bold">100% Gratuita </span>e
            online
          </p>
        </section>

        <div className="flex justify-center flex-wrap mt-2 mb-6"></div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const donate = await firebase.firestore().collection("users").get();

  const data = JSON.stringify(
    donate.docs.map((u) => {
      return {
        id: u.id,
        ...u.data(),
      };
    })
  );

  return {
    props: {
      data,
    },
    revalidate: 60 * 60,
  };
};
