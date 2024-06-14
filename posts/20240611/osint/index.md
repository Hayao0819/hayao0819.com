---
title: DIVER OSINT CTF Writeup
description: ""
date: 2024-06-11T00:05:01.2481875+09:00
categories:
    - 技術系
tags:
    - OSINT
draft: true
publish: true
---

2024年6月8日~9日に開催されたDIVER OSINT CTFに参加してきました。初参加で28位というそれなりの記録を残すことができて個人的には非常に嬉しいです。

というわけで人生初のWriteupというものを書いてみようと思います。今回はチーム全体でのWriteupということで、ハヤオ以外が書いている部分もありますが、代表して僕のブログで公開させていただきます。

## welsome/welscome

ルールに書いてあるフラグを入力して終了です。頑張ろう‼

`Diver24{ganbarou!}`

## misc/number

<hr />
この車両の持ち主に連絡を取りたい。電話番号を調べてもらえないだろうか。  
[画像](https://drive.google.com/file/d/18TRhynWp9TIWAcNRQDxiBVQQ-zhey1VG/view?usp=drive_link)
<hr />

最初はこの場所の住所を特定した。写っている交番は[赤坂警察署 赤坂九丁目警備派出所](https://maps.app.goo.gl/SP7Bm34sS5dxwfUv9)である。

が、そんなことは一切関係なく写真に写っているナンバーは外交官ナンバーである。

外交官ナンバーについて知らなかったので調べてみると、[こちらのサイト](https://warmheart0159.hatenablog.com/entry/2017/06/06/162406)がヒットした。どうやらナンバーの先頭2桁で国がわかるらしい。

今回は49のため、クウェートのナンバーであった。しかし国はわかっても電話番号はわからない。

試しにクウェートの大使館の電話番号を入力すると、そのまま正解となった。

## misc/wumpus

<hr />
とあるDiscordサーバにFlagが投稿されたぞ！本問に限って、ターゲットに接触を試みても大丈夫だ。  
![画像](./PXL.jpg)
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
![画像](./label.jpg)
<hr />

宛先だけ見事に敗れた荷物がある。最初はこの荷物と同じ形式のラベルを貼っている運送会社を調べたり、追跡番号を様々なサイトで検索してみたのだがヒットしなかった。諦めかけていたときに、なんとなくQRコードを読み取ると、ガッツリと住所が書いてあった。

最初にこのQRコードを読み取らなかったのは、勝手に自分の中で「どうせ追跡番号しか載ってないだろう」と考えてしまったためである。反省。

## military/osprey1~3 (by figaro)

https://qiita.com/Figaro-san/items/7aa220472eff06849824#military--osprey1

## introduction/246 (by figaro)

https://qiita.com/Figaro-san/items/7aa220472eff06849824#introduction--246

## introduction/office

<hr />
ファイルから得られるFlagを入力してください。  
[https://drive.google.com/file/d/1VOZPbwYzoynoNCW3SR5_cHRvPiXUx9lI/view?usp=drive_link](https://drive.google.com/file/d/1VOZPbwYzoynoNCW3SR5_cHRvPiXUx9lI/view?usp=drive_link)
<hr />

リンク先にはODFファイル(Open Document Format)がおいてある。これはMicrosoft Wordのようなドキュメントソフトウェアで利用できるファイル形式であり、docx(Microsoft Office形式)と同様にzipファイルとして展開できる。

展開すると`Thumbnails/thumbnail.png`という一見サムネイル画像のようなものが見つかるが、これが実際の文書のサムネイルから差し替えられている。

この画像の中にフラグが書かれている。

## introduction/chain

TODO:

## introduction/dream (by figaro)

https://qiita.com/Figaro-san/items/7aa220472eff06849824#introducion--dream

## introduction/serial (by figaro)

https://qiita.com/Figaro-san/items/7aa220472eff06849824#introduction--serial

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

## geo/imagetrack

<hr />
画像の撮影された郷土料理屋の店名を答えよ。  
[画像](https://drive.google.com/file/d/1R_BClVaJc1tv5UXvqIR8OdF7OE0UoBcf/view?usp=drive_link)
<hr />

最初にこの「open air brewing」という銘柄を調べたが、蒸留所がヒットするのみで郷土料理店は見つからなかった。

![GPS](image.png)

macOSのプレビューでGPS情報を見ると緯度経度が出てくるので、この値を調べて完了。

## geo/chiban

<hr />
画像の中央に写っている道路の地番は何か。  
[画像](https://drive.google.com/file/d/124CUGWBbMWwqGTrvNrEOkrst3s1y9uEB/view?usp=drive_link)
<hr />

まず地番がわからないので調べる。[このサイト](https://www.home4u.jp/sell/juku/course/basic/sell-432-33017)によると登記簿上で扱われる数字らしい。なんとなくわかったので、実際に住所を特定する。

画像の住所特定においてヒントになるのは、「サンディ 7号店」と「明光義塾」「岡田歯科医院」程度である。

7号店というのは出店した順番らしいが、検索してもなかなかヒットしない。`サンディ "7号店"`と引用符つきで検索すると[アルバイト募集EX](https://kyujin.arubaito-ex.jp/jobs/247782038)より「双葉店」であることがわかる。

住所がわかったところで、今度は地番を探さなければならない。ほとんどの検索サービスは有料か資料請求が必要であったが、こちらの[地番検索くん](https://chiban-kensaku.com/)より見つけることができた。

検索した結果が「筆界未定地-6」だったので文字的に少々怪しかったのだが、無事に正解だった。

## geo/championships (by バンダナ無しワドルディ)

<hr />
2010年10月、この場所には大会の広告が貼られていた。その大会の優勝者のニックネームを答えよ。
<hr />

画像を確認するとモール内の写真のようだ。看板には繁体字が書かれており、台湾っぽいことがわかる。読み方も入力の方法もわからないのでGoogle LensのOCR機能を使用してテキスト化する。検索すると「光華商場」という台湾のモールがヒットするが、しばらく前にリニューアルしたのかわからないが建物に連続性が無いようだ。その後はGoogleストリートビューの過去の記録を漁っていたが、内部を撮影したもので指定された日時に近いものは無かった。方針を転換し、Google画像検索で「光華商場 after:2010-9-1 before:2010-11-1」と期間指定して検索すると雰囲気の違う画像とともにGIGABYTE GO OC 2010がヒットするので、これであろうとあたりをつけて検索してやると[GIGABYTE Announces GO OC 2010 Worldwide Final Champion](https://www.gigabyte.com/Press/News/937)が見つかり、これに掲載されているリーダーボードの一位を入力するとCollect.
