<header>
<img src="./public/icons/top.jpeg" alt="logo" height="100" align="left">
<h1 style="display: inline">Personal website of Hayao</h1>

[![Twitter](https://img.shields.io/badge/Twitter-grey?style=flat-square&logo=twitter)](https://twitter.com/hayao0819)
[![Test CI](https://github.com/Hayao0819/hayao0819.com/actions/workflows/test.yml/badge.svg)](https://github.com/Hayao0819/hayao0819.com/actions/workflows/test.yml)

## Development

In order to run this project, you need latest Node.js installed on your machine with pnpm package manager.

(For Hayao0819):
In order to make development easier, use volta nodejs version manager which will manage everything for you.
In order to install volta, use:

```bash
brew install volta # macos
[paru|yay] -S volta-bin # archlinux
```

After installing volta, you may set up volta and install nodejs with pnpm:

```bash
volta setup
volta install node@lts
volta install pnpm prettier rome
```

As you finished with installing necessary tools, now you may install dependencies:

```bash
pnpm install
pnpm run dev
```

Just in case, I'll leave [justfile](https://github.com/casey/just) for you to use.
