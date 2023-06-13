#!/usr/bin/env just --justfile
export PATH := "./node_modules/.bin:" + env_var('PATH')

# [katsuki-yuri]:
# I use just and I have just aliased to j
# so I can use j b to build, j d to dev, etc.

# Commands
build:
  pnpm run build

dev:
  pnpm run dev

install:
  pnpm install

docker:
  docker build -t hayaosite .

# Aliases for shortcalls
alias b := build
alias d := dev
alias i := install