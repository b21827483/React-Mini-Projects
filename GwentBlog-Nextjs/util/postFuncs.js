import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

const postsPath = path.join(process.cwd(), 'posts');

export function getPostFiles() {
    return fs.readdirSync(postsPath);
}

export function getPostsData() {

    const files = getPostFiles();
    const filePaths = files.map(file => (path.join(postsPath, file)));
    const slugs = files.map(file => (file.replace(/\.mdx?$/, '')));
    const filesContent = filePaths.map(path => (fs.readFileSync(path, 'utf-8')));

    const postsData = []
    filesContent.forEach((fileContent, index) => {
        const {data, content} = matter(fileContent);
        postsData.push({slug: slugs[index], ...data, content});
    });

    postsData.sort((postX, postY) => postX.date > postY.date ? -1: 1);

    return postsData;
}

export function getSelectedPosts() {
    const postsData = getPostsData();
    const selectedPosts = postsData.filter(post => post.isSelected);

    return selectedPosts;
}