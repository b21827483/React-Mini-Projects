import PostGrid from "./PostGrid";
import classes from './AllPosts.module.css';

const AllPosts = props => {
    return (
        <section className={classes.allposts}>
            <h1>All Posts</h1>
            <PostGrid posts={props.posts} />
        </section>
    )
}

export default AllPosts;