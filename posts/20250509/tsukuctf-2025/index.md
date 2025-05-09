---
title: TsukuCTF 2025 Writeup
description: ""
date: 2025-05-09T11:26:09.345766319+09:00
categories:
    - 技術系
tag:
    - CTF
draft: false
publish: true
---

MWS Cupのメンバーの一部でTsukuCTF 2025に参加しました。

チームのメンバーがつよつよだったので、私の参加したチームTousekiは1575ポイントで48位でした。

私が解いたのはOSINTカテゴリーだけです。最後の`hidden_wpath`だけ解くことができず、Webカテゴリの勉強不足を実感しました。

以下私のWriteUpです。

## Casca

画像検索をするとこのサイトが引っかかる。

https://gourmet-travelogue.doorblog.jp/archives/56226093.html

ここで記念碑の内容を確認できたので、色々キーワードを検索していく。

`大塚実氏 顕彰碑`で検索していくと、以下のサイトがヒットした。

https://www.city.atami.lg.jp/kosodate/shogaigakushu/1011165/1006016/1009091/1009101.html

ここの石碑の日付かと思ったが、違った。

https://hashikazu.org/archives/12598

最終的に、上記にある日付が正解だった。

かかった時間は10分ほど。

Flag: `TsukuCTF25{2014/06/06}`

## Curve

画像検索すると以下のサイトがヒット。

https://ameblo.jp/umaleeno/entry-12876405935.html

横浜ランドマークタワーにあるらしいのでそのドメインを入れてみる。

Flag: `TsukuCTF25{yokohama-landmark.jp}`

履歴を見ると2分で回答していた。

## schnee

画像検索より以下のサイトが引っかかる。

https://niyodogawa.org/blog/outdoor/car/etc/64737/

雰囲気が似ていたのでスイスのグリンデルワルトと仮定して更に検索。

https://note.com/backpackerdocto/n/nfd5a81f44a23

このブログで設問と同じ建物の別画角の写真があることを発見。これにより`Buri Sport`というキーワードをゲット。

Mapで調査をしていくと、このスポーツ屋は3軒あることがわかったので順番に見ていく。

https://maps.app.goo.gl/sQM1JivgD1WMHbV78

この店舗の見た目が一致したので、ストリートビューで立ち位置を微調整して提出完了。

最終的な立ち位置はここ。<https://x.gd/osX4k

回答にかかった時間は20分弱。

Flag: `TsukuCTF25{46.624_8.040}`

## building

画像全体を画像検索に書けると虎ノ門ヒルズ 森タワーがヒットするが、周辺のストリートビューを見ても似たような風景は見つからず。

中央に写っているビルをトリミングして画像検索をしてあげると、ロイヤルスパーク品川であることがわかる。

ここから川を渡って少し向かった交差点が撮影場所と断定。

かかった時間は15分。虎ノ門ヒルズにかなり時間を取られてしまった。

Flag: `TsukuCTF25{35.6318_139.7431}`

## power

文字情報と風景情報が一切無いので、点字を読む方針に切り替え。

GeminiやChatGPTに投げてみるも点字を読む機能は残念ながら無いらしい。

いくつか調べて最終的に以下のサイトで解読を開始。

http://antagata.g3.xrea.com/cgi-bin/tenji.cgi

左セクションの先頭2行を打ち込んでいくと、以下の文章となった。点字の区切りがわかりにくかったり手打ちで写したため誤字があるかもしれない。

`トーアコートシテイアクーセキマサカドツカショノトチ`

キーワードは「トーアコート」と「まさかどつかしょ」だろう。非常に有名なパワースポットであるが一応検索。間違いない。

ストリートビューでは直に確認できないが、入口右側に写真と類似している銀の看板がある。衛星写真から座標を特定し、入力してあげる。

かかった時間は20分ほど。かなり序盤でキーワードが出てきてくれたので助かったが、もし最後の方にあったら気が遠くなっていたかもしれない。

Flag: `TsukuCTF25{35.6872_139.7627}`

## rider

全体を画像検索するも情報無し。手前に写っている特徴的な黄色い看板を検索するとOTI Fried Chickenであることがわかる。

どうやらインドネシアにあるチェーン店らしい。公式サイトに行くと全店舗一覧が載っているので、片っ端から類似している店舗を探すが見つからない。

街灯を画像検索してみるも、バリ島やジャワ島といった全く違う場所の写真に同じものが写っていたので、参考にできるような特徴的なものではないと判断。

