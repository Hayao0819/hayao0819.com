<img src="./public/icons/top.jpeg" alt="logo" height="100" align="left">
<h1 style="display: inline">Personal website of Hayao</h1>

[![Twitter](https://img.shields.io/badge/Twitter-grey?style=flat-square&logo=twitter)](https://twitter.com/hayao0819)
[![Test CI](https://img.shields.io/github/actions/workflow/status/Hayao0819/hayao0819.com/test.yml?logo=github&label=Test%20CI%3Amaster&branch=master
)](https://github.com/Hayao0819/hayao0819.com/actions/workflows/test.yml)
[![Test CI](https://img.shields.io/github/actions/workflow/status/Hayao0819/hayao0819.com/test.yml?logo=github&label=Test%20CI%3Adev&branch=dev
)](https://github.com/Hayao0819/hayao0819.com/actions/workflows/test.yml)

## Development

In order to run this project, you need latest Node.js installed on your machine with pnpm package manager.

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
