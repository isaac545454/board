import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AQMXR6T9NbfhD6bdROOmClMHtRypEX_BKPO6d9_kj1uPaxe7wLoBK8AW5uxiI1MPNbAJ6h7vz840CgQO",
  currency: "BRL",
  intent: "capture",
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
