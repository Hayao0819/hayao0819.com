"use client";
import { ComponentPropsWithoutRef } from "react";
import { Tweet as TweetWidget, TweetProps as LibTweetProps } from "react-twitter-widgets";

export type TweetProps = ComponentPropsWithoutRef<"div"> & LibTweetProps;

export default function Tweet({ tweetId, options, onLoad, renderError, ...props }: TweetProps) {
    return (
        <div {...props}>
            <TweetWidget tweetId={tweetId} options={options} onLoad={onLoad} renderError={renderError} />;
        </div>
    );
}
