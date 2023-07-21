import fs from "fs";
import path from "path";

export const GetListDirFiles = (dir: string): string[] => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((dirent) => {
            if (dirent.isFile()) {
                return [`${dir}/${dirent.name}`];
            } else {
                return GetListDirFiles(`${dir}/${dirent.name}`);
            }
        })
        .filter((postFilePath) => {
            const ext = path.extname(postFilePath).toLowerCase();
            return ext === ".mdx" || ext === ".md";
        });
};

export const MDXPathToURL = (path: string): string => {
    return path.replace("index.mdx", "").replace("index.md", "").replace(".mdx", "").replace(".md", "").replace("diaries/", "");
};
