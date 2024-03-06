import PostGrid from "../Posts/PostGrid";
import classes from './SelectedPosts.module.css';

const SelectedPosts = props => {

    return (
    <div className={classes.div}>
        <h1>Selected Posts</h1>
        <PostGrid posts={props.posts}/>
    </div>
    )
}

export default SelectedPosts;