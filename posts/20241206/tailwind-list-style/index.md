---
title: CSSでリストのスタイルを弄る
description: ""
date: 2024-12-06T13:37:11.314444+09:00
categories:
    - 技術系
draft: false
publish: true
---

TailwindCSSを用いて、`<ul>`で表示されるリストをカスタマイズする方法がわからなかったのでメモ。

ネット上の沈痛な月収100万サムライエンジニア系のサイトでは`list-style:none;`したうえで`::before`で…という説明が溢れかえっているがこれは適切な用法ではない。

## CSSでリストの要素を自由にカスタマイズする

リストの文字はCSSでは`list-style-type`プロパティで変更できる。

```css
ul{
    list-style-type:"-"
}
```

このプロパティは各値以外にも任意の文字列を受け取れるらしく、文字を指定した場合はそれを表示してくれる。

https://developer.mozilla.org/ja/docs/Web/CSS/list-style-type

また、リストの先頭に来るこの要素は`::marker`疑似要素で表されるため、このように記述することもできる。

```css
ul::marker{
    content: "-"
}
```

文字色や太さ等を指定する場合は後者の疑似要素を用いるしか方法がない。

## TailwindCSSでこれを行う

残念ながら現在のTailwindCSS 3.4では任意の文字列を受け取るlist-style-typeをサポートしていないらしく、`list-["-"]`や`list-style-["-"]`のようなコードを書いても適切なCSSがコンパイルされることはなかった。

一方で`::marker`疑似要素はサポートされており、`marker:content-['-']`のように装飾に使用される文字を設定することができた。

React等とTailwindCSSを併用する場合はCSS in JSで強引に技術することもできるが、疑似要素でTailwindCSS側にCSSを書かせたほうがやはり可読性の面でも便利だと思う。

~~個人的には、`::marker`疑似要素が存在しているにも関わらず`list-style-type`が文字列を受け取れるという、1つの問題を解決する方法が複数あるという状態が非常に気持ち悪いのだが、ウェブの仕様を制定している高崇な方々には何か私には到底思いつかない深い考えがあるのだろうと割り切ることにしている。~~
