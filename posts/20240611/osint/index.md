---
title: DIVER OSINT CTF Writeup
description: ""
date: 2024-06-11T00:05:01.2481875+09:00
categories:
    - 技術系
tags:
    - OSINT
draft: false
publish: true
---

2024年6月8日~9日に開催されたDIVER OSINT CTFに参加してきました。初参加で28位というそれなりの記録を残すことができて個人的には非常に嬉しいです。

というわけで人生初のWriteupというものを書いてみようと思います。今回はチーム全体でのWriteupということで、ハヤオ以外が書いている部分もありますが、代表して僕のブログで公開させていただきます。

## welsome/welscome

ルールに書いてあるフラグを入力して終了です。頑張ろう‼

`Diver24{ganbarou!}`

## misc/wumpus (By ハヤオ)

<hr />
とあるDiscordサーバにFlagが投稿されたぞ！本問に限って、ターゲットに接触を試みても大丈夫だ。  
[画像](./PXL.png)
<hr />

URLをそのまま読み取って開いても権限エラーで何も表示されませんでした。

読み取ったURLは`discord.com/channels/1244302408402735114/1244302408402735117`

このURLのパス名の一部である`1244302408402735114`というのはサーバを示す一意な文字列らしく、検索すると以下のサイトのみがヒットしました。

[https://discordservers.com/server/1244302408402735114](https://discordservers.com/server/1244302408402735114)(2024年6月11日時点で削除済み)

Discordのサーバ一覧をまとめている非公式なサイトのようです。このサイトの右側に招待リングがあり、そこからサーバに参加してFlagを取得できました。

## misc/timestamp

<hr />
"53" と塗装されている航空機の写真が撮影された日時を答えよ。
<hr />

<Tweet id="1767515646286549226" />

この問題は「3月12日 y-9 h-6」と検索すると以下のPDFが検索にヒットする。

[https://www.mod.go.jp/js/pdf/2024/p20240312_01.pdf](https://www.mod.go.jp/js/pdf/2024/p20240312_01.pdf)

このPDFのメタ情報を調べるとMicrosoft Office Word 2019で作成されていることがわかる。

[pdfimages](https://docs.oracle.com/cd/E75431_01/html/E71065/pdfimages-1.html)というコマンドラインツールを用いてPDFに埋め込まれている画像を展開すると、トリミングされる前の画像を見つけ出すことができた。

Wordでトリミングした場合トリミングは文書上でのみ行われ、データそのものには影響しないらしい。

トリミング前の画像には撮影日時ががっつりと埋め込まれているので、これがFlagとなる。

## misc/label

<hr />
この荷物の宛先として考えられる施設の郵便番号を教えてほしい。  
[画像](./label.jpg)
<hr />

宛先だけ見事に敗れた荷物がある。

## introduction/office

<hr />
ファイルから得られるFlagを入力してください。  
[https://drive.google.com/file/d/1VOZPbwYzoynoNCW3SR5_cHRvPiXUx9lI/view?usp=drive_link](https://drive.google.com/file/d/1VOZPbwYzoynoNCW3SR5_cHRvPiXUx9lI/view?usp=drive_link)
<hr />

リンク先にはODFファイル(Open Document Format)がおいてある。これはMicrosoft Wordのようなドキュメントソフトウェアで利用できるファイル形式であり、docx(Microsoft Office形式)と同様にzipファイルとして展開できる。

展開すると`Thumbnails/thumbnail.png`という一見サムネイル画像のようなものが見つかるが、これが実際の文書のサムネイルから差し替えられている。

この画像の中にフラグが書かれている。


## introduction/ad_directiare

<hr />
この名刺の人物が、東京出張時に食べた昼ご飯の値段を答えよ。  
[画像](https://drive.google.com/file/d/1RX9-gJdYXLwSPKsCJa9Z8W5e_co8VShT/view?usp=drive_link)
<hr />

名刺には「よねくらデザイン事務所」という名前やその事務所の住所、「yone.jun」という名前、「yune.jun.0727@gmail.com」というメールアドレス等が見える。

撮影場所はコメダ珈琲のようだが、今回の問題ではこの撮影場所は重要ではない。

住所は途中で見切れているため、`600-8216`という郵便番号をもとにストリートビューと衛星写真で事務所の特定を行おうとした。が、「よねくらデザイン事務所」という名前の事務所は存在しなかった。

また、InstagramやTwitterにおいてyone.junという名前や、おそらく本名と推定される「よねくらじゅん」を用いても情報を得ることができなかった。

ここまでで調査手段を失ってしまい苦戦していたところ、先輩から「[GHunt](https://github.com/mxrch/GHunt)」というツールを紹介してもらった。

Pythonで書かれたツールでGMailから様々な情報を取得できるらしい。

早速Linux環境にリポジトリをcloneし、ツールを実行。初期セットアップでトークンの取得を行う必要があるのが少々面倒だった。

```bash
python3 ./main.py email yune.jun.0727@gmail.com
```

を実行すると[Google Mapのレビュー](https://www.google.com/maps/contrib/104607974422086075165/reviews)が1件のみヒットした。

このレビューでは「伊勢定 大丸東京店」という鰻屋で4400円のうな重を食べていることがわかるため、これが Flagとなる。
