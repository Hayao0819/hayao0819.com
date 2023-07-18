import { MDXRemoteSerializeResult } from "next-mdx-remote";


export default function BlogMeta({ source }: { source: MDXRemoteSerializeResult }) {
    const date:Date = new Date(source.frontmatter.date as Date);

    
    
    return (
        <div className="border-y-white">
            <ul className="flex">
                {isNaN(date.getDate()) ? <></> : <li>{date.getFullYear()}/{date.getMonth()}/{date.getDay()}</li>}
            </ul>
        </div>
    );
}
