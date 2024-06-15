"use client";

import { useMemo, useState } from "react";
import { Checkbox, Form, Input } from "react-daisyui";

import Link from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";

import { useSearch, useVideoList } from "./video";

const Header = () => (
    <>
        <div>
            <p>
                動画リストは<Link href="https://x.com/nanasi_rasi">ななしぃ様</Link>
                が作成したものを許可のもの使用しています。ニコニコ動画様のサーバ負荷を考慮して、サムネイルは非表示になっています。
            </p>
            <p>スペース区切りでAnd検索を行うことが可能です。</p>
            <p>
                このサイトはニコニコ動画及び株式会社ドワンゴ様の公式<b>ではございません。</b>
                ソースコードは
                <Link href="https://github.com/Hayao0819/hayao0819.com/blob/master/src/app/(hayao)/playground/niconico/page.tsx">
                    こちら
                </Link>
                で公開されています。
            </p>
        </div>
    </>
);

export default function Niconico() {
    const [search, setSearch] = useSearch();
    const [musicOnly, setMusicOnly] = useState<boolean>(false);

    const { info, error } = useVideoList();

    const header = useMemo(() => <Header />, []);

    if (error) return <CommonSpacer>{error.message}</CommonSpacer>;

    return (
        <CommonSpacer>
            <div>
                {header}
                <Form className="my-10">
                    <Input value={search.join(" ")} onChange={(e) => setSearch(e.target.value)} className="w-full" />
                    <Form.Label title="音楽のみ" className="mx-auto w-fit child:mx-2">
                        <Checkbox checked={musicOnly} onChange={(e) => setMusicOnly(e.target.checked)} />
                    </Form.Label>
                </Form>
            </div>

            <ul className="grid grid-cols-2 gap-3">
                {info &&
                    Array.from(info?.values())
                        //.filter((v) => v.title.includes(search))
                        .filter((v) => search.every((s) => v.title.includes(s)))
                        .filter((v) => !musicOnly || v.cT === "music")
                        .map((v) => {
                            return (
                                <li key={v.id} className="">
                                    <a
                                        href={`https://www.nicovideo.jp/watch_tmp/${v.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex cursor-pointer"
                                    >
                                        <span className=" flex items-center p-3 align-middle">{v.title}</span>
                                    </a>
                                </li>
                            );
                        })}
            </ul>
        </CommonSpacer>
    );
}
