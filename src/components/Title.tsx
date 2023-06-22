import Head from "next/head";

export default function Title({ title }: { title: string }) {
    return (
        <Head>
            <title>{"はやおのページ | " +  title}</title>
        </Head>
    );
}
