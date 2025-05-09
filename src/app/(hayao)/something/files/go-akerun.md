---
title: "go-akerun"
date: 2025-01-08
draft: false
description: "Akerun API v3をGolangから利用するためのライブラリ"
---

## Go Akerun

[`go-akerun`](https://github.com/Hayao0819/go-akerun)はAkerunのAPIをGolangから利用するためのライブラリです。

Akerunの開発・運営会社である[Photosynth Inc.](https://photosynth.co.jp/)に所属している[Yoshihiro Shimada](https://x.com/yshimada0330?)さんが開発したライブラリである[yshimada0330/go-akerun](https://github.com/yshimada0330/go-akerun)をフォークし、対応エンドポイントを追加したものです。

Shimadaさんのリポジトリへも一部プルリクエストを送っていますが、テストを書くのが面倒という理由でほとんどのエンドポイントは自分のリポジトリに追加したきり放置しています。

### 追加した機能

2025年1月8日現在での本家様との比較です。今後の更新で上流に追加される可能性もあります。

- Akerunグループに関するエンドポイント
  - 一覧取得
  - 詳細取得
  - 作成
  - 更新
  - 削除
  - ドア追加
  - ドア削除
- ユーザーに関するエンドポイント
  - 一覧取得
  - 詳細取得
  - 登録
  - 招待
  - 更新
  - 退室
- 合鍵
  - 一覧取得
  - 詳細取得
  - 作成

### 追加予定の機能

近々追加します。テストの作成とプルリクエストの送信は行うかわかりません。

- 合鍵
  - 更新
  - 削除
- グループ合鍵
  - 一覧取得
  - 詳細取得
  - 作成
  - 更新
  - 削除
- 履歴
  - 一覧取得

### 実装するかわからないもの

現在私の関わっているプロジェクトで利用予定が無いため、追加するかわかりません。

- 遠隔操作
- ICカード
- ユーザーグループ
