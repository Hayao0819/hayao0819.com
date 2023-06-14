import Hello from "@/components/Hello";
import Layout from "@/components/Layout";
import State from "@/components/State";

export default function Home() {
    return (
        <Layout>
            <State></State>
            <Hello></Hello>
        </Layout>
    );
}
