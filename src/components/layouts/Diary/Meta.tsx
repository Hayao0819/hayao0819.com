import NextLink from "next/link";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export default function BlogMeta({ source }: { source: MDXRemoteSerializeResult }) {
    const date: Date = new Date(source.frontmatter.date as Date);
    let categories: string[] = [];

    if (Array.isArray(source.frontmatter.categories as string[])) {
        categories = [...(source.frontmatter.categories as string[])];
    } else {
        categories = [source.frontmatter.categories as string];
    }

    return (
        <div className="m-2 mx-auto w-full p-2 md:w-2/3">
            <ul className="flex child:mx-1">
                {/* 日付 */}
                {isNaN(date.getDate()) ? (
                    <></>
                ) : (
                    <li>
                        投稿日時: {date.getFullYear()}/{date.getMonth()}/{date.getDay()}
                    </li>
                )}

                {/* カテゴリ */}
                {
                    <li className="flex">
                        カテゴリー: {}
                        <ul className="flex child:ml-2">
                            {categories.map((c) => {
                                return (
                                    <li key={c}>
                                        <NextLink href={"/diary/categories/" + c}>{c}</NextLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                }
            </ul>
        </div>
    );
}
