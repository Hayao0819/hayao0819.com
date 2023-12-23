import fs from "fs";
import matter from "gray-matter";

import * as blogtools from "@/lib/blog";
import { Post, PostMeta } from "@/lib/blog/type";

import { MDFILE_DIR } from "./config";

export const getPostFromPath = (file: string): Post => {
    const fileContent = fs.readFileSync(file, "utf-8");
    const parsed = matter(fileContent);
    const meta: PostMeta = {};

    Object.keys(parsed.data).forEach((key) => {
        if (key === "date") {
            meta[key] = new Date(parsed.data[key]).toISOString();
        } else {
            meta[key] = parsed.data[key];
        }
    });

    //console.log(meta);

    return {
        file: file,
        url: "posts/" + blogtools.mdPathToURL(file),
        meta: meta,
        content: parsed.content,
    };
};

export class PostList {
    private posts: Post[];

    constructor() {
        this.posts = [];
    }

    fetch() {
        if (this.posts.length !== 0) {
            return this;
        }

        const files = blogtools.getMdFilesInDir(MDFILE_DIR);

        const posts = files
            .map((file) => {
                return getPostFromPath(file);
            })
            .filter((p) => {
                return p.meta.title && p.meta.date;
            })
            .sort((a, b) => {
                if (!a.meta.date || !b.meta.date) {
                    return 0;
                }
                return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
            });

        this.posts = posts;
        return this;
    }

    getSplitedPosts(currentPage: number, perPage: number) {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        return PostList.fromPostList(this.posts.slice(start, end));
    }

    getPosts() {
        return this.posts;
    }

    getByCategory(category: string) {
        const filtered = this.getPosts().filter((p) => {
            return p.meta.categories?.includes(category);
        });
        return PostList.fromPostList(filtered);
    }

    getContentSplitedPosts(perChars: number) {
        return PostList.fromPostList(
            this.posts.map((p) => {
                const content = p.content.slice(0, perChars);
                return {
                    ...p,
                    content: content,
                };
            }),
        );
    }

    static fromPostList(posts: Post[]) {
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
