---
title: Goのslogで色を付けつつファイルにも出力する
description: ""
date: 2024-09-09T17:07:33.523941+09:00
categories:
    - 技術系
tags:
    - Golang
draft: false
publish: true
---

最近、Goに`log/slog`という構造化ロガーが登場し、InfoやDebugなどのラベル付けやグループ分けをするロギングが簡単にできるようになりました。

slogは単体ではまだ少々貧弱ですが、非常に柔軟性の高いインターフェースを実装しているので外部ライブラリによって使いやすくすることができます。

今回は私がよく使っている2つのライブラリを組み合わせます。

## 色を付ける

[`github.com/m-mizutani/clog`](https://github.com/m-mizutani/clog)はカラフルでConfigurableな`slog.Handler`を実装しているライブラリです。なんと日本人の方が作っています。

細かい使い方は作者さんがZennで紹介されているので、そちらを御覧ください。

[Go公式の構造化ロガー（予定）のslogの出力を見やすくしてみる](https://zenn.dev/mizutani/articles/golang-clog-handler)

## 複数のHandlerに対応する

`log/slog`は現状1つのLoggerにつき1つのHandlerしか対応していません。そのため複数箇所に出力をしたいという場合には、専用のHandlerを作成する必要があります。

[`github.com/samber/slog-multi`](https://github.com/samber/slog-multi)は複数のHandlerをまとめ上げて1つの新しいHandlerを生成してくれるライブラリです。

余談なのですが、自分がよく使っている`github.com/samber/lo`というForEachやFilterを提供してくれるライブラリと同じ作者のもので非常にびっくりしています。

## 組み合わせる

これら2つを組み合わせます。`clog.Handler`は`slog.Handler`を実装しているので、簡単に組み合わせて使えます。

```go
package main

import (
	"log/slog"
	"os"

	"github.com/m-mizutani/clog"
	slogmulti "github.com/samber/slog-multi"
)

func coloredLogger() slog.Handler {
	handler := clog.New(clog.WithColor(true))
	return slog.Handler(handler)
}

func fileLogger(f *os.File) slog.Handler {
	return slog.Handler(slog.NewTextHandler(f, nil))
}

func handleError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	f, err := os.Create("log.txt")
	handleError(err)
	defer f.Close()

	singleHandler := slogmulti.Fanout(
		coloredLogger(),
		fileLogger(f),
	)

	logger := slog.New(singleHandler)
	slog.SetDefault(logger)

	slog.Info("Hello, world")
	slog.Warn("Hello, world")
	slog.Error("Hello, world")
}
```

2つの外部パッケージがここまでいい感じに組み合わさるのも、`log/slog`の柔軟な型定義のおかげ。

非常にいい感じでかっこいいロギングができるので参考になれば良いなと思います。
