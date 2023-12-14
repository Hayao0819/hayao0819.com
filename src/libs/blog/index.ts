import fs from "fs";
import path from "path";

export const getMdFilesInDir = (dir: string): string[] => {
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
export const mdPathToURL = (pathName: string): string => {
    return pathName.replace("index.mdx", "").replace("index.md", "").replace(".mdx", "").replace(".md", "").replace("posts/", "");
};
