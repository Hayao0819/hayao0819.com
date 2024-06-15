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
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState<ClickList | null>(null);

    useEffect(() => {
        (async () => {
            //console.log(apiUrl);
            const res = await fetch(apiUrl);
            if (!res.ok) {
                setError(new Error(res.statusText));
                throw new Error(res.statusText);
            }
            const json = await res.json();

            const videoMap = new Map<string, Video>();

            Object.keys(json).forEach((key) => {
                videoMap.set(key, json[key]);
            });

            setInfo(videoMap);

            const initClickList: ClickList = {};
            videoMap.forEach((v, k) => {
                initClickList[k] = false;
            });

            setStatus(initClickList);
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
            </div>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="my-10 w-full" />

            <ul className="grid grid-cols-2 gap-3">
                {info &&
                    Array.from(info?.values())
                        .filter((v) => v.title.includes(search))
                        .map((v) => {
                            return (
                                <li key={v.id} className="">
                                    <a
                                        //href={`https://www.nicovideo.jp/watch_tmp/${v.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (status && status[v.id]) {
                                                window.open(`https://www.nicovideo.jp/watch_tmp/${v.id}`, "_blank");
                                            }
                                            setStatus({ ...(status ?? {}), [v.id]: true });
                                        }}
                                    >
                                        {/* <img src={v.thumbnail} alt={v.title} className="size-20" /> */}
                                        {status && status[v.id] ? (
                                            <img src={v.thumbnail} alt={v.title} className="size-20" />
                                        ) : (
                                            <></>
                                        )}
                                        <span className=" flex items-center p-3 align-middle">{v.title}</span>
                                    </a>
                                </li>
                            );
                        })}
            </ul>
        </CommonSpacer>
    );
}
