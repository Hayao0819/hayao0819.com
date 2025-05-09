---
title: ArchLinuxのリポジトリ構築の現状
description: ""
date: 2025-05-09T10:30:02.02936486+09:00
categories:
    - 技術系
draft: false
publish: true
---

最近またArch Linuxの世界に戻ってきました。一時期NixやGentooに浮気していましたが、結局ここが一番落ち着きます。故郷。

そんなわけで数年前からの悲願だったPacmanリポジトリの構築作業をやっています。

## 既存のサーバー候補

Pacmanリポジトリは単なるバイナリをHTTPでサーブするだけのシンプルな構造ですが、構築とメンテナンスを手作業で行うのはかなり苦しい作業です。

これらの作業を自動化するツールはいくつか紹介しますが、どれも一長一短なのが現状です。

### ArchLinux公式

公式のリポジトリ管理ツールです。おそらく見逃しているリポジトリもあると思いますが、私はこれらしか見つけられませんでした。

殆どがArchLinuxらしくシェルスクリプトで書かれています。

かなり複雑で、なかなか導入するのは難しいのが現状です。複数のコンポーネントに分割されています。

- [archweb](https://github.com/archlinux/archweb) パッケージの状態を表示・検索できるフロントエンド部分
- [contrib](https://github.com/archlinux/contrib) パッケージの管理を行うための小さいスクリプトの集合
- [repro](https://github.com/archlinux/archlinux-repro) 配布されているバイナリの再現性を検証するスクリプト
- [infrastructure](https://github.com/archlinux/infrastructure) インフラ全体の管理
- [devtools](https://github.com/archlinux/devtools) chroot環境下で`makepkg`を実行するためのスクリプトの集合

### lilac

かのarchlinuxcnのリポジトリ管理を行っているスクリプトです。Pythonで書かれています。

archlinux上にベアメタルでの実行が前提となっており、サーバーとしての運用はなかなか難しいと判断しました。

- [ソースコード](https://github.com/archlinuxcn/lilac)
- [ドキュメント](https://lilac.readthedocs.io/en/latest/index.html)

導入を検討していた当時はドキュメントが中国語しかなく、[Issue](https://github.com/archlinuxcn/lilac/issues/180)を立てました。

他にも構築の際にトラブルがあり、なかなか構築がうまくできず断念しました。

### ahriman

WebUIから自動更新、自動ビルドまで何でも兼ね備えたリポジトリマネージャーです。

自分の環境において動かないことが何度もありましたが、Issueを建てるとすぐに対応・修正してくれました。

- [ソースコード](https://github.com/arcan1s/ahriman)
- [ドキュメント](https://ahriman.readthedocs.io/en/stable/)

コンテナ上での実行もサポートされていますが、lilacと同様サーバー側でパッケージのビルドを行うのでメンテナンスが面倒だなぁという気持ちもあります。

### blinky

ビルドされたパッケージバイナリをサーブするだけのシンプルな実装のリポジトリサーバー。Goで書かれています。

バックエンドの`blinkyd`とフロントエンドの`blinky`で構成されており、`blinky upload`コマンドでバイナリをサーバーに投げます。

サーバー側では`repo-add`コマンドが実行され、リポジトリデータベースを更新してHTTPでリクエストを待ちます。

シンプルな実装で、サーバー側のOSも限定されない(`repo-add`の実行のため現状の公式コンテナはArchLinuxになっていますが、仕組み上Pacmanさえあれば任意の環境で動作するはずです)ため、現在ではこれを用いて構築しています。

一方で、WebUIが貧相だったり([トップページのHTML](https://github.com/BrenekH/blinky/blob/dc156eb662a6f52ab98c41ea792af17ed2e66b8a/cmd/blinkyd/main.go#L161-L198))、監視や自動更新等の機能は一切ありません。

最大の欠点として、`x86_64`にしか対応していないという問題があります。[こちらのIssue](https://github.com/BrenekH/blinky/issues/21)で作業を進めていますが、実装にはもう少し時間がかかる見込みです。

## 新しくKamisatoを開発中

前述のBlinkyをベースに機能拡張を図ったものを開発中です。

コンセプトはblinkyのシンプルな実装を踏襲し互換性を維持しつつ、ArchLinuxへの依存を最小限に抑え安定動作を実現することです。

Kamisatoは以下のコンポーネント郡で構成されています。

### Ayaka(CLIツール)

blinkyのコマンドラインフロントエンドを拡張し、ローカルでのビルドとアップロードを自動化したのが[Ayaka](https://github.com/Hayao0819/Kamisato/tree/master/ayaka)です。現時点の実装ではArchLinux上での動作に限定していますが、将来的には任意のLinux上で動作するように拡張するつもりです。

### Ayato(APIバックエンド)

当初は`ayaka`だけの実装のつもりでしたが、現在の`blinkyd`には前述した複数アーキテクチャへの非対応という問題があります。そこで、`blinkyd`のアーキテクチャと設計を踏襲しつつGinで全体を書き直しているのが[Ayato](https://github.com/Hayao0819/Kamisato/tree/master/ayato)です。

`blinkyd`と互換性のあるエンドポイントを持ち、複数アーキテクチャへの対応を行っています。また、パッケージのメタ情報や詳細を参照するエンドポイントの開発も予定しています。
現時点では`ayaka`は`blinkyd`をバックエンドとして利用していますが、最終的には`ayato`バックエンドにも対応予定です。

### Lumine(Webフロントエンド)

`blinkyd`ではGo内に手書きHTMLが直打ちというフロントエンドしか備えていませんでしたが、検索や詳細参照はやはり必要という考えにより`lumine`というウェブフロントエンドも開発予定です。`ayato`の拡張されたエンドポイントを元にパッケージ一覧を表示します。Next.js+shadcn/uiで開発されています。

## 終わり

2021年ごろから延々と逃げ続けてきたリポジトリサーバー問題ですが、ようやく納得のいくアーキテクチャ(構成の意)が決まりました。

バイナリをS3に上げる等の実装は時間があればやりたいなぁと思いつつ面倒なので多分やりません。

一方で研究も忙しくなっており、いつ頃に完成するかわかりませんが温かい目で見守っていただけると助かります。

## おまけ

[Zash](https://github.com/Hayao0819/zash)という自作シェルを始めました。

まだリダイレクトもパイプも無いハリボテですが、ちまちまと作っています。構文解析難しい……