諦めてOTI Fried Chickenの全探索の2度目を実施。街灯店舗は見つからなかったが、手前にあるパンダの看板を発見。

Kuroba Creamy Crepesというお店らしく、調べてみるとほぼ全店舗がOTI Fried Checkinと同じ建物(または隣)にあることがわかった。
なぜか看板には日本語で「今日は運が良いです。」と書いてあるが、日本との関連は特に見つけられなかった。

方針転換をし、Kuroba Creamy Crepesの全店舗を調査するがやはり見つからず。

https://linktr.ee/kuroba.id> には閉店した店舗の情報もあったためこれらも調べるが発見できず。

DiverCTF 2024の鳥貴族を思い出しながら念の為OTI Fried Checkinの閉店した店舗も調べるが何も見つからず。

調べ尽くして半ば諦めながら6回目の全店舗調査をしていると、以下の店舗の前の道路だけが唯一「点字ブロックあり+中央分離帯無し」であり特徴が一致していることに気づく。

https://www.google.com/maps/place/OTI+Fried+Chicken+Salatiga/@-7.3188501,110.497038,206m/data=!3m1!1e3!4m6!3m5!1s0x2e7a78400c61e65b:0x78ef6a34ecb4a247!8m2!3d-7.319094!4d110.4970824!16s%2Fg%2F11c1p80w99?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D

注意を注意深く観察すると撮影スポットを発見。ストリートビューは昼間の写真なので印象がかなり異なっておりなかなか見つけられなかった。

19:21~20:18, 0:57~1:57でこの問題に関する調査をしていたらしく、累計で2時間ほどかかっていたらしい。

Flag: `TsukuCTF25{-7.3188_110.4969}`

## destroyed

OSINT系にはミリタリーのカテゴリが毎回あるが、ショッキングなものを多く見る必要があるのでなかなか取り組むまでに心の準備が必要で好きではない。

Telegramのページで開発者ツールを開き、高画質な画像をダウンロード。

現地のニュースサイトを片っ端から開き、詳細を説明しているサイトを探す。

見つけたが有益ではなかったサイトは↓

- <https://ua.korrespondent.net/ukraine/4548351-viiska-rf-obstrilialy-dva-sela-pid-zaporizhzhiam?__cf_chl_tk=TxD78iBJT60TcflYhsp4OMSsLPnSzCclh.wZElUBwsQ-1746278270-1.0.1.1-7OFFrdsHo5n9jqeboQs.CiXlqw2lRaXi6YObc4UdiiA
- <https://zp.vgorode.ua/news/sobytyia/a1228996-starukh-pokazal-foto-posledstvij-raketnoj-ataki-po-zaporozhskomu-rajonu#gallery

他にもニュースサイトを10個ほど見た気がするが、リンクを発見できなかった。

いくつかのサイトではこの写真を「教会」や「役所」と表現しており(機械翻訳側のミス?)、地域の特定にすらかなり時間を取られた。

最終的に見つけたのがこのサイト。

https://armyinform.com.ua/2022/12/24/okupanty-prodovzhuyut-nyshhyty-shkoly-ta-infrastrukturu-na-zaporizhzhi/

このサイトでは村の名前が書かれており、`Лежине`という村らしい。検索しても情報がほぼ出てこない上に、Google Mapでも建物の情報がほぼ登録されていない。

ウクライナ語のWikipediaでようやく情報を発見。

https://uk.wikipedia.org/wiki/%D0%9B%D0%B5%D0%B6%D0%B8%D0%BD%D0%B5

学校一覧が記載されており、Середня загальноосвітня школаと書かれている。

これを村名+学校名で検索していくと、謎の地図サイトを発見。

https://locator.in.ua/lezhyne/zahalnoosvitni-shkoly/lezhynskaya-obshcheobrazovatelnaya-shkola/p/342657/

この場所を改めてGoogle Mapと照らし合わせていくと、確かに学校のような建物がある。しかし撮影地はわからない。

https://maps.app.goo.gl/idSmGEoaSAd9DyoZ8

適当に正門の座標を入力してみるも正解にならず、諦めかけていた。

直後、TsukuCTFの公式Discordサーバでアナウンスがあり、この問題のフラグ設定が間違っていたとの連絡が。

改めて正門の座標を入力してあげると正解となった。

22:13~23:53と2時間ほどかかった。ニュースサイトの曖昧な表現によるミスリードや、私が全くキリル文字を知らないといったことが相まって、頓珍漢なことを調べている時間が長かったように思う。

Flag: `TsukuCTF25{47.807_35.358}`
