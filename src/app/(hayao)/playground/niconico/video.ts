import { atom, useAtomValue } from "jotai";
import { Dispatch, SetStateAction, useState } from "react";

const apiUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/api/niconico" : "https://nicorekari.nanasi-rasi.net/DB.json";

interface Video {
    id: string;
    title: string;
    registeredAt: string;
    thumbnail: string;

    cT: string;
}

export type VideoList = Map<string, Video>;

export const useSearch = (): [string[], Dispatch<SetStateAction<string>>] => {
    const [search, setSearch] = useState<string>("");
    const replaced = search.replace("　", " ").split(" ");
    return [replaced, setSearch];
};

const videoListAtom = atom(async () => {
    // fetch data
    const res = await fetch(apiUrl);
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    const json = await res.json();

    // set videoList
    const videoMap = new Map<string, Video>();
    Object.keys(json).forEach((key) => {
        videoMap.set(key, json[key]);
    });
    return videoMap;
});

export const useVideoList = () => useAtomValue(videoListAtom);
