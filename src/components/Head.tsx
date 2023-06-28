import NextHead from "next/head";
import Metadata from "@/const/meta";

interface HeadProps{
    title?: string,
    description?: string,
    image?: string,
}
export default function Head(props: HeadProps) {
    // デフォルト値を設定して適用
    const defaults: HeadProps = {
        title: "",
        description: Metadata.description,
        image: ""
    }
    props = {...defaults, ...props}

    // titleを加工
    props.title= props.title + " | " + Metadata.title

    return (
        <NextHead>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />

            {/*<!-- Google / Search Engine Tags -->*/}
            <meta itemProp="name" content={props.title} />
            <meta itemProp="description" content={props.description} />
            <meta itemProp="image" content={props.image} />

            {/*<!-- Facebook Meta Tags -->*/}
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.title} />
            <meta property="og:type" content="website" />

            {/*<!-- Twitter Meta Tags -->*/}
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
            <meta name="twitter:card" content="summary_large_image" />
        </NextHead>
    );
}
