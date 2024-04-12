import { type AppType } from "next/app";
// import { Inter } from "next/font/google";
import React from "react";
import "~/styles/globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans `}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
