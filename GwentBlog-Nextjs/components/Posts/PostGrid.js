import PostItem from "./PostItem";
import classes from './PostGrid.module.css';

const PostGrid = props => {

    return (
        <ul className={classes.grid}>
            {props.posts.map(post => (<PostItem key={post.slug} post={post}/>))}
        </ul>
    )
}

export default PostGrid;