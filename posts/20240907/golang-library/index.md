---
title: 個人的に最強なGolang開発用テンプレート
description: ""
date: 2024-09-07T10:38:02.163146+09:00
categories:
    - 技術系
tags:
    - Golang
draft: false
publish: true
---

Golangを1年弱ほど触り、いろいろな開発をしているうちに結構よく使う構造とライブラリが顕著なことがわかってきました。

そこで今回は自分が作成したテンプレートを載せてみようと思います。自分が立ち上げたGoのプロジェクトだと殆ど利用していると思います。

なお、今回のテンプレートは[こちら](https://github.com/Hayao0819/scaffold/tree/master/go-cobra)で公開されています。

## 概要

引数解析には[Cobra](https://github.com/spf13/cobra)と[CobraUtils](https://github.com/Hayao0819/nahi/tree/master/cobrautils)を利用します。

エラーハンドリングには[cockroachdb/errors]("https://github.com/cockroachdb/errors")を、ロギングには[log/slog](https://pkg.go.dev/log/slog)と[m-mizutani/clog](https://github.com/m-mizutani/clog)を用います。

Cobraはサブコマンドを実装するためのライブラリです。`cobra.Command`という構造体のインスタンスを生成することで各サブコマンドを作成します。

公式で用意されているサンプルは可読性が低い上にテストを実装しにくいため、様々な試行錯誤を行った結果現在では自前のラッパーを利用した形式に落ち着いています。

ロギングは標準ライブラリである`log/slog`と、`slog`を見やすい形式にしてくれるライブラリである`m-mizutani/clog`を利用します。

## 全体

例えば、`hello`コマンドと`bye`を実装しする場合、概ね以下のような形式になります。

今回はモジュール名を`myproject`とします。

```txt
├── cmd
│   ├── hello
│   │   └── cmd.go
│   ├── bye
│   │   └── cmd.go
│   ├── hello.go
│   ├── bye.go
│   ├── exe.go
│   └── root.go
├── log
│   └── log.go
└── main.go
```

## main

`main`に配置するのは`main.go`のみです。

### /main.go

`main.go`は主にCobraをラップした`cmd`パッケージの起動と最終的なエラーハンドリング、ログ設定を行います。

エラーの出力をこのように行っている理由については後述します。

```go
package main

import (
    "fmt"
    "os"

    "myproject/cmd"
    _ "myproject/log"
)

func main() {
    if err := cmd.Execute(); err != nil {
    fmt.Fprintf(os.Stderr, "%+v\n", err)
    os.Exit(-1)
    }
}
```

## myproject/log

ここではロギングに関する設定を行いますが、`main`以外からこのパッケージを呼び出すことはありません。

また、パブリックな関数や変数も一切作成しません。代わりにimportされたときに`log/slog`の初期設定を行います。

### /log/log.go

```go
package log

import (
    "log/slog"

    "github.com/m-mizutani/clog"
)

func init() {
    handler := clog.New(clog.WithColor(true))
    logger := slog.New(handler)
    slog.SetDefault(logger)
}
```

`slog.Info`や`slog.Debug`のような関数は内部ではデフォルトに設定されたロガーを呼び出しているという実装になっています。

その内包されたロガーは`slog.SetDefault`で自由に設定できます。

`m-mizutani/clog`は、色がついたいい感じのログハンドラを作成してくれるライブラリです。`clog`によって作成されたハンドラを用いてロガーを作成し、それを`slog`のデフォルトロガーに設定することで、`slog.Info`等の呼び出しを`clog`のハンドラで処理することができるようになります。

更に自前のハンドラを追加したりログレベルを変更したりするなど、`slog`の設定の変更は全てこの中で行います。

`init`関数は、そのパッケージがimportされた際に自動で実行される関数で、このモジュールを`main.go`から呼び出すことでこの初期化処理を行います。

## myproject/cmd

各サブコマンドを実装するパッケージです。

Cobraのテンプレートでは各コマンドをグローバル変数として実装していますが、この方法だとテストを書くのが苦しいので`cobra.Command`のインスタンスを返す関数という形でサブコマンドを実装します。

Cobraにおいてはサブコマンドは`cobra.Command`を入れ子にするという形で実装します。そのためまずは全体を統括する`root`を実装します。

### /cmd/root.go

```go
package cmd

import (
    "github.com/Hayao0819/nahi/cobrautils"
    "github.com/spf13/cobra"
)

var subCmds = cobrautils.Registory{}

func rootCmd() *cobra.Command {
    root := cobra.Command{
        Use:           "go-cobra",
        Short:         "go-cobra command",
        SilenceUsage:  true,
        SilenceErrors: true,
    }

    subCmds.Bind(&root)
    return &root
}
```

### /cmd/exe.go

cmdパッケージで唯一パブリックになるのがこの`Execute() error`関数です。

`rootCmd() *cobra.Command`のインスタンスを生成し、`Execute()`メソッドを実行します。

```go
package cmd

func Execute() error {
    return rootCmd().Execute()
}
```

### /cmd/hello/cmd.go, /cmd/bye/cmd.go

これらのファイルでは各コマンドの実体を定義します。

```go
package hello

import "github.com/spf13/cobra"

func Cmd() *cobra.Command {
    cmd := cobra.Command{
        Use:   "hello",
        Short: "hello command",
        RunE:  func(cmd *cobra.Command, args []string) error {
            // Do something
            cmd.Println("Hello, hoge!")
            return nil
        },
    }

    return &cmd
}
```

どちらのファイルでも`Cmd() *cobra.Command`をエクスポートしておきます。

サブコマンドを各パッケージに分割することで、`cobra.Command.RunE`の肥大化を避け、そのサブコマンドでしか利用できないプライベート関数や変数を定義できるようにします。

### /cmd/hello.go, /cmd/bye.go

各サブコマンドをrootコマンドに結びつけるグルーコードです。

```go
package cmd

import "github.com/Hayao0819/scaffold/go-cobra/cmd/hoge"

func init() {
    subCmds.Add(hoge.Cmd())
}
```

## エラーハンドリング

各コマンドで`os.Exit`を呼び出すようなことは絶対にせず、必ず全てのエラーがrootに返されるように実装します。

具体的には各`cobra.Command`に実装される処理は`cobra.Command.Run`ではなく`cobra.Command.RunE`にします。

各RunEでは、エラーが出た時にそれをWrapしつつreturnします。具体的には以下のようになります。

```go
package hoge

import (
    "os"

    "github.com/cockroachdb/errors"
    "github.com/spf13/cobra"
)

func Cmd() *cobra.Command {
 cmd := cobra.Command{
    Use:   "hoge",
    Short: "hoge command",
    RunE: func(cmd *cobra.Command, args []string) error {
        // Do something
        cmd.Println("Hello, hoge!")

        // Handle error
        pwd, err := os.Getwd()
        if err != nil {
            return errors.Wrap(err, "failed to get current directory")
        }

        cmd.Println(pwd)

       return nil
    },
    }

    return &cmd
}
```

そしてエラーを全て`cmd/Execute() error`に帰結させます。

最終的に`main()`まで返されたエラーは

```go
fmt.Fprintf(os.Stderr, "%+v\n", err)
```

で標準エラー出力に出力されます。

cockroachdb/errorsでは`%+v`でerrを渡すことでスタックトレースが出力されるようになります。

唯一の課題は、スタックトレースと`slog`を現状併用できないという点です。この点は気が向いたら`cockroachdb/errors`にIssueを出してみようと思います。

## samber/lo

今回のテンプレートには登場しませんが、頻繁に使用するライブラリが[samber/lo](https://github.com/samber/lo)です。

ジェネリクスを利用してForEachやMap、Filter等が実装されているユーティリティ系のライブラリです。

自分が一時期Tsをたくさん書いてた時期があるせいか、Go特有のなんでもforを愚直に回すコードよりもloを使ったほうが好きです。

## 終わり

Goのエラーハンドリングは少々特殊ですが、スタックトレースが表示されるようになると劇的に実装が楽になります。

また、Cobraの実装も人によって差があるようでQiitaやZenn等にいろいろな人のサンプルが実装されています。

私のこの現状の結論も、いろいろな人のものを参考に試行錯誤をしてたどり着いたものです。今後また新しいライブラリやデザインパターン等で変化があった際にはこの記事を更新しようと思います。
