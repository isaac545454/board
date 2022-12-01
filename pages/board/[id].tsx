import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import firebase from "../../services/firebaseConnect";
import { format } from "date-fns";
import Head from "next/head";
import { FiPlus, FiCalendar } from "react-icons/fi";

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  name: string;
};

interface Props {
  data: string;
}

export default function id({ data }: Prosp) {
  const task = JSON.parse(data) as Task;
  return (
    <>
      <Head>
        <title>Detalhes da sua tarefa</title>
      </Head>
      <article className="flex justify-center">
        <div className="max-w-[1120px] p-8 mx-auto my-8 bg-[#17181f] flex-1 rounded-xl">
          <div className="flex items-center">
            <FiCalendar size="30" color="#fff" className="mr-1" />
            <span className="ml-1 text-white text-2xl">Tarefa Criada:</span>
            <time className="text-[#ffb800] ml-2 text-2xl">
              {task.createdFormated}
            </time>
          </div>
          <p className="text-white text-base mt-6">{task.tarefa}</p>
        </div>
      </article>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;
  const session = await getSession({ req });

  console.log(session.email);

  if (!session.user.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await firebase
    .firestore()
    .collection("tarefas")
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data = {
        id: snapshot.id,
        created: snapshot.data().created,
        createdFormated: format(snapshot.data().created.toDate(), "dd/MM/yyyy"),
        tarefa: snapshot.data().tarefa,
        userId: snapshot.data().userId,
        name: snapshot.data().name,
      };

      return JSON.stringify(data);
    })
    .catch(() => {
      return {};
    });

  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: "/board",
        permanent: false,
      },
    };
  }
  return {
    props: { data },
  };
};
