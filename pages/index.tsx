import Head from "next/head";
import Image from "next/image";

export default function Home() {
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

        <div className="flex justify-center flex-wrap mt-2 mb-6">
          <Image
            src="https://sujeitoprogramador.com/wp-content/uploads/2022/08/home.png"
            alt="apoiadores desse programa"
            width="55"
            height="55"
            className="rounded-[50%] ml-3 transition-[5s] hover:scale-125"
          />
        </div>
      </main>
    </>
  );
}
