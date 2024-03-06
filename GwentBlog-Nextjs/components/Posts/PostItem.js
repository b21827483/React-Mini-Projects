import Image from "next/image";
import Link from "next/link";
import classes from './PostItem.module.css';

const PostItem = props => {
    const { slug, title, date, image, excerpt } = props.post;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <li className={classes.post}>
            <Link href={`/posts/${slug}`}>
                <div className={classes.image}>
                <Image
                    src={`/images/posts/${slug}/${image}`}
                    alt={slug}
                    width={1000}
                    height={1000} />
                </div>
                <div className={classes.data}>
                    <h2>{title}</h2>
                    <time>{formattedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </li>
    )
}

export default PostItem;