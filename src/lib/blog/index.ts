export const mdPathToURL = (pathName: string): string => {
    return pathName.replace("index.mdx", "").replace("index.md", "").replace(".mdx", "").replace(".md", "");
};
