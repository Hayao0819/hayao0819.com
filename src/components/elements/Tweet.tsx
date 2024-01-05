"use client";
import { Tweet as TweetWidget } from "react-twitter-widgets";
export default function Tweet({ id }: { id: string }) {
    return <TweetWidget tweetId={id} />;
}
