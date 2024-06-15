"use client";

import { useEffect, useState } from "react";
import { Input } from "react-daisyui";

import Link from "@/components/elements/Link";
import CommonSpacer from "@/components/layouts/CommonSpacer";

const apiUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/api/niconico" : "https://nicorekari.nanasi-rasi.net/DB.json";

interface Video {
    id: string;
    title: string;
    registeredAt: string;
    thumbnail: string;
    cT: string;
}

type VideoList = Map<string, Video>;

type ClickList = { [key: string]: boolean };

export default function Niconico() {
    const [info, setInfo] = useState<VideoList | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const [status, setStatus] = useState<ClickList | null>(null);
    //const [catList, setCatList] = useState<string[]>([]);

    const [search, setSearch] = useState<string>("");
    //const [category, setCategory] = useState<string>("");

    useEffect(() => {
        (async () => {
            // fetch data
            const res = await fetch(apiUrl);
            if (!res.ok) {
                setError(new Error(res.statusText));
                throw new Error(res.statusText);
            }
            const json = await res.json();

            // set videoList
            const videoMap = new Map<string, Video>();
            Object.keys(json).forEach((key) => {
                videoMap.set(key, json[key]);
            });
            setInfo(videoMap);

            // set clickList
            const initClickList: ClickList = {};
            videoMap.forEach((v, k) => {
                initClickList[k] = false;
            });
            setStatus(initClickList);

            // set category
            //setCatList(Array.from(new Set(Array.from(videoMap.values()).map((v) => v.cT))));
        })();
    }, []);

    if (error) {
        return <CommonSpacer>{error.message}</CommonSpacer>;
    }

    return (
        <CommonSpacer>
            <div>
                <p>
                    このサイトは<Link href="https://x.com/nanasi_rasi">ななしぃ様</Link>
                    が作成した動画リストを許可のもの使用しています。
                </p>
                <p>ニコニコ動画様のサーバ負荷を考慮して、サムネイルは非表示になっています。</p>
                <p>
                    ソースコードは
                    <Link href="https://github.com/Hayao0819/hayao0819.com/blob/master/src/app/(hayao)/playground/niconico/page.tsx">
                        こちら
                    </Link>
                    で公開されています。
                </p>
            </div>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="my-10 w-full" />

            {/* <div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-md border-2 border-gray-300 p-2"
                >
                    <option value="">全て</option>
                    {catList.map((c) => {
                        return (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        );
                    })}
                </select>
            </div> */}

            <ul className="grid grid-cols-2 gap-3">
                {info &&
                    Array.from(info?.values())
                        .filter((v) => v.title.includes(search))
                        .map((v) => {
                            return (
                                <li key={v.id} className="">
                                    <a
                                        href={`https://www.nicovideo.jp/watch_tmp/${v.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex cursor-pointer"
                                    >
                                        {status && status[v.id] ? (
                                            <img src={v.thumbnail} alt={v.title} className="size-20" />
                                        ) : null}
                                        <span className=" flex items-center p-3 align-middle">{v.title}</span>
                                    </a>
                                </li>
                            );
                        })}
            </ul>
        </CommonSpacer>
    );
}
