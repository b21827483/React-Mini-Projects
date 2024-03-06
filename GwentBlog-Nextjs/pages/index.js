import Head from "next/head";
import {Fragment} from "react";
import HomePage from "../components/HomePage/HomePage";
import SelectedPosts from "../components/HomePage/SelectedPosts";
import {getSelectedPosts} from "../util/postFuncs";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Gwent Blog</title>
        <meta name={'gwent-blog'} content={'posting anything that comes my mind'}/>
      </Head>
      <HomePage />
      <SelectedPosts posts={props.posts} />
    </Fragment>
  )
}

export function getStaticProps() {
    const posts = getSelectedPosts();

    return {
        props: {posts: posts}
    }
}