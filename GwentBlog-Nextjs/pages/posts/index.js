import {Fragment} from "react";
import Head from "next/head";
import {getPostsData} from "../../util/postFuncs";
import PostGrid from "../../components/Posts/PostGrid";
import AllPosts from "../../components/Posts/AllPosts";

const Index = props => {
  return (
    <Fragment>
      <Head>
        <title>Posts</title>
        <meta name={'gwent-posts'} content={'Strategies of decks and how you should play them.'}/>
      </Head>
      <AllPosts posts={props.posts}/>
    </Fragment>
  )
}

export function getStaticProps(){
  const posts = getPostsData();

  return {
    props: {
      posts: posts}
  }
}

export default Index;