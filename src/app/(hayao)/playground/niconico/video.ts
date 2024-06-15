import { Dispatch, SetStateAction, useEffect, useState } from "react";

const apiUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/api/niconico" : "https://nicorekari.nanasi-rasi.net/DB.json";

interface Video {
    id: string;
    title: string;
    registeredAt: string;
    thumbnail: string;

    cT: string;
}

export type ClickList = { [key: string]: boolean };

export type VideoList = Map<string, Video>;

export const useSearch = (): [string[], Dispatch<SetStateAction<string>>] => {
    const [search, setSearch] = useState<string>("");
    const replaced = search.replace("　", " ").split(" ");
    return [replaced, setSearch];
};

export const useVideoList = () => {
    const [info, setInfo] = useState<VideoList | null>(null);
    const [error, setError] = useState<Error | null>(null);

    //const [catList, setCatList] = useState<string[]>([]);

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
        })();
    }, []);

    return { info, error };
};
