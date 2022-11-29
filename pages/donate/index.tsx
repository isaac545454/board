import React from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import firebase from "../../services/firebaseConnect";
import { getSession } from "next-auth/react";
import { PayPalButtons } from "@paypal/react-paypal-js";

//AQMXR6T9NbfhD6bdROOmClMHtRypEX_BKPO6d9_kj1uPaxe7wLoBK8AW5uxiI1MPNbAJ6h7vz840CgQO
//<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Donate({ user }: Props) {
  return (
    <>
      <Head>
        <title>Ajude a platafoma a ficar online </title>
      </Head>
      <main className="flex justify-center items-center flex-col h-[130vh] mt-10 mb-20">
        <Image
          src="/rocket.svg"
          alt="seja um apoiador"
          width="500"
          height="500"
        />
        <div className="mt-6 bg-[#019950] p-4 rounded-lg flex justify-center items-center text-white ">
          <Image
            src={user.image}
            alt="foto de perfil do usuario"
            width="50"
            height="50"
            className="rounded-[50%]"
          />
          <span className="ml-4">Paranbéns você é um apoiador.</span>
        </div>
        <h1 className="text-3xl font-bold my-4 ">
          Seja um apoiador desse projeto
        </h1>
        <h3 className="mb-4">
          Contribua ccom apenas
          <span className="font-bold text-[#019950]">R$ 1,00</span>
        </h3>
        <strong className="mb-5 text-lg p-3 bg-[#eee]">
          Apareça na nossa home, tenha funcionalidades exclusivas.
        </strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "1",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order?.capture().then(function (detail) {
              console.log("Compra aprovada: " + detail.payer.name?.given_name);
              // handleSaveDonate();
            }) as Promise<void>;
          }}
        />
      </main>
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

  const user = {
    id: session.user.email,
    name: session.user.name,
    image: session.user.image,
  };

  return {
    props: {
      user,
    },
  };
};
