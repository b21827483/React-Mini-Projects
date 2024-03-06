import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './PostDetails.module.css';
import Card from "./Card";

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

function PostContent(props) {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        // image(image) {
        //   return (
        //     <Image
        //       src={`/images/posts/${post.slug}/${image.src}`}
        //       alt={image.alt}
        //       width={600}
        //       height={300}
        //     />
        //   );
        // },
        paragraph: (paragraph) => {
            const { node } = paragraph;
            console.log(paragraph);

            if (node.children[0].type === 'image') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.url}`}
                            alt={image.alt}
                            align='right'
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },

        code: (code) => {
            console.log(code)
            const { language, children } = code;
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children}
                />
            );
        },
    };

    return (
        <article className={classes.post}>
            <div className={classes.content}>
                <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
            </div>
            <Card image={imagePath} title={post.title} />
        </article>
    );
}

export default PostContent;
