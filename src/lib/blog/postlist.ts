import fs from "fs";
import path from "path";

import { MDFILE_DIR } from "./config";
import { getPostDataFromFile, PostData } from "./post";
import { DEFAULT_URL_FORMAT, URLFormat } from "./url";

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

        const files = getMdFilesInDir(this.dir);
        //console.log(getMdFilesInDir(process.cwd()));
        //console.log(files);

        const posts = files
            .map((file) => {
                return getPostDataFromFile(file, this.format);
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
        return this;
    }

    getSplitedPosts(currentPage: number, perPage: number) {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        return PostList.fromPostDatas(this.posts.slice(start, end));
    }

    getPosts() {
        return this.posts;
    }

    getByCategory(category: string) {
        const filtered = this.getPosts().filter((p) => {
            console.log(`${p.file}: ${p.meta.categories}`);
            return p.meta.categories?.includes(category);
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

    static fromPostDatas(posts: PostData[]) {
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

export const getAllPosts = (): PostData[] => {
    return PostList.fetch().getPosts();
};
