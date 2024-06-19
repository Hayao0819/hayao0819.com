---
title: Reactのライフサイクルと最適化についてまとめる
description: ""
date: 2024-06-18T12:05:44.371936+09:00
categories:
    - 技術系
draft: false
publish: true
---

Reactが再レンダリングされる条件とパフォーマンスの改善について、基礎から自分の復習を込めてまとめてみる。

ちなみに最近フロントエンドに飽きたので間違っていても責任は取りません。

## 関数型プログラミングとReact

関数型プログラミングはある値に対して特定の関数を渡すことで値を加工することでプログラムを記述していく言語。

しっかりと書いたことはないのであまり深い言及はできないのだが、関数を組み合わせていくものだと考えていい。

ここで重要なのは関数型プログラミングそのものではなく、その中で出てくる副作用の概念である。

以下に関数を定義する。

```ts
const sum = (a: number, b: number) => a + b;
```

この関数は同じ引数を渡した場合常に同じ結果が返ってくる。これは自明ではあるが引数の値を足し算する以外の処理が書かれていないためである。

更に、変数aとbのアドレスそのものを変更するわけでもないためそれらの値を変更することもない。

このような外部への作用が一切無く、常に同じ引数において同じ結果を返す関数を純粋関数という。

関数において同じ結果が返ってくることを **冪等性(idempotence)がある** と表現する。

Reactの文脈においては、以下のようなコンポーネントは純粋であると言える。

```tsx
const Hello = () => <>Hello World</>
```

一方で、以下のようなコードは常に同じ結果が返ってくるとは限らない。

```ts
let hoge = 0;
const count = (add: number) => {
    hoge += add;
    return hoge
}
```

この関数は1回目の実行と2回目の実行で返ってくる値が異なる。これは関数において`hoge`というグローバル変数を書き換えているためである。

このような関数の外部に影響を及びことを **副作用(side effect)** と呼ぶ。

これは医学的な「予期せぬ作用」という意味合いではない。「引数に対して値を返す」 **主作用** であり、それ以外が副作用となる。

## Reactにおける関数コンポーネントのライフサイクル

※クラスコンポーネントはここでは扱わない。

対象の関数コンポーネントが呼ばれたとき、その関数内でフックの計算が行われ最終的にレンダリングされるjsxが決定される。

jsxはHTMLではなくその実態はただのJavaScriptの関数の呼び出しである。

(言い換えればその気になればjsxを用いてReactの代わりとなるライブラリを作ることも可能である。そしてその実例がSolid.jsやPreactである。すなわちjsxはReactの独自機能ではなく、ECMAScriptにおける一種の特殊なSyntax Sugerである。)

レンダリングにおいては仮想DOMを用いて比較が行われ、実際のDOMとの差分が計算、DOMとして描画される。

(多分な語弊と誤解を恐れずにあえて大胆に表現すると、この差分計算等を事前に行ってしまおうというのがSSGであり、サーバ側で行ってしまおうというのがSSRであり、それが可能なのがRSCである。)

SSRが近年流行したり、Solid.jsのようなものが出現するのはこの仮想DOMの比較計算はそれなりの計算量があり軽量ではないという意見のもとである。

