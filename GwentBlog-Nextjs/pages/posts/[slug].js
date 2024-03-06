import {getPostFiles, getPostsData} from "../../util/postFuncs";
import PostDetails from "../../components/Posts/details/PostDetails";

const PostDetailsPage = props => {
    return <PostDetails post={props.post}/>
}

export function getStaticProps(context) {
    const slug = context.params.slug;
    const post = getPostsData().filter(post => post.slug === slug)[0];

    return {
        props: {post: post}
    }
}

export function getStaticPaths() {
    const files = getPostFiles();
    const slugs = files.map(file => (file.replace(/\.mdx?$/, '')));

    return {
        paths: slugs.map(slug => ({params: {slug: slug}})),
        fallback: true
    }
}

export default PostDetailsPage;