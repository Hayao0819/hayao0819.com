---
title: ブログをNext 15+ESLint v9に移行した話
description: ""
date: 2025-01-08T04:19:04.755624985+09:00
categories:
    - 技術系
draft: false
publish: true
---

私のこのブログを先日リリースされたNext 15 + React 19 + ESLint v9に移行しました。

## パッケージ更新

何も考えず[ncu](https://www.npmjs.com/package/npm-check-updates)で[エイヤ](https://github.com/yamader/minskey/commit/887ff6d2f14df24b14631d67bfecfad8fe94ac6e)しました。

## Next 15

Next 15はいくつかの破壊的変更が含まれていますが、そこまで大きなものはありませんでした。

コンポーネントのPropsのいくつかがPromiseなものへと変更になったらしいですが、自動でMigrateしてくれるものを公式が用意してくれているので困ることはありません。

仕様変更の詳細な情報は以下に書かれています。

[Next\.js 15 \| Next\.js](https://nextjs.org/blog/next-15#async-request-apis-breaking-change)

これすら読むのがだるいという人は、パッケージの更新後に以下を実行すれば自動で変更が走ります。

```sh
pnpx @next/codemod@canary next-async-request-api .
```

(私はpnpm信者なのでpnpxを使います)

以下は参考文献です。

- [Next\.js 15リリース、React 19をサポート \| gihyo\.jp](https://gihyo.jp/article/2024/10/nextjs-15)
- [Next\.js 15 \| Next\.js](https://nextjs.org/blog/next-15)
- [Next\.js バージョン15の主な変更点について](https://www.zenryoku-kun.com/new-post/nextjs15#async)

## React 19

特に何もしなくても勝手に動いてくれました。色々なレガシーな機能が削除されたそうですが、私は使ってなかったみたいです。

詳細は以下の公式ガイドをば。

[React 19 Upgrade Guide – React](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#typescript-changes)

### React Compiler

ただ、せっかくReact 19にしたのだからということでウワサのReact Compilerを導入してみました。

以下の公式ドキュメントを読めば有効化の手順がわかります。

[React Compiler – React](https://ja.react.dev/learn/react-compiler)

Next.jsへ導入する場合は以下を読んでください。

[next\.config\.js: reactCompiler \| Next\.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler)

基本的には`next.config.js`で有効化した後、ESLintのプラグインを導入するという手順です。

有効化をしてみたものの、私のウェブサイトはただ文章をサーブするだけのサイトなので恩恵はよくわからないです。

### 一部パッケージの依存関係

React系のパッケージでは「React 19でも動くのだろうが依存関係に記載されていない」というものが多くあります。

私は以下のパッケージが依存関係の解決を行えず警告が表示されました。

- [`usehooks-ts`](https://github.com/juliencrn/usehooks-ts)
- [`react-twitter-widgets`]([andrewsuzuki/react\-twitter\-widgets: Twitter widgets as React components](https://github.com/andrewsuzuki/react-twitter-widgets))

`usehooks-ts`に関しては既にIssueが建てられており、互換性の問題も無いことがコメントされています。

[\[BUG\] Update React dependency to 19 · Issue \#650 · juliencrn/usehooks\-ts](https://github.com/juliencrn/usehooks-ts/issues/650)

一方で`react-twitter-widgets`は3年前から更新されていないコンポーネントであり、Issueすら建てられていません。

大きなライブラリではないので自分でフォークしてもいいのかなという気持ちではありますが、しばらくは依存関係を上書きだけして様子見しようかなという感じです。

私はpnpmを使っているので、`overrides`という機能を使うと依存関係を強引に書き換えることができます。

詳細は以下を参照してください。

[package\.json \| pnpm](https://pnpm.io/ja/package_json#pnpmoverrides)

追記した設定が以下になります。

```json
"pnpm": {
    "overrides": {
        "usehooks-ts@3.1.0>react": "^16.8.0  || ^17 || ^18 || ^19",
        "react-twitter-widgets@1.11.0>react": "^16.8.0 || ^17 || ^18 || ^19"
    }
}
```

## ESLint v9

ESLint v9では皆さん御存知の通りついにレガシーな`.eslintrc.json`での設定が削除されFlat Configのみとなってしまいました。

私の`.eslintrc.json`はかなり魔境になっており、そのままFlat Configへの移行はできなかったので、諦めて一から書き直すことにしました。

### Next.jsでの対応作業

Next.jsのプロジェクトにFlat Configを導入する場合の最大の問題は`eslint-plugin-next`のFlat Configの対応です。

結局このプラグインのv9への対応は遅れに遅れた結果、Next 15と同時にリリースという運びになりました。

正式リリース前の議論は以下で行われており、依存関係の対応まちやその間の暫定対処方法等が乱立しておりカオスでした。

[How to use new "flat config" approach in Eslint? · vercel/next\.js · Discussion \#49337](https://github.com/vercel/next.js/discussions/49337)

[next\-lint Doesn't Support ESLint 9 · Issue \#64409 · vercel/next\.js](https://github.com/vercel/next.js/issues/64409)

ようやく状況も改善され、Flat Configが利用できるようになりました。

### MDXでの対応作業

残念ながら2025年1月8日現在で`eslint-mdx`においてFlat ConfigについてのIssueは立ったままになっています。

[Research Spike: ESLint 9 compatibility · Issue \#477 · mdx\-js/eslint\-mdx](https://github.com/mdx-js/eslint-mdx/issues/477)

しかし完全に非対応というわけではなく、以下の設定でFlat Configで利用することができました。

```js
    {
        name: "mdx/recommended",
        ...mdxPlugin.configs.flat,
    },
```

### Biomeでよくね？

最近でも小規模なOSSではチラホラとBiomeの採用がなされており、それに追従してもいいのかなと考えています。

というのも、やはりLinterとFormatterが一緒になっており複雑なプラグインシステムがないのは便利で軽量です。

一方でMDXやNext.jsのサポート、ルールの種類も微妙(らしい。未調査。)であることを考えるとまだ時期尚早なのではとも思ったり。

### 出来上がったもの

完成したものがこちらになります。

[https://github.com/Hayao0819/hayao0819.com/blob/261bc220dd69eed003b927631da69042a38a35a7/eslint.config.mjs](https://github.com/Hayao0819/hayao0819.com/blob/261bc220dd69eed003b927631da69042a38a35a7/eslint.config.mjs)

### 参考文献

(あとで追記します)

## 終わり

フロントエンドは偽物の情報科学なので基本的に上流のメンテナの気分と流行に振り回されます。はやくこの地獄から抜け出して健全な勉強をしたい…

ESLintの設定等はまだまだ詰めればきれいになるのでしょうが、そこまで時間をかけるメリットもないのでしません。

この状態で暫く様子見しようと思いますが、もしまたNextやESLintにこのレベルの破壊的変更があった日には別の選択肢への乗り換えも視野にいれるかもしれません。

フロントエンドとかいう悲しい界隈に愚痴を言いつつも、一旦は移行が終わったのでヨシとします。
