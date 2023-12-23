import * as blogtools from "@/lib/blog";

import { MDFILE_DIR } from "./config";
import { getPostFromPath, Post, PostData } from "./post";
import { DEFAULT_URL_FORMAT, URLFormat } from "./url";

export class PostList {
    private posts: Post[];
    dir: string;
    format: URLFormat;

    constructor(dir: string = MDFILE_DIR, format: URLFormat = DEFAULT_URL_FORMAT) {
        this.posts = [];
        this.dir = dir;
        this.format = format;
        this.fetch();
    }

    fetch() {
        if (this.posts.length !== 0) {
            return this;
        }

        const files = blogtools.getMdFilesInDir(this.dir);
        //console.log(files);

        const posts = files
            .map((file) => {
                return getPostFromPath(file, this.format);
            })
            .filter((p) => {
                return p.meta.title && p.meta.date;
            })
            .sort((a, b) => {
                const [aMeta, bMeta] = [a.get().meta, b.get().meta];
                if (!aMeta.date || !bMeta.date) {
                    return 0;
                }
                return new Date(bMeta.date).getTime() - new Date(aMeta.date).getTime();
            });

        this.posts = posts;
        return this;
    }

    getSplitedPosts(currentPage: number, perPage: number) {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        return PostList.fromPostDataList(this.posts.slice(start, end));
    }

    getPosts() {
        return this.posts;
    }

    getPostDatas() {
        return this.posts.map((p) => p.get());
    }

    getByCategory(category: string) {
        const filtered = this.getPosts().filter((p) => {
            return p.meta.categories?.includes(category);
        });
        return PostList.fromPostDataList(filtered);
    }

    getContentSplitedPosts(perChars: number) {
        return PostList.fromPostDataList(
            this.posts.map((p) => {
                const content = p.content.slice(0, perChars);
                return {
                    ...p,
                    content: content,
                };
            }),
        );
    }

    static fromPostDataList(posts: PostData[]) {
        return PostList.fromPosts(posts.map((p) => Post.fromPostData(p)));
    }

    static fromPosts(posts: Post[]) {
        const postList = new PostList();
        postList.posts = posts;
        return postList;
    }

    static fetch() {
        const postList = new PostList();
        postList.fetch();
        return postList;
    }
}

export const getAllPosts = (): Post[] => {
    const postList = PostList.fetch();
    return postList.getPosts();
};