[【イラストで分かる】Reactとライフサイクル](https://zenn.dev/koya_tech/articles/16d8b11b5062bd)

## レンダリングが行われるタイミング

Reactではコンポーネントの値が変更されると、その変更をDOMに適用するために再レンダリングが行われる。

コンポーネントの値というものについて具体的に言及すれば、関数コンポーネントにおいてはまさにHooksである。

またコンポーネント自身が再レンダリングされたとき、そのコンポーネントが呼び出している子のコンポーネントも再レンダリングされる。

以下に具体例を示す。

```tsx
const Header = () => <p>ボタンをクリックすると数字が増えるよ！</p>

const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const incrementCount = () => setCount(count + 1);
    return (
        <div>
            <Header />
            <p>{count}</p>
            <button onClick={incrementCount}>Click me!</button>
        </div>
    );
};
```

Counterコンポーネントにおいて、ボタンがクリックされる(`incrementCount`によって関数内の値が更新される)と同時にコンポーネント全体で再レンダリングが実行される。コンポーネントが再レンダリングされると、そのコンポーネントが呼び出してる子コンポーネントも再レンダリングされるため、`Header`も再レンダリングの対象である。

ここで注目して欲しいのは、`Counter`は実行されるたびに値が変わるため副作用が存在するのに対し、Headerは純粋関数である。

すなわち、Headerは何度実行されても返り値が変化することはないのである。ここで思い出してほしいのはレンダリングはそれなりの計算量を伴うということである。

(再レンダリングされる必要のない)純粋なコンポーネントに対しても再レンダリングが実行されてしまうのは、無駄な計算ではないだろうか？

この無駄を省くのがReactの最適化であり、パフォーマンスの改善である。(後述する)

## 再レンダリングを観測する方法

再レンダリングはレンダリングされた結果であるブラウザのDOMだけでは観測することはできない。(純粋関数であるため結果だけ見ても変化を観測できないのは当然である。)

そこで、Reactにおいてレンダリングを確認する方法をいくつか紹介する。

### console.logを用いる

関数コンポーネントのレンダリングは、レンダリングされるたびにその関数が実行されることで行われる。

これを用いると、関数にconsole.logを仕込むだけでそのレンダリングを垣間見ることができる。

(console.logによるログの出力は関数の返り値以外への影響のため一種の副作用である。)

```tsx
const Header = () => {
    console.log("rendering Header")
    return <p>ボタンをクリックすると数字が増えるよ！</p>
}
```

[こちら](/playground/learn-react/rendering/0-simple-counter/)にこのコンポーネントをデプロイしてある。

開発者ツールを開くと、ボタンをクリックするたびにconsoleに文字が出力されているのが確認できるはずである。

### Reactの開発者ツールを用いる

![React 開発の拡張機能のスクリーンショット](react-devtool.png)

React公式が開発しているブラウザ拡張機能で、レンダリングの回数とそれにかかった時間を見ることができる。

拡張機能のインストールは[こちら](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)からインストール。

使い方についてはいろんなサイトが引っかかるので適当に参考にすること。

[React Developer Toolsのすすめ \#redux \- Qiita](https://qiita.com/sh-suzuki0301/items/9c2af4b28ba665cc0744)

## 再レンダリングされる厳密な条件と、その回避方法

### 再レンダリングが起こる仕組み

再レンダリングは結局のところ以下の場合において行われる

- stateやContextをはじめとした値の変化
- 親コンポーネントの再レンダリング
- カスタムフックの変化

Reactの再レンダリングについての記事でよく見かけるのはpropsの変化であるがこれは間違いである(詳細は[こちら](https://qiita.com/yokoto/items/ee3ed0b3ca905b9016d3#%EF%B8%8F-%E5%86%8D%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%AE%E7%90%86%E7%94%B1-props-%E3%81%AE%E5%A4%89%E6%9B%B4-%E5%A4%A7%E3%81%8D%E3%81%AA%E9%96%93%E9%81%95%E3%81%84))。

カスタムフックの変化は、結局のところstateやContextの変化にたどり着く。

```tsx
const useCount = () => {
    const [count, setCount] = useState(0)
    const incrementCount = () => setCount(count + 1);
    return [count, increment]
}
```

このカスタムフックにおいては、`increment`が呼び出されることでcountが変化し、それによって`useCount`そのものが更新される。

こうした場合にもフックの変化と検知され、レンダリングが実行される。

また、レンダリングは当然のことながらコンポーネント単位で行われる。言い換えれば巨大なコンポーネントにおいてはたとえごく一部の変更で済む場合においても全体の再レンダリングが行われてしまうのである。

すなわち、stateの変化が行われるコンポーネントを別の場所に切り出すことで影響を少なくすることができる。

[React再レンダリングガイド: 一度に全て理解する \#Next\.js \- Qiita](https://qiita.com/yokoto/items/ee3ed0b3ca905b9016d3)

### 具体例と回避方法

```tsx
const Header = () => {
    console.log("Header rendered!");
    return <p>Myheader</p>;
};

const MyApp = () => {
    const [count, setCount] = useState(0)
    const incrementCount = () => setCount(count + 1);

    return <>
        <header>
            <Header />
            <AppBar />
        </header>
        <main>
            <h1>Title</h1>
            <p>高度な機能を備えた素晴らしいカウンタ</p>
            <p>{count}</p>
            <button onClick={incrementCount}>Click me!</button>
        </main>
        <footer>
            <p>Created by HogeHoge</p>
            <SNSLinks />
        </footer>
    </>
}
```

これは先程のカウンタアプリに少々いろいろなコンポーネントを付け加えたものである。`incrementCount`が呼び出される度にstateが変化し`MyApp`は再レンダリングされる。

すると当然その子コンポーネントである`Header`や`AppBar`, `footer`の中まですべてが再レンダリングされることになる。

このアプリのことをクソデカコンポーネントと呼称し、これについて再レンダリングの回避方法をいくつか紹介する。

ちなみに、クソデカコンポーネントが再レンダリングを引き起こす様子は以下で確認できる。

[/playground/learn-react/rendering/1-big](/playground/learn-react/rendering/1-big)

### コンポーネントを分割する

これは最もシンプルで簡単に理解できるパフォーマンスの改善方法である。

```tsx
const Counter = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);
    console.log("Counter rendered!");
    return (
        <>
            <p>{count}</p>
            <button onClick={incrementCount}>Click me!</button>
        </>
    );
};

const MyApp = () => {
    return (
        <>
            <header>
                <Header />
                <AppBar />
            </header>
            <main>
                <h1>Title</h1>
                <p>高度な機能を備えた素晴らしいカウンタ</p>
                <Counter />
            </main>
            <footer>
                <p>Created by HogeHoge</p>
                <SNSLinks />
            </footer>
        </>
    );
};
```

こうすることで`Counter`のみが再レンダリングされることになる。個人的にはコンポーネントのサイズは100行以内にしたい。

分割した結果は以下で確認できる

[/playground/learn-react/rendering/2-split](/playground/learn-react/rendering/2-split)

### メモ化の概念とその手法

改めて先程のクソデカコンポーネントに戻ってみる。何らかの理由でコンポーネントを分割できないという状況に遭遇することもある。

というか実際の開発ではその場合のほうが多いだろう(複数の箇所でstateを使用している等が考えうる)

そういう場合にはメモ化という概念がある。ある結果についてメモしておくことによって、再計算を防ぐというものである。キャッシュに近い概念である。

メモ化には主に3つの方法がある。

- memo
- useCallback
- useMemo

である。まずは簡単なmemoから紹介する。

### memo

先程のクソデカコンポーネントでは、Headerなどの純粋なコンポーネントもstateの変化によって再レンダリングされてしまうことがあった。

これを防ぐ簡単な方法が`memo`である。先のクソデカコンポーネントにおける`Header`を例にとろう。

もともとのHeaderの実装は以下であった。

```tsx
const Header = () => {
    console.log("Header rendered!");
    return <p>Myheader</p>;
};
```

この状態では親のコンポーネントがレンダリングされる度に、それに倣ってHeaderも再レンダリングされてしまう。

これに`memo`という関数を挟んでみる。

```tsx
const Header = memo(()=>{
    console.log("Header rendered!");
    return <p>MyHeader</p>
})
```

こうすることでHeaderコンポーネント全体がメモ化される。memo関数は引数に渡したコンポーネントをそのまま返すため、返り値を通常のコンポーネントと同じように利用できる。

唯一の違いは「Propsに変化が無い場合は再レンダリングしない」という点である。

[公式ドキュメント](https://ja.react.dev/reference/react/memo)を参照すればわかることではあるが、`memo`はデフォルトの場合において個々のPropsを`Object.is`を用いて比較する。

比較した結果前回のPropsに変化がなければ、計算済みのコンポーネントをそのまま返すというわけだ。

この結果については以下で確認できる。

[/playground/learn-react/rendering/3-memo](/playground/learn-react/rendering/3-memo)

### useCallback

TODO

### useMemo

TODO

## useEffectの使い方について

TODO

## 終わりに

ここまで基本的なReactのパフォーマンスの改善の方法について紹介した。

しかし、Nextをフレームワークとして用いる場合にはReact 19の最新機能を使ったり、Next側のキャッシュ機構を用いたり、更にはSSRをフル活用することで更にパフォーマンスを改善することができる。

また、JotaiやRecailのような状態管理ライブラリを用いる場合にもそれぞれに即したパフォーマンスの改善方法が存在する。

ハヤオの技術力不足もありそれらすべてを網羅することはできないが、まずはこれらの基本的なパフォーマンス改善を行ってみてほしい。
