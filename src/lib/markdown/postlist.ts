import fs from "fs";
import path from "path";

import { getPostDataFromFile, PostData } from "./post";
import { URLFormat } from "./url";

const getMdFilesInDir = (dir: string): string[] => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((dirent) => {
            if (dirent.isFile()) {
                return [`${dir}/${dirent.name}`];
            } else {
                return getMdFilesInDir(`${dir}/${dirent.name}`);
            }
        })
        .filter((postFilePath) => {
            const ext = path.extname(postFilePath).toLowerCase();
            return ext === ".mdx" || ext === ".md";
        });
};

export class PostList {
    private posts: PostData[];
    private fetched: boolean = false;

    constructor() {
        this.posts = [];
    }

    fetch(dir: string, format: URLFormat) {
        if (this.fetched) {
            return this;
        }

        const files = getMdFilesInDir(dir);
        //console.log(getMdFilesInDir(process.cwd()));
        //console.log(files);

        const posts = files
            .map((file) => {
                return getPostDataFromFile(file, format);
            })
            .filter((p) => {
                return p.meta.title && p.meta.date;
            })
            .sort((a, b) => {
                const [aMeta, bMeta] = [a.meta, b.meta];
                if (!aMeta.date || !bMeta.date) {
                    return 0;
                }
                return new Date(bMeta.date).getTime() - new Date(aMeta.date).getTime();
            });

        this.posts = posts;
        this.fetched = true;
        return this;
    }

    getSplitedPosts(currentPage: number, perPage: number) {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const posts = this.getPosts();
        return PostList.fromPostDatas(posts.slice(start, end));
    }

    getPosts() {
        if (!this.fetched) {
            throw new Error("PostList is not fetched yet.");
        }
        return this.posts;
    }

    getByCategory(category: string) {
        const filtered = this.getPosts().filter((p) => {
            // 何故かこれをしないと動かない
            return (
                p.meta.categories?.includes(category) ||
                p.meta.categories?.includes(decodeURI(category)) ||
                p.meta.categories?.map((c) => encodeURI(c)).includes(category) ||
                p.meta.categories?.map((c) => encodeURI(c)).includes(decodeURI(category))
            );
        });

        return PostList.fromPostDatas(filtered);
    }

    getContentSplitedPosts(perChars: number) {
        return PostList.fromPostDatas(
            this.posts.map((p) => {
                const content = p.content.slice(0, perChars);
                return {
                    ...p,
                    content: content,
                };
            }),
        );
    }

    getAllCategories() {
        const posts = this.getPosts();
        const categories = posts
            .flatMap((post) => {
                const categories = post.meta.categories;
                if (categories) {
                    return categories;
                } else {
                    return [];
                }
            })
            .filter((category) => category);

        return [...new Set(categories)];
    }

    static fromPostDatas(posts: PostData[]) {
        const postList = new PostList();
        postList.posts = posts;
        postList.fetched = true;
        return postList;
    }

    static fetch(dir: string, format: URLFormat) {
        const postList = new PostList();
        postList.fetch(dir, format);
        return postList;
    }
}