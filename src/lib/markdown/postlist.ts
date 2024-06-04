import fs from "fs";
import path from "path";

import { getPostDataFromFile, PostData } from "./post";
import { URLFormat } from "./url";

const getMdFilesInDir = (dir: string): string[] => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((dirent) => {
            if (dirent.isFile()) {
                return [path.join(`${dir}`, `${dirent.name}`)];
            } else {
                return getMdFilesInDir(path.join(`${dir}`, `${dirent.name}`));
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

    fetch(
        dir: string,
        format: URLFormat,
        //includeDraft: boolean | undefined = undefined,
        //includeHidden: boolean | undefined = undefined,
    ) {
        if (this.fetched) return this;

        const files = getMdFilesInDir(dir);
        //console.log(getMdFilesInDir(process.cwd()));
        //console.log(files);

        const posts = files
            .map((file) => {
                return getPostDataFromFile(file, format);
            })
            .filter((p) => {
                if (p.meta.title && p.meta.date) {
                    return true;
                } else {
                    console.log(`[WARN] ${p.file} is invalid post file.`);
                    return false;
                }
            })
            .filter((p) => {
                if (p.meta.publish == undefined) return true;
                if (p.meta.publish == true) return true;
                return false;
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
        //console.log(posts.map((p) => p.file));
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

    excludeDraft() {
        const posts = this.getPosts();
        return PostList.fromPostDatas(
            posts.filter((p) => {
                if (p.meta.draft == undefined) return true;
                if (p.meta.draft == false) return true;
                return false;
            }),
        );
    }

    excludeHidden() {
        const posts = this.getPosts();
        //console.log(posts.length);
        return PostList.fromPostDatas(
            posts.filter((p) => {
                if (p.meta.hidden == undefined) return true;
                if (p.meta.hidden == false) return true;
                return false;
            }),
        );
    }

    getPostByURL(url: string): [PostData | null, number] {
        const posts = this.getPosts();
        const post = posts.findIndex((p) => {
            //console.log(p.url, url);
            return p.url === url;
        });
        if (post === -1 || !posts[post]) {
            //console.log("not found");
            return [null, -1];
        }
        return [posts[post], post];
    }

    getMostRecentPostByURL(url: string): { before: PostData | null; current: PostData | null; after: PostData | null } {
        const [, postIndex] = this.getPostByURL(url);
        //console.log(postIndex);
        if (postIndex === -1 || !this.posts[postIndex]) {
            return {
                before: null,
                current: null,
                after: null,
            };
        }
        return {
            before: this.posts[postIndex + 1] ? this.posts[postIndex + 1] : null,
            current: this.posts[postIndex],
            after: this.posts[postIndex - 1] ? this.posts[postIndex - 1] : null,
        };
    }

    getByCategory(category: string) {
        const filtered = this.getPosts().filter((p) => {
            // 何故かこれをしないと動かない
            const some = [
                p.meta.categories?.includes(category),
                p.meta.categories?.includes(decodeURI(category)),
                p.meta.categories?.map((c) => encodeURI(c)).includes(category),
                p.meta.categories?.map((c) => encodeURI(c)).includes(decodeURI(category)),
            ];

            return some.some((s) => s);
        });

        return PostList.fromPostDatas(filtered);
    }

    getByTag(tag: string) {
        const filtered = this.getPosts().filter((p) => {
            // 何故かこれをしないと動かない
            return (
                p.meta.tags?.includes(tag) ||
                p.meta.tags?.includes(decodeURI(tag)) ||
                p.meta.tags?.map((c) => encodeURI(c)).includes(tag) ||
                p.meta.tags?.map((c) => encodeURI(c)).includes(decodeURI(tag))
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
            .filter((category) => category)
            .filter((cat) => cat != "ブログ");

        return [...new Set(categories)];
    }

    getAllTags() {
        const posts = this.getPosts();
        const tags = posts
            .flatMap((post) => {
                const tags = post.meta.tags;
                if (tags) {
                    return tags;
                } else {
                    return [];
                }
            })
            .filter((tag) => tag);

        return [...new Set(tags)];
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
