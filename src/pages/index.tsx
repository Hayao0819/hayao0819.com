import Layout from "@/components/layouts/Layout";

export default function Home() {
    return (
        <Layout sidebar={<p>サイドバー</p>}>
            <h1>Home</h1>
            <p>ここはホームです。</p>
        </Layout>
    );
}
