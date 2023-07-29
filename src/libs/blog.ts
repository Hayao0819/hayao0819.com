import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path, { join } from "path";

import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

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

export const DiariesDir = join(process.cwd(), "diaries");

export const serializeMarkdown = async (path: fs.PathOrFileDescriptor) => {
    const diaryFile = fs.readFileSync(path, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    return await serialize(diaryFile, {
        parseFrontmatter: true,
    });
};

export async function getAllPosts() {
    // get all MDX files
    const postFilePaths = GetListDirFiles("diaries");

    const diaryPreviews: DiaryPreviewType[] = [];

    // read the frontmatter for each file
    for (const diaryFilePath of postFilePaths) {
        const serializedPost = await serializeMarkdown(diaryFilePath);

        if ((serializedPost.frontmatter.hide as boolean) || (serializedPost.frontmatter.hide as string) == "true") {
            continue;
        }
        diaryPreviews.push({
            ...serializedPost.frontmatter,
            // add the slug to the frontmatter info
            //slug: diaryFilePath.replace("index.mdx", "").replace(".mdx", "").replace("diaries/", ""),
            slug: MDXPathToURL(diaryFilePath),
        } as DiaryPreviewType);
    }

    return {
        props: {
            diaryPreviews: diaryPreviews,
        },
        // enable ISR
        revalidate: 60,
    };
}
