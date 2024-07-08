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

<Tweet tweetId="1767515646286549226" />

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

チーム全員で鳥貴族の公式サイトから、

- 4階
- ４階
- 4F
- ４Ｆ
- ４F
- 4Ｆ

を片っ端から探しました。

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

## crypto/leak (by わにゃ)

<hr />
「先月、日本会社大規模なBTCの不正流出が起きた。流出となっているウォレットアドレスを答えよ。」
<hr />

"5月 BTC 流出" とgoogle検索するとDMMビットコインの流出記事がヒットする。なので、DMMビットコインの流出先を調べれば良い。
"DMM 流出" と検索すると [DMMビットコインの不正流出（2024/5/31)](https://note.com/valuesharing/n/ncfdf4ddfa0b6) という記事が見つかった。
この記事を読むと流出先アドレスが記載されており、これがフラグである。

## history/promoter (by わにゃ)

<hr />
「画像に写っている池沼を開拓した発起人の父親の命日を答えよ。」
<hr />

Google Lens で画像検索を行うと、[愛知旅行1日目は博物館明治村と名古屋ひつまぶし](https://lee3900777.muragon.com/entry/2655.html) という記事に行き着く。
この記事の情報から問題の画像の池は入鹿池であることがわかった。wikipediaで入鹿池について調べると

> 江崎 善左衛門 了也（えさき ぜんざえもん、文禄2年（1593年） - 延宝3年（1675年））は、春日井郡小牧村生まれの浪人。
> 幼名新四郎。父江崎善左衛門宗度（享禄3年（1530年） - 寛永4年（1627年））、寛永元年（1624年）に善左衛門はその跡を継いだ。
>
> 寛永5年に発起人となり、入鹿池の造成に尽力、入鹿池完成後は入鹿新田頭に任命され、新田開発に勤しんだ。

とあり、発起人の父親は江崎善左衛門宗度であることがわかる。この人物の命日を調べれば良いのだが、
"江崎善左衛門宗度"で検索をしてもそれらしい資料はヒットしなかったので、"江崎善左衛門" で検索をおこなった。
すると、[徳川義直と六人衆](https://www.jsidre.or.jp/wordpress/wp-content/uploads/2016/03/49-7.pdf) という資料がみつかる。
この資料に江崎善左衛門についての記述があり、

> 寛永4年(1627) 11月13日に病没した。

とある。これがフラグである。

## transportation/youtuber (by わにゃ)

<hr />
「2023年、あるYouTuberが日本で無賃乗車や無銭飲食を行い、その様子を投稿したことで問題となった。
彼は日本である列車に無賃乗車をしていたところ、九州地方のある駅で一度捕まったが、そのまま逃走して別の列車に再び無賃乗車をした。
彼が捕まった駅と、乗り継いだ列車の列車番号を教えてほしい。なお、列車番号は時刻表に掲載されている形式で回答せよ。
<hr />

"無賃乗車 youtuber" で検索すると [日本で無賃乗車、動画公開したユーチューバーに批判殺到「そんなつもりはなかった」と謝罪](https://www.bbc.com/japanese/67247960) の記事がみつかる。

この記事でこのyoutuberの名前がフィディアスという名前であることがわかったので、youtubeで"フィディアス無賃乗車"で検索すると
[FIDIAS: I Travelled Across Japan For Free! (REUPLOAD) | ARRESTED IN JAPAN!](https://www.youtube.com/watch?v=YzUDKBolwXY) という動画が見つかる。

この動画で、フィディアスが警察に捕まるシーンがあり、その直後にフィディアスが新幹線を乗り換えるシーンがあり、この際に次の駅が博多駅であり、
乗り換えた列車は列車番号572の「さくら」であることがわかった。

よって、[時刻表](https://www.jrkyushu-timetable.jp/sp/2406/0010/00105101.html?t=2900700&d=20240614) を参考にすると捕まった駅は博多駅の一つ前の駅の新鳥栖駅であることがわかった。

列車番号は572であることがすでわかっているが、フラグの形式の正規表現とマッチしないので、さくらの列車番号についてさらに調べると
[列車番号 | 新幹線](https://nomiyajunin.web.fc2.com/retsuban/shinkansen.html) というサイトを発見した。
これを参考に列車番号が572Aであることがわかった。
