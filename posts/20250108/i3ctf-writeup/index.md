---
title: i3CTF Writeup
description: ""
date: 2025-01-08T13:35:28.353934081+09:00
categories:
    - 技術系
tags:
    - CTF
draft: true
publish: true
---

年末に行われていたi3CTFのWriteupです。

<Tweet tweetId="1870046521263305094" />

年末はなんだかんだで忙しくて多くの時間を割けませんでしたが、非常に楽しいCTFでした。

問題を解いている途中に気づいたのですが、なんとサンセットが問題提供をしていました。~~サンセットの問題難しすぎるんだよ~~

## 感想

過去のCTFで同じ解法で解けるものが多いと感じました。(作問難しいらしいからね、仕方ないね。)

簡単な問題は解けるものの、初めて見る問題や初見で検討がつかなかった問題はもう全くあとから考え直しても解けませんでした。

CTF初心者の自分にとっては程よい難易度で楽しかったです。全体的にWindowsもUnixも必要な問題が多く、MacBookのみで戦うのは少々苦しかったです。

サンセットの問題を全部解けなかったことが非常に悔しいですが…

## Misc

DIVER OSINT CTFでの知識が非常に役立ちました。

### Welcdome(beginner)

<hr />
Welcome to i3CTF!
Enter your first Flag and dive into the world of CTF!

FLAG\{Welcome_to_i3CTF!!\}

<hr />

問題にFlagが書いてあります。

Flag: `FLAG{Welcome_to_i3CTF!!}`

### Word?(beginner)

<hr />
Flag is hidden in this file.
Please look for Flag.
<hr />

DIVER OSINT CTFでもあった問題で、MS Officeのdocxをzipとして展開し、中にある`[Content_Types].xml`を開くとFlagが書かれています。

Flag: `FLAG{Word_is_zip}`

### QR(beginner)

<hr />
My QR code got dirty!
I can't read it anymore...
<hr />

QRコードに大きくバツ印がつけられており、読めなくなっています。

[手軽に透明PNG](https://www.officedaytime.com/toumei/)というソフトウェアを用いて塗りつぶされている一部を以下のように透過すると読み取ることができました。

![QR Code](./qr-fixed.png)

Flag: `FLAG{Error_correction_30_percent}`

### music(beginner)

<hr />
Let's listen... what is this?
<hr />

サンセット作問の問題が来ました。

[オンラインで動くMIDIエディタ](https://signal.vercel.app/)でMIDIファイルを開くとFLAGがMIDIアートとして書かれていました。

![Midi](./music.png)

Flag: `FLAG{MIDI_IS_NOT_WAVE}`

### Icon(easy)

<hr />
Hmmm... I can't find Flag easily.
Hmm? There seems to be something written on the icon.
<hr />

先ほどのWordと同様にzipとして展開します。

ファイルを探索していると`docProps/thumbnail.jpeg`にFLAGが書いてあります。

DIVER OSINT CTFの自衛隊の問題でも同様のものがありましたね。

Flag: `FLAG{How_did_you_find_it?}`

### font(easy)

またまたサンセットの問題です。

問題に含まれているファイルにはWingdingsというフォントで何かが書かれています。

[こちらのサイト](https://sumisumile.site/335.html)に記載されている対応表を元に手でデコードすると、以下の文字列に変換できます。

```txt
https://forest.watch.impress.co.jp/library/software/stgngrapher/
```

「ステガノグラファー」というフリーソフトへのリンクになっており、これをダウンロードします。

残念ながら私の回答環境はmacOSだったのですが、Wineでも動作しました。

これに問題の画像ファイルを読み込ませてみるのですが、パスワードが必要となってしまいFlagを獲得できません。

画像ファイルのメタ情報を確認すると、以下のテキストが見つかります。

```txt
bnVtYmVyIG9mIHBpeGVscyBpbiB0aGUgaW1hZ2U=
```

明らかにbase64でエンコードされた文字列なので、デコードします。

```txx
number of pixels in the image
```

明らかにパスワードのことを言っていますね。画像サイズは1091×702なのでパスワードは`765882`になります。

この数値を再びフリーソフトに入力すると、`flag.txt`というファイルが手に入り、中にFlagが書かれています。

Flag: `FLAG{S7e9an0Gr@pHy}`

## OSINT

### Island(beginner)

<hr />
What is the name of the island where this photo was taken?

Flag format: FLAG\{island name\}
The name of the island is written in English.

<hr />

画像データにEXIF情報がそのまま残されています。

```txt
hayao@XPS9350 ~/D/i/island> exiftool ./island.JPG
ExifTool Version Number         : 13.11
File Name                       : island.JPG
Directory                       : .
File Size                       : 270 kB
File Modification Date/Time     : 2024:11:10 15:11:18+09:00
File Access Date/Time           : 2025:01:08 14:46:16+09:00
File Inode Change Date/Time     : 2025:01:08 14:46:16+09:00
File Permissions                : -rwxrwxrwx
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : inches
X Resolution                    : 72
Y Resolution                    : 72
Exif Byte Order                 : Big-endian (Motorola, MM)
Make                            : Apple
Camera Model Name               : iPhone 12
Exposure Time                   : 1/955
F Number                        : 1.6
Exposure Program                : Program AE
ISO                             : 32
Exif Version                    : 0232
Date/Time Original              : 2024:04:30 15:18:24
Create Date                     : 2024:04:30 15:18:24
Shutter Speed Value             : 1/955
Aperture Value                  : 1.6
Brightness Value                : 7.973546457
Exposure Compensation           : 0
Metering Mode                   : Multi-segment
Flash                           : Off, Did not fire
Focal Length                    : 4.2 mm
Sub Sec Time Original           : 07
Sub Sec Time Digitized          : 07
White Balance                   : Auto
Focal Length In 35mm Format     : 26 mm
GPS Latitude Ref                : North
GPS Longitude Ref               : East
Padding                         : (Binary data 268 bytes, use -b option to extract)
About                           : uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b
Image Width                     : 4032
Image Height                    : 1306
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Aperture                        : 1.6
Image Size                      : 4032x1306
Megapixels                      : 5.3
Scale Factor To 35 mm Equivalent: 6.2
Shutter Speed                   : 1/955
Create Date                     : 2024:04:30 15:18:24.07
Date/Time Original              : 2024:04:30 15:18:24.07
GPS Latitude                    : 36 deg 15' 9.37" N
GPS Longitude                   : 136 deg 7' 14.56" E
Circle Of Confusion             : 0.005 mm
Field Of View                   : 69.4 deg
Focal Length                    : 4.2 mm (35 mm equivalent: 26.0 mm)
GPS Position                    : 36 deg 15' 9.37" N, 136 deg 7' 14.56" E
Hyperfocal Distance             : 2.27 m
Light Value                     : 12.9
```

GPSの位置をGoogle Mapで調べると、その島の名前がFlagとなる。

Flag: `FLAG{Oshima}`

### Gyukaku(easy)

<hr />
What is the name of the store one floor below this Gyukaku?

Flag format: FLAG\{store name\}
Store name should be capitalized, with no spaces.

<hr />

DIVER OSINT CTFの鳥貴族と非常に似た問題です。

[https://map.reins.co.jp/gyukaku/all?keyword=4F](牛角の店舗一覧)から4階にある店舗を洗い出します。

そこからそれぞれが入っている建物をGoogle Mapで調べていきます。イオン等の複数店舗が入っている店はFlagが一意に定まらないので除外していきます。

探していくと*牛角 吉祥寺北口店*が見つかります。ということでその下にあるビッグエコーがFlagになります。

Flag: `FLAG{BIGECHO}`

## Crypto

### Julius(beginner)

<hr />
Qksec Tevsec Mkockb gkc k Bywkx qoxobkv kxn cdkdocwkx. K wowlob yp dro Psbcd Dbsewfsbkdo, Mkockb von dro Bywkx kbwsoc sx dro Qkvvsm Gkbc lopybo nopokdsxq rsc zyvsdsmkv bsfkv Zywzoi sx k msfsv gkb, kxn celcoaeoxdvi lomkwo nsmdkdyb pbyw 49 LM exdsv rsc kcckccsxkdsyx sx 44 LM. PVKQ sc OspqATNUTZwMIdT
<hr />

Cryptoカテゴリを解くのは初めてなので、ChatGPTに投げてみる。

[投げてみた結果](https://chatgpt.com/share/677e1f80-a88c-8007-87cf-13ba70083a2c)

シーザー暗号と言われるので、東京電機大学が公開している以下のシーザー暗号解読機を用いる。

[Caesar cipher](http://www.net.c.dendai.ac.jp/crypto/caesar2.html)

`key=16`で以下のテキストに変換できます。

```txt
Gaius Julius Caesar was a Roman general and statesman. A member of the First Triumvirate, Caesar led the Roman armies in the Gallic Wars before defeating his political rival Pompey in a civil war, and subsequently became dictator from 49 BC until his assassination in 44 BC. FLAG is EifgQJDKJPmCYtJ
```

Flag: `EifgQJDKJPmCYtJ`

### xor(beginner)

(追記します)

## Forensics

### What is this file?(beginner)

<hr />
I don't know how to open this file!
Please check the contents somehow.
<hr />

`file`コマンドを用いて種類を特定します。

```txt
hayao@XPS9350 /m/c/U/H/D/i/what_is_this_file> file unknow
unknow: Composite Document File V2 Document, Little Endian, Os: Windows, Version 10.0, Code page: 932, Template: Normal.dotm, Revision Number: 9, Name of Creating Application: Microsoft Office Word, Total Editing Time: 08:00, Create Time/Date: Fri Nov  1 00:46:00 2024, Last Saved Time/Date: Wed Nov 13 01:56:00 2024, Number of Pages: 1, Number of Words: 0, Number of Characters: 1, Security: 0
```

`Composite Document File V2 Document`について調べると以下のウェブサイトがヒットします。

[What is Composite Document File V2 Document? \- Microsoft Community](https://answers.microsoft.com/en-us/msoffice/forum/all/what-is-composite-document-file-v2-document/03ea215b-fa3c-4d17-acea-da0447d1777d)

拡張子に`doc`をつけるとWordでファイルを開けます。開くと、中に画像データとしてFlagが書かれています。

Flag: `FLAG{Open_old_word_file}`

### SVG(beginner)

<hr />
svg, svg... I hear that a lot.
<hr />

SVGファイルを開くとQRコードが出てきます。QRコードを読み取ると以下のページが開くが関係はなさそう。

[Extensible Markup Language \- Wikipedia](https://ja.wikipedia.org/wiki/Extensible_Markup_Language)

SVGをVSCodeで開くと、

```xml
<Flag content="import base64"/>
```

という変なタグがあります。このFlagタグのみをコマンドを用いて抽出。

```sh
grep "^<Flag" ./image.svg
```

```xml
<Flag content="import base64"/>
<Flag content="parts = ["/>
<Flag content="[70, 76, 65, 71],"/>
<Flag content="[123, 53, 86, 71],"/>
<Flag content="[95, 52, 110, 100],"/>
<Flag content="[95, 88, 77, 49],"/>
<Flag content="[95, 52, 114, 51],"/>
<Flag content="[95, 102, 52, 109],"/>
<Flag content="[49, 108, 121, 125]"/>
<Flag content="]"/>
<Flag content="flag = ''.join(chr(x) for part in parts for x in part)"/>
<Flag content="encoded_flag = base64.b64encode(flag.encode()).decode()"/>
<Flag content="print(''.join(base64.b64decode(encoded_flag).decode()))"/>
```

露骨にPythonコードであるため、これをさらに取り出してみます。

```sh
grep "^<Flag" ./image.svg  | cut -d \" -f 2
```

```python
import base64
parts = [
[70, 76, 65, 71],
[123, 53, 86, 71],
[95, 52, 110, 100],
[95, 88, 77, 49],
[95, 52, 114, 51],
[95, 102, 52, 109],
[49, 108, 121, 125]
]
flag = ''.join(chr(x) for part in parts for x in part)
encoded_flag = base64.b64encode(flag.encode()).decode()
print(''.join(base64.b64decode(encoded_flag).decode()))
```

実行。

```sh
grep "^<Flag" ./image.svg  | cut -d \" -f 2 | python3 -
```

```txt
FLAG{5VG_4nd_XM1_4r3_f4m1ly}
```

実行結果がFlagとなる。

Flag: `FLAG{5VG_4nd_XM1_4r3_f4m1ly}`

## Web

Webカテゴリも人生初です。

### Meta(beginner)

<hr />
You can find a Flag at the following site.

https://s1.ikbase.net/meta/

<hr />

一旦デベロッパーツールでHTMLを覗いてみます。

`<head>`にあるメタデータを見ると以下のようになっています。

```html
<head>
    <meta charset="UTF-8" />
    <meta name="This is Flag" content="FLAG{Developer_tools_is_useful}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>サンプルHTMLページ</title>
    <style>
        /* CSS省略 */
    </style>
</head>
```

Flag: `FLAG{Developer_tools_is_useful}`

### login(easy)

<hr />
The Road to SQL Master - Part1 -

https://s1.ikbase.net/login/

<hr />

露骨にSQLと書いてあるのでSQLインジェクションでしょう。

ユーザー名とパスワードの両方に

```txt
'OR' 1 '=' 1
```

と入力するとFlagを獲得できます。

Flag: `FLAG{5QL_1nJ3Ct10n}`

## Network

人生初のWiresharkだったのですが、意外と戦うことができました。

### http(beginner)

<hr />
Let's use Wireshark!
<hr />

HTTPを用いてHTMLを転送するだけのシンプルな通信を行っていました。

以下のサイトを参考にしながらHTMLファイルを復元しました。

[ネットワーク解析したい \#Network \- Qiita](https://qiita.com/piza_tour/items/2ad83eca4f9b630d6df7)

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Flag</title>
    </head>
    <body>
        <p>FLAG{Introduction_to_packet_capture}</p>
    </body>
</html>
```

Flag: `FLAG{Introduction_to_packet_capture}`

### Bob(easy)

<hr />
Bob, a new engineer, is sipping coffee contentedly after forwarding a classified document. The file may or may not have Flag written on it. Please sneak a peek at his transfer log and find Flag.
<hr />

今度はFTPで通信しているので、先程と同様にオブジェクト抽出から通信されたデータを取り出します。

取り出した画像にFlagが書かれています。

Flag: `FLAGP{FTP_is_not_secure}`

### basic(easy)

### layout(easy)

### ppap(expert)

## Reversing

MWS Cupのために静的解析は勉強したのに残念ながら完答できず…

### hello(beginner)

<hr />
For starters
<hr />

一旦、ファイルの種類を確認してみます。

```txt
hello: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), statically linked, no section header
```

実行できそうです。

```txt
FLAG{_is_not_here_^v^}
Flag is with i3ctf.¶
```

このFlagは偽物ですね。GhidraでStrings検索を行ってみます。

`i3ctf`で検索をかけると以下の文字列がヒットします。

![flags](hello.png)

これらを縦読みするとFlagとなります。

Flag: `FLAG{Th3_5tr1ngs}`

### pyc(easy)

<hr />
0.1 + 0.2 = 0.3 ?
<hr />

pycというファイルがあるのでまずはファイル形式を調べてみます。

```txt
hayao@XPS9350 ~/D/i/pyc> file file.pyc
file.pyc: Byte-compiled Python module for CPython 3.8 (magic: 3413), timestamp-based, .py timestamp: Mon Nov 25 10:59:22 2024 UTC, .py size: 543 bytes
```

どうやらコンパイルされたPythonモジュールのようです。

[python \- Decompile an imported module \(e\.g\. with uncompyle2\) \- Stack Overflow](https://stackoverflow.com/questions/30291230/decompile-an-imported-module-e-g-with-uncompyle2)

調べていくと、[uncompyle](https://github.com/rocky/python-uncompyle6)というものでデコンパイルできるらしいです。

一旦、Pythonコードを実行してみます。

```sh
yay -S python-uncompyle6
```

インストール後、実行してみます。

```sh
python3 ./source.py
```

```txt
This code works in Python 3.8
Can you find the flag?



Oops, this code doesn't seem to work. Why?
```

どうやらバージョン指定があるようなので、pyenvを用いてPython 3.8に固定します。

その後、
