import { useState, FormEvent } from "react";
import Head from "next/head";
import {
  FiPlus,
  FiCalendar,
  FiEdit2,
  FiTrash,
  FiClock,
  FiX,
} from "react-icons/fi";
import { GetServerSideProps } from "next";
import Btn from "/components/Btn";
import { getSession } from "next-auth/react";
import firebase from "../../services/firebaseConnect";
import { format } from "date-fns";
import Link from "next/link";


interface taskListType {
  id: string;
  created: {
    nanoseconds: number;
    seconds: number;
  };
  createdFormated?: string;
  tarefa: string;
  userId: string;
  name: string;
}

interface Props {
  data: {
    id: string;
    name: string;
  };
  json: string;
}

export default function Board({ data, json }: Props) {
  const [Task, setTask] = useState<string>("");
  const [TaskList, setTaskList] = useState<taskListType[]>(JSON.parse(json));
  const [TaskEdit, setTaskEdit] = useState<taskListType | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Task === "") {
      alert("digite uma tarefa");
      return;
    }
    if (TaskEdit) {
      await firebase
        .firestore()
        .collection("tarefas")
        .doc(TaskEdit.id)
        .update({
          tarefa: Task,
        })
        .then(() => {
          let data = TaskList;
          let taskIndex = TaskList.findIndex((item) => item.id === TaskEdit.id);
          data[taskIndex].tarefa = Task;

          setTaskList(data);

          setTaskEdit(null);
          setTask("");
        });
      return;
    }

    await firebase
      .firestore()
      .collection("tarefas")
      .add({
        created: new Date(),
        tarefa: Task,
        userId: data.id,
        name: data.name,
      })
      .then((doc) => {
        const dataInfo = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), "dd MMMM yyyy"),
          tarefa: Task,
          userId: data.id,
          name: data.name,
        };
        setTaskList([...TaskList, dataInfo]);
        setTask("");
      })
      .catch((err) => {
        console.log("erro", err);
      });
  };

  const handleDelete = async (id: string) => {
    await firebase
      .firestore()
      .collection("tarefas")
      .doc(id)
      .delete()
      .then(() => {
        const array = TaskList.filter((item) => item.id !== id);
        setTaskList(array);
      })
      .catch(() => {
        alert("OPS... ocorreu um erro");
      });
  };

  const handleEdit = async (task: taskListType) => {
    setTaskEdit(task);
    setTask(task.tarefa);
  };

  const handleCancelEdit = () => {
    setTaskEdit(null);
    setTask("");
  };

  return (
    <>
      <Head>
        <title>minhas tarefas</title>
      </Head>
      <main className="max-w-[1120px] max-h-[100vh] mx-auto my-8 bg-[#17181f] rounded-md p-8">
        {TaskEdit && (
          <span className="flex items-center text-[#ff3636] ">
            <button onClick={handleCancelEdit}>
              <FiX size={24} color="#ff3636" className="cursor-pointer mr-1" />
            </button>
            você esta editando essa tarefa
          </span>
        )}
        <form
          className="flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            className="w-[90%] h-[50px] bg-[#20212c] border-[1px] border-[#424242] rounded-md px-1 py-3 text-white"
            value={Task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            type="submit"
            className="ml-3 w-[8%] h-[50px] bg-[#ffb800] flex items-center justify-center rounded-md"
          >
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>
        <h1 className="text-white mt-7 font-bold text-3xl">
          voce tem {TaskList.length}{" "}
          {TaskList.length !== 1 ? "tarefas" : "tarefa"}
        </h1>

        <section>
          {TaskList &&
            TaskList.map((t) => (
              <article className="bg-[#20212c] my-4 p-3 rounded-md" Key={t.id}>
                <p className="cursor-pointer text-[#f1f2fc] text-base leading-[150%]">
                  <Link href={`/board/${t.id}`}>{t.tarefa}</Link>
                </p>

                <div className="w-[100%] flex flex-row justify-between mt-4">
                  <div className="flex justify-center items-center">
                    <div className="flex">
                      <FiCalendar size="20" color="#ffb800" />
                      <time className="text-[#ffb800] mr-4 ml-1">
                        {t.createdFormated}
                      </time>
                    </div>
                    <button
                      className="flex bg-transparent cursor-pointer items-center justify-center"
                      onClick={() => handleEdit(t)}
                    >
                      <FiEdit2 size="20" color="#fff" />
                      <span className="ml-1 text-white">editar</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex bg-transparent cursor-pointer items-center justify-center text-white"
                  >
                    <FiTrash size="20" color="#ff3636" />
                    <span className="ml-1 text-white">Excluir</span>
                  </button>
                </div>
              </article>
            ))}
        </section>
      </main>
      <div className="max-w-[1120px] bg-[#17181f] rounded-md p-4 mx-auto my-4">
        <h3 className="text-[#ffb800] text-[2rem]">
          Obrigado por apoiar esse projeto.
        </h3>
        <div className="mt-4 flex items-center">
          <FiClock size={28} color="#fff" />
          <time className="text-white text-xl ml-2">
            Ultima dooação foi a 3 dias
          </time>
        </div>
      </div>
      <Btn />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.user.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const tasks = await firebase
    .firestore()
    .collection("tarefas")
    .where("userId", "==", session?.user.email)
    .orderBy("created", "asc")
    .get();

  const dados = tasks.docs.map((item) => {
    return {
      createdFormated: format(item.data().created.toDate(), "dd MMMM yyyy"),
      id: item.id,
      ...item.data(),
    };
  });

  const json = JSON.stringify(dados);

  console.log(json);

  const data = {
    id: session.user.email,
    name: session.user.name,
  };

  return {
    props: {
      data,
      json,
    },
  };
};
