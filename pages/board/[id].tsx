import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import firebase from "../../services/firebaseConnect";
import { format } from "date-fns";

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
  return <div>{task.id}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;
  const session = await getSession({ req });

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
    });

  return {
    props: { data },
  };
};
