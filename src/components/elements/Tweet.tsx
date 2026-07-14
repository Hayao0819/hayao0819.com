"use client";
import type { ComponentPropsWithoutRef } from "react";
import { type TweetProps as LibTweetProps, Tweet as TweetWidget } from "react-twitter-widgets";

import { cn } from "@/lib/utils";

export type TweetProps = ComponentPropsWithoutRef<"div"> & LibTweetProps;

export default function Tweet({ tweetId, options, onLoad, renderError, className, ...props }: TweetProps) {
    // max-w-full + overflow clip: a widget iframe keeping a stale width after
    // viewport resize must never widen the document (horizontal page scroll)
    return (
        <div {...props} className={cn("max-w-full overflow-x-hidden", className)}>
            <TweetWidget
                tweetId={tweetId}
                options={options}
                onLoad={onLoad}
                renderError={
                    renderError ??
                    (() => (
                        <p className="mono-eyebrow my-7">
                            // tweet unavailable —{" "}
                            <a
                                href={`https://twitter.com/i/status/${tweetId}`}
                                className="link-ai"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                twitter.com/i/status/{tweetId}
                            </a>
                        </p>
                    ))
                }
            />
        </div>
    );
}
