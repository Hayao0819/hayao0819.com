#!/bin/sh

if ! type go 2> /dev/null 1>&2; then
    echo "Please install go to use tool" >&2
    exit 1
fi

script_path=$(cd "$(dirname "$0")" || exit 1; pwd)
go run -- "$script_path/." "$@"
