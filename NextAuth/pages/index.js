import Head from "next/head";
import {Fragment} from "react";
import HomePage from "../components/HomePage/HomePage";

export default function Home() {
  return (
      <Fragment>
          <Head>
              <title>Home Page</title>
              <meta name='home page' content='next auth authentication home page'/>
          </Head>
          <HomePage />
      </Fragment>
  );
}
