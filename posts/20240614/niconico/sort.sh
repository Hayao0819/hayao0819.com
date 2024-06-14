#!/usr/bin/env bash

current_dir=$(
    cd "$(dirname "$0")" || exit
    pwd
)

linkfile="$current_dir/links.md"

while read -r url; do
    sed -E "s|- \[(.+)\]\((.+)\)|\1\n\2|g" "$linkfile" | grep -B 1 "$url" | head -n 1 | sed -e "s|^|- [|g" -e "s|$|]($url)|g"
done < <(
grep -- "- " "$linkfile" |  sed -E "s|- \[(.+)\]\((.+)\)|\2|g" | tr "/" " " | sed "s| sm| sm |g" | sort -n -k 5 | sed "s| sm | sm|g" | tr " " "/"
) >> "$current_dir/index.md"
