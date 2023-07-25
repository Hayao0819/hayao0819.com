//import { useContext } from "react";


import { H2, H3 } from "@/components/elements/Headlines";
import Link from "@/components/elements/Link";
import { Modal } from "@/components/elements/Modal";
//import { useModal } from "@/components/elements/ModalContext";
import { modalContext, useModal } from "@/components/elements/ModalContext";
import ThemeButton from "@/components/elements/ThemeBtn";
import Layout from "@/components/layouts/Layout";

export default function Test() {
    const mtx = useModal();
    return (
        <Layout>
            <H2>砂場</H2>
            <p>このページではNextJSの勉強を兼ねた色々な実験をしています。</p>

            <H3>ダークテーマ</H3>
            <p>
                ダークテーマを作ってみたけど現状クソださ→
                <ThemeButton />
            </p>

            <H3>ブログ</H3>
            <p>
                <Link href="/diary/posts">新しいブログ</Link>をこのサイトのソース内で作ろうとしています。
            </p>
            <p>
                <Link href="/diary/categories">カテゴリ一覧</Link>を実装してみました。
            </p>

            <H3>Modal Test</H3>

            <modalContext.Provider value={mtx}>
                <button
                    className="daisy-btn"
                    onClick={() => {
                        mtx.openModal("test-modal");
                        console.log("open test");
                    }}
                >
                    開く
                </button>
                <Modal name="test-modal">
                    <p>ほげほげー</p>
                </Modal>
            </modalContext.Provider>
        </Layout>
    );
}
