import { existsSync } from "node:fs";
import path from "node:path";

import { removeTrailingSlash } from "../utils";

export function findMarkdownFromURL(dir: string, url: string) {
    const basePath = removeTrailingSlash(path.join(dir, url));
    const filePathes = [`${basePath}.mdx`, `${basePath}/index.mdx`, `${basePath}.md`, `${basePath}/index.md`];

    const targetFile = ((): string | undefined => {
        for (const filePath of filePathes) {
            //console.log("check: " + filePath);
            if (existsSync(filePath)) {
                return filePath;
            }
        }
    })();

    return targetFile;
}
