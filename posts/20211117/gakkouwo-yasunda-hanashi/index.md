---
title: "学校を休んだのを機に今後について考える"
description: ""
date: 2021-11-17T11:03:17+09:00
categories:
    - "ブログ"
    - "プライベート"
tags:
    - "学校"
    - "Linux"
    - "Fascode"
draft: false
hidden: true
---

アホほど頭が痛くて学校を休んだ、かといってやることもないからTwitterとブログを更新してる

だから一向に体調がよくならねぇんだなと思いつつも根本が廃人なのでだめ

## Alter Linuxを更新できてない理由

あとでFascodeの公式ブログにまとめる予定だけど体調がこんなのなので、とりあえず文章がめちゃめちゃでもこっちに書いておく

ここならいくらおかしい文章でも問題ないからね

んでAlter Linuxを9月から更新できてない言い訳をすると

-   11月分で更新すればいいと思ってた
-   先月GoがSSE2を必須にした
-   それに伴ってArch Linux32がi686でGoLangを廃止した
-   GoLangが無いからyayをビルドできない
-   AlterISO 3.1はyayに依存してAURパッケージをビルドする
-   i686でAURパッケージをインストールできない
-   Pen4アーキテクチャに移行するにもリポジトリの自動セットアップが必要

と、こんなわけで長年の間放置していたリポジトリの自動更新がネックになっている

Arch Linuxの公式リポジトリがどうやってパッケージを管理してるのかさっぱりわからないし、Arch Linux CNが使ってるLilacは中国語のドキュメントしかないのでだめ

英語から日本語への翻訳ならできるけど中国語とかさっぱりわからないしね。進研模試とか河合模試の漢文のテストの結果晒してやろうか。

なので近いうちに64Bit版は更新するつもり、こっちには何の問題もないからね

んで32bitは、別のAURヘルパーで代替するかシェルスクリプトで今個人的に作ってる自作AURヘルパーを使うかなやんでる。

### 自作AURヘルパーの問題

AURヘルパーは基本的にPacmanのオプションをすべてサポートするべきと考えているので、あの膨大で複雑な引数解析を実装しないといけない

GNU getoptで頑張ってるけどぶっちゃけ解析部分がなかなかにカオスになっている

というわけで引数解析に時間がかかりそう。他にも依存関係の再帰的な解決とか、パッケージの衝突の解決とかで課題山盛りなのでぶっちゃけもうやりたくない。

かといって代替AURヘルパーもないんだよな...GoもRustも使えないから主要なAURヘルパーは壊滅。Python系のAURヘルパーはどうも信用ならん...

そんなわけで今i686からPen4に移行しようとしてる、こっちならGoが使えるからそのままyayで続行できる

ただ、流石にこんな状況なのでAlterISO 3.1のyay依存は限定的に解消した。AURヘルパーを設定で変更できるようにした。

暫定的な機能だからAlterISO 3.1にしか取り入れてないけど、もうちょいブラッシュアップしたら4.0にもマージするかな。

## 長期的な今後の話

ぶっちゃけ大学受験が本格的に近くなっているので今後の活動はますます減っていくと思う

というよりもうここ2ヶ月くらいで疲弊しきってほぼ活動なんてできてないわけだけども

最悪32Bitをしばらくの間休止して64bitだけを定期的にビルドして配信ってのも考えてるからね

まぁこれの面倒な作業を誰かが代理してやりたいっていう物好きなやつがいたら喜んで権限を渡すけど

まぁ代理って場合はFascode全体の話になるから俺の権限だけでどうこうっていうのじゃないけどね

## 体調の話

最近は喘息発作もだいぶなくなってきた、と言いたいけど昨日それで早退して今日学校を休んでるのでなんとも言えない

病院には相変わらず結構な頻度で通ってるし薬も多いのでわりかしきつい

もう1ヶ月たつんだけど未だにワクチンの副反応で腕が痛いのはいい加減にどうにかならないんだろうか

頭痛とか立ちくらみは割と頻繁に起きる、いったいいつ死ぬことやら（）

最近はPCを分解するとかエラーを調べて修正するとかそういうことさえ面倒になってきた

面倒というかいちいち全てに疲れるのかな、何もしなくてもそれなりに使えるWindowsが如何に素晴らしいかっていう話

元気があるころはLinuxで最強環境をゴリゴリ組み立ててたけど、それも飽きてきたし前みたいな使い勝手への強いこだわりもなくなってしまったのでWindowsでいいやってなってる

後に考えてくると某青空の言ってることはある程度正しい部分もあったのかなって思えてくるね

それに最近はM$が頑張ってるからWSL2とWSLgですべてが解決してしまうっていうのもあるかな、個人的なWSLの課題はマギレコと同居できないってことくらい

## 終わり

ブログも忙しくて全く更新できてない

なにか近況の報告にちょこちょこ使えたらなって思う

それじゃ、また今度。
