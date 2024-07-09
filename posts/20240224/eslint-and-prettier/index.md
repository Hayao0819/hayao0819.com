---
title: 個人的ESLintとPrettierの最適解2024
date: 2024-02-24T02:25:55.319088+09:00
categories:
    - 技術系
tags:
    - ESLint
    - Prettier
    - React
    - TypeScript
draft: false
publish: true
---

ネットでTSやJSのフォーマッタやリンタについてググってると、結構色々な記事が乱立していて情報が錯綜しているので、色々試行錯誤した中で確立した自分の中の最適解をメモとして残しておきます。

## EsLintとPrettierの関係と基礎知識

そもそもリンターであるESLintとフォーマッターであるPrettierは全くの別物で、本来なら一緒に設定する必要はないはずです。ということで、まずは役割を確認します。

リンターはバグの原因になるような良くないコードや、古い書き方などに対して警告を表示するものです。

一方でフォーマッタはコードの内容を評価するのではなく、あくまでもコードの整形を行うものです。

しかし何故かESLintはコーディングスタイルにまで口出しをしてきます。

これが非常に厄介で、Prettierと組み合わせた際にスタイルが重複してしまうこともあります。

そこで、ESLint側のコーディングスタイルに関するルールを無効化し、フォーマットに関することを全てPrettierに任せます。

ESLintには「フォーマッタが実行されていない」という事実だけを警告させるように設定します。

## ESLint

ESLintの設定ファイルには様々な形式を利用できますが、個人的には現状はJSONで十分なのではないかと考えています。

(ESLintは現在、ESM Modulesを利用した[新しい設定形式](https://eslint.org/docs/latest/use/configure/configuration-files-new)にシフトしようとしています。が、以下の内容は古い形式のものです。)

### ESLintのextendとpluginsについて

ESLintのextendとpluginsは似たような内容を記述するため混合しやすいですが、全く別のものです。

pluginsは列挙されたプラグインのルールを読み込み、ESLintで使えるようにしてくれるものです。「ルールを追加する系」のプラグインを使う上では必ず書かなければならない部分です、

一方でextendはプラグインのデフォルト設定を使うように設定するものです。すなわち、自分でそのプラグイン用の設定を全て自分で書く場合はextendする必要はありません。

しかし、プラグインには「便利な設定をまとめたよ」というだけのプラグインも存在します。また、「よくわからないけどとりあえず使いたい」という場合はextendのみを設定するだけでも動作します。これは、extendされた結果必要なプラグインが勝手にpluginsに追加されて読み込まれるからです。

纏めると、「とりあえずそのプラグインのデフォルト設定を使いたい」という場合はextendに記述、「ルールを読み込んで自分で設定したい」という場合にはpluginsに記述します。

下手に何でもかんでもextendしてしまうと、気づかないうちに変な設定が追加されているなんてことも起こり得ます。

### Prettierと連携する上で必ず使うプラグイン

- `eslint-config-prettier` ESLintに存在するスタイリングに関する設定を無効化してくれます
- `eslint-plugin-prettier` ESLint経由でPrettierを実行してくれます

Prettier公式より、`prettier-eslint`なるものが公開されていますが、これはPretteir経由でESLintを実行してくれるものです。

正直使いにくく、使うメリットもわからないので使いません。

### TypeScript対応

ESLintは名前の通りECMA Script用のリンタなのでデフォルトではTypeScriptに対応していません。

そこで、TypeScript専用のプラグインとルールを設定することでTSでESLintを動かします。

- `@typescript-eslint/eslint-plugin` TS用のルールを追加してくれます
- `@typescript-eslint/parser` TSの構文を読み込むためのパーサー

### Config

最終的に以下のような設定ファイルになります。

```js
{
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "parserOptions": {
        "sourceType": "module"
    },
    "root": true,
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "warn"
    },
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "extends": ["plugin:@typescript-eslint/recommended"],
            "plugins": ["@typescript-eslint"],
            "parser": "@typescript-eslint/parser",
            "rules": {
                "@typescript-eslint/no-non-null-assertion": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["error"]
            }
        }
    ]
}
```

## Prettier

Prettierはコードのフォーマットを行うためのツールです。ESLintほど複雑な設定は必要ありません。

なんとなくですが、Prettierの設定にはESM対応のjsファイルである`.prettierrc.mjs`を使っています。

スキーマの設定をすること無く型ヒントを使えるのでこちらがおすすめです。

```js
/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    singleQuote: false,
    trailingComma: "all",
    semi: true,
    endOfLine: "lf",
};
```

ここらへんの設定は完全に好みですね。
