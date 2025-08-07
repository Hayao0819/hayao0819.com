---
title: セキュキャン2025 SGXゼミ 課題晒し
description: ""
date: 2025-08-07T20:35:26.573714478+09:00
categories:
    - 技術系
draft: false
publish: true
---

IPAのセキュリティキャンプ 2025に応募し無事に合格しました。

応募したゼミは「TEEビルド & スクラップゼミ」です。当初は合格するとは考えておらず、課題晒しも行うつもりはありませんでした。

しかし、SGXゼミの課題晒しが非常に少ないということを踏まえ、せっかく合格したので公開しようと思います。

## 感想

SGXとはなにかについてほんのり調べ始めたばかりだったので色々と間違っていることや理解できていないことが書いてあったりします。

LLMをフル活用して書いているので正直恥ずかしいという気持ちも大きいです。強くなれるように頑張ります。

## NoteBookLM

https://notebooklm.google.com/notebook/5cf65388-2ff4-4fd5-9311-44f5224a5157

今回の課題作成にあたって上記のNoteBookLMを作成して用いた。

## 課題

以下は課題の転載です。

```md
# TEEビルド＆スクラップゼミ応募課題

* 本応募課題では、各問難易度を高めに設定しており、（コード実装含め）完答を前提としてはおりません。  
  同時に、ゼミの主題であるTEEへの（スタンス的な）適性や、解答までのプロセス、熱意を測る意味合いを多分に含めています。  
  完答が難しい場合、途中までの調査結果や思考内容、自らの意見等を記述していただければ、そちらも大きく加点対象といたします。  

* 文字数が多い事により採点に有利になることはありません。  

* フォームの文字数制限を超過する場合は、外部サービスを利用し限定共有の形で共有いただいて構いません。  

* この応募課題のテキストは、Markdown形式で記述しているため、Markdownとして表示する事ができます。  

* 解答を作成する上で、各種参考文献やサービス（LLM等）を参照するのは全く減点要素にはならず、寧ろ大歓迎です。  
  ただし、文献やサービスを参照した際には必ず参考文献を記載してください。  
  LLMで解答を導出し、論拠となるサイトや文献の特定に失敗した場合、使用したLLM名（サービス、モデル）も必ず明記してください。  
  （DeepResearch等による助力含め、LLMの回答の論拠を特定できた場合は不要です）  

TEEやその実装例の1つであるSGXについての基本的な前提知識については、例として以下の文献を参考にしてください（勿論以下の文献に限りません）。

* https://www.ieice.org/~dpf/wp-content/uploads/2021/08/DFS研究会産総研須崎.pdf
* http://www.ipsj.or.jp/sig/os/index.php?plugin=attach&refer=ComSys2020&openfile=ComSys2020-Suzaki.pdf
* https://acompany.tech/privacytechlab/author/ao-sakurai
* https://qiita.com/Cliffford/items/2f155f40a1c3eec288cf
* https://qliphoth.io/seccamp/

# 簡易的な前提知識

TEEとは、ハードウェア（主にCPU）により厳重に隔離された領域にデータを保持し、その状態で隔離保護領域用に定義された  
コードを実行する事で、終始データを保護しながらそのデータを利用した処理を可能とする技術です。  
特に、Intel SGXにおいてはこの隔離保護領域を「Enclave」と呼びます。SGXのEnclaveは、CPUの極めて特権的な制御により  
隔離されている上、その全域がAESベースで暗号学的に保護（暗号化）されているという特長を有しています。

# 問題

## Q1

あなたがTEEを使用して実現してみたいプロダクト（アプリケーションやシステムなど）を、理由と共に紹介してください。  
セキュリティに対する興味を交えて紹介いただけるとベターです。  
その上で、本ゼミでメインとして取り上げるIntel SGXは、その利用・開発の際にC/C++に強く依存するため、最低限のC/C++のスキルがないと  
一切の開発を行う事ができません。  
そこで、C/C++（特にC++）を使用して行ったものや開発したものがあればそれについても説明してください。  
GitHub等に自作のコードがあれば、そのリンクも共有してください。  
もし経験がない場合は、ゼミ本番までのC++の習得に関する計画を述べてください。経験の有無自体が採点に影響する事はありません。  

## Q2

Intel SGXにおいては、それがいかに重要な機能であっても、比較的唐突かつ十分な猶予無しに廃止を宣告される事があります。  
例えば、種々の信頼可能な機能を提供していた、Intel製の特別なEnclaveであるPSE（Platform Service Enclave）がこれに該当します。  
また、リモートに存在するEnclaveやそのSGXマシンの正当性（信頼可能か）と完全性（コードが改竄されていないか）を検証するために、  
Remote Attestation（RA）という手続きが必要ですが、今まで主流であったEPID-RAという方式のRAが、突如サービス終了を宣告され、  
2025年4月にはもう完全に使えない代物となってしまいます。  
さらに言えば、クライアント向けCPUであるCoreシリーズでも第6～10世代でSGXに対応していましたが、第11世代以降突如SGXが削除され、  
現行のCPUとしてはXeonプロセッサでのみSGXを使用可能です。  

あなたは、これらの機能やSGX自体をヘビーに使用している状態で、もしこのような唐突な廃止を宣告された場合どのように思いますか。  
また、上記のIntelによる運用は褒められたものでは無いと考えられますが、それでもIntelがそうせざるを得なかった理由と、  
本来取るべきであった理想的な運用についても考察（あるいは調査）して回答してください。  

## Q3

TEEには、通常のOSすら信頼不可能と見なして特定のコードのみを信頼可能とする「部分隔離型」と、  
VMを丸ごと隔離保護する（つまりはOSも丸ごと内包し信頼する）「VM型」の2種類が存在します。  
部分隔離型には、本ゼミでメインとして扱うIntel SGXに加え、ARM TrustZoneやRISC-V Keystoneが存在します。  
一方、VM型としては、Intel TDX、AMD SEV、ARM CCAが主なものとして存在します。  

ここで、SGXのような部分隔離型では対処できるものの、TDXのようなVM型では対策できない攻撃シナリオを考察し説明してください。  
攻撃シナリオについての説明は、具体的なあるサービスにTEEを使用する想定での説明でも、より一般化した議論としての説明でも  
どちらでも構いません。

## Q4

この大問Q4は、属する小問Q4-1～Q4-2から自由に選択し解答する選択問題の形を取っています。各大問での指示に従い、  
問題を選択して解答してください。  
余力があれば指定された選択数よりも多くの問題に解答しても構いません。  

### Q4-1

C++において、文字列"Hello, TEE."（または、お好みの文字列やバイト列があればそちらでも可）に対する、  
単一の128bit AES-CMAC値を算出するプログラムのソースコードを書いてください。  
結果のMAC値を16進数表現で出力するようにし、実行結果の
鍵は、128bitの鍵を毎回乱数的に動的生成して使用してください。  
OpenSSLで実装するのが比較的楽であると思いますが、その場合はOpenSSL公式GitHubリポジトリのサンプルコードも参考になります。  
https://github.com/openssl/openssl/tree/openssl-3.4.1/demos/mac  
ただし、システムコール（例：system, fork+exec）によりopensslコマンド等を呼び出すような実装は不可とし、  
C/C++コードから直接OpenSSL等の暗号ライブラリを用いて実装するものとします。  

実装の上で必要な前提知識については、例えば以下の文献を参考にしてください。  

* https://edn.itmedia.co.jp/edn/articles/1810/10/news012_3.html
* https://tex2e.github.io/rfc-translater/html/rfc4493.html
* https://ja.wikipedia.org/wiki/CMAC

### Q4-2

お好きなコンピュータにおいて、以下に示す特定のモデル固有レジスタ（MSR）を読み取り、得られたビット列が意味する内容を解説してください。  
ただし、MacではこのようなMSRの読み書きが難しいため、Mac以外のマシンで実行するものとします。  
ビット列が意味する内容を解説する際に出てくる専門用語（例：IBRS、MDS）についても、可能な範囲で調査し軽く解説してみてください（必須ではありません）。  

MSR自体の基礎知識については、例えば以下のサイトを参照してください。  
https://mcn.oops.jp/wiki/index.php?CPU%2FMSR  

#### Intel CPUのマシンである場合

IA32_ARCH_CAPABILITIES（MSRアドレス：0x10A）を読み取り、返ってきた値をビット表現し、各bitが何を意味しているかを解説してください。  
つまり、各bitが何を示すビットフィールドであり、あなたのマシンで出力されたそのbitがどのような状態を示しているかを説明してください。  
例えば0x02Fと返ってきた場合、0b000000101111のようにビット表現し、各bitが何を意味しているかの説明をする形となります。  

#### AMD CPUマシンである場合

SPEC_CTRL（MSRアドレス：048h）を読み取り、返ってきた値をビット表現し、各bitが何を意味しているかを解説してください。  
解答方法に関しては上記のIntel CPUマシンの場合と同様とします。  
情報源については、AMD64 Architecture Programmer’s Manualを見ると正確です。

#### 上記MSRを読み取れない環境の場合

手元にMacしか無い、あまりにも古いマシンしか無い等の理由により、上記MSRを読み取れない場合、任意の他のMSRを選んで読み取り、  
その内容について説明してください。  
Macであれば、カーネル拡張（kext）を用いると間接的にMSRを読み取れる場合があります。  
https://larry1301.wordpress.com/2015/12/14/macbook-cpu-throttling-motherboard-thermal-sensor-and-bd-prochot-msr/  

それでも読み取りが難しい場合は、そのマシンにおいてMSRを読み取れない理由について考察してください。  
さらに、Intel CPUマシンの場合の部分で取り上げているIA32_ARCH_CAPABILITIESについて、各bitフィールドが何を表すためのものなのかを  
それぞれ説明してください（実際のbit値を出す必要はありません）。

#### MSRの読み取り方法

原則として、ホストOSでしか読み取れない（VMからの読み取りは難しい）点に注意してください。

##### Linuxの場合

msr-toolsをapt等でインストールすると使用できるようになる、rdmsrコマンドにより簡単に読み取れます。

##### Windowsの場合

[RWEveryThing](https://rweverything.com/)というツールを用いると、GUIベースで目当てのMSRを読み取れます（閲覧できます）。  
以下リンク先の「Example #3: MSRs」で説明されている手順に従い、当該MSRの値を取得してください。  
https://www.basicinputoutput.com/2017/08/rweverything-yes-everything.html
```

## Q1

### TEEを用いて実現してみたいサービス

TEEはPETsの一種であり、準同型暗号と比較してオーバーヘッドの少ない秘密計算が可能である点が特徴である。

この特性を用いて開発したいプロダクトは、構成証明可能な差分プライバシー適用サービスである。これは、データ利用者からの要求に応じてデータ提供者の生データをDPに基づいて匿名化するクラウドサービスであり、その最大の特徴はTEEの構成証明機能を用いる点にある。

データ提供者は、宣言された通りのプライバシー保護処理が改ざん不可能な環境で確実に実行されたことを暗号学的に検証可能となる。このサービスが必要とされる背景には、従来のプライバシー保護サービスがサービス提供者への信頼に依存していたという課題が存在する。従来、提供者が特定のプライバシーパラメータを適用すると公言してもユーザーはそれを信じるほかなかったが、TEEの構成証明機能を用いることで、ユーザーはデータを送信する前に、サーバー上でデータを処理するプログラムが正しく、改ざんされておらず、正規のTEEハードウェア上で動作していることをリモートで検証できる。

この「信頼」から「検証」への転換こそ、TEEをプライバシー保護に用いる最大の価値である。本サービスの具体的な処理フローは次の通りである。まず、サービス提供者はDP処理を行うEnclaveコードとそのハッシュ値を公開する。データ利用者が分析をリクエストすると、データ提供者はデータを渡す前に構成証明を要求し、Enclaveの正当性を検証する。検証が成功した場合にのみ、データ提供者は生データをTEEとの暗号化通信路を通じて送信する。TEE内では、受け取った生データに対してリクエストされたパラメータに基づきDP処理が施され、統計的に安全になったデータが生成されてデータ利用者に返却される。

この一連のプロセスにおいて、データ提供者、データ利用者、そしてサービス提供者がそれぞれの役割を担うことになる提案は、TEEの高性能さという利点を活かしつつ、構成証明という核心となる機能を組み合わせることで、技術的に検証可能なプライバシー保護という絶対的な安全性を提供できる。

### C/C++を用いた実装の例

私は群馬大学の情報メカトロニクス研究部に所属しており、C++とPlatformIOを用いて幾つかの制御のためのプログラムを作成していました。
また、大学の授業においてC言語で基本的な正規表現に対応した`grep`もどきを作成し、その経験を活かしてJSONのパーサーの作成もしました。
低レイヤにおいては、Linuxカーネルを特定のデバイスに移植するためにドライバの一部の修正を行ったことがあります。

基本的な実装は行える一方で、C++固有のオーバーロードやスマートポインタといったモダンな機能についての理解は乏しいのが現状です。
ゼミ本番までに、理解の乏しい機能やムーブセマンティックといった概念の理解に努めようと思います。

また、Intel SGXのEnclave記述言語についての理解も同様に乏しい状況であり過去のセキュリティキャンプの講義資料やIntelのドキュメントを参考に学習する予定です。

## Q2

### SGXの機能廃止や仕様変更について

多くの開発者や研究者に指摘されている通りIntel SGX及びSGXSDKは非常に複雑であり、通常のアプリケーション開発の何杯もの労力と専門知識を要することで知られている。
そして実際にコミュニティはその労力をセキュリティに投じてきたが、Intel側はそれに対して"11世代以降のCPUにおけるSGXの非推奨"という回答を出した。
私はこれに対してコミュニティに対する裏切りと信用の失墜を招いた行為であり、行動に対して疑念を持たざるを得ないと感じている。

特に、Intel SGXのローカル側でEnclaveを作成するRAを実装した例としてPowerDVDのUHD-BDのAACS2の復号が挙げられる。
これはAACS2の鍵を保有しているサーバーから、PowerDVDを実行しているコンシューマーのPCに対してRAを行い、Enclave内でAACS2の復号を行うものである。
Intelの11世代以降のIntel SGXの非推奨化(Deprecated)により最新のPCではRAに失敗するためUHD-BDを再生できなくなった。
セキュリティと利便性はトレードオフであるとはよく言われる話ではあるが、ベンダー側の一方的な都合によりエンドユーザーに対して不利益が生じるのはいただけないと考える。
こういった変更の繰り返しは企業やTEE技術全体に対しての社会の信用を失い、DRM等への法令遵守の意識やセキュリティに対する意識の低下を招くのではないかと危惧している。

### Intelの急な仕様変更を行った理由の考察

Intel SGXは発表当初は先進的なTEE実装であったものの、現在となっては多くの脆弱性や欠点が見つかっている。
特にForeshadow(L1TF)、Plundervolt、LVI (Load Value Injection)、SGAxe、Crosstalkといった数々のサイドチャネル攻撃が挙げられる。
これらはEnclave開発者側ではなくCPUベンダー(Intel)側の責任の領域の問題であることが多い。
こういった問題の修正はCPUのマイクロコードのアップデートを経由して行われているが、これはUEFIファームウェアのアップデートを通してマザーボードベンダーから行われるため脆弱性の発見から修正までに非常に長い時間がかかりN-day Attackを容易にする等の問題があった。
これらに対し、セキュリティとして重大な問題が発生しうるため強行的に仕様の変更を行ったのではないかと推測される。

また、前述したUHD-BDの復号以外でローカルでのEnclaveを必要とするキラーアプリケーションが登場しなかった。
一方でSGXSDKの開発は複雑であり、コストの増大によってIntelが企業として採算を採るために仕様を変更したのではないかとも考えられる。
SGXの使われ方がPowerDVDのようなサーバーからローカル側へのRAから、ローカルからサーバーへのRAへと変化したというような都合もあり時代の変化に合わせた可能性も考えうる。

同様の内容について私が大学内ゼミにて発表したスライドにおいても言及したが、この内容が正しいのかどうかの決定的な自信が持てないため、本ゼミにてより深い学習を行いと考えている。
https://www.docswell.com/s/hayao/59VPEY-sgx#p35

### Intelが取るべき行動

事前にIntel SGXの将来性についての方針と十分なロードマップを公開し、適切なマイグレーション期間を経て移行を行うべきであったと思う。
特にEPID-RAについては認証がIntel側に依存する等のベンダーロックインの問題があった一方で、セキュリティ的に緊急を要するものではなかったように思う。
また、SGXは単なる機能のDeprecatedに留まらず全体的にドキュメントが不足していることが指摘されている。これはRAのリファレンス実装が不足しているという指摘もあり、
ドキュメントの整備を行うべきに思う。Intel SGX Explainedは概念の説明に留まり実装について具体的な説明をしているわけではないので適切なドキュメントを整備してほしいように思う。

## Q3

VM型と部分隔離型の最大の違いは隔離される粒度であり、それに伴って信用する範囲も大きく異なる。

Enclave内で動作するような小さなプログラムでは相対的に脆弱性に気づきやすいが、OSのような巨大なプログラムにおいては人間の認知能力を大きく上回るため脆弱性の発見や修正が遅れることがある。これは、未発見の脆弱性、特に攻撃者以外誰も気づいていないゼロデイ脆弱性が存在するリスクを高める。

何らかの理由（バッファオーバーフロー等）で任意コード実行の重大な脆弱性を持ったカーネルが動作しており、この脆弱性にはまだ攻撃者以外誰も気づいていないとする。この脆弱性は攻撃者が任意コードを実行できるとする。ある攻撃者Aはこれからこの脆弱性に対しゼロデイ攻撃を行う。

部分隔離型のTEEであればEnclaveの中に侵入することはできないため保護されたままである。まさにこれは特権レベルで動作するカーネルすら信用しないというIntel SGXの脅威モデルそのものである。

一方、VM型TEEの場合、その信頼境界は内部のゲストOSカーネルを含む。もしこのゲストOSカーネルに先述のゼロデイ脆弱性が存在し、VM型TEEの中で動作していたとする。この場合、攻撃者Aがこの脆弱性を悪用してゲストOSカーネル内で任意コード実行を達成すると、VM型TEEが提供する分離メカニズムを迂回し、TEE内部を攻撃者が任意に操作可能となる。これは、VM型TEEの信頼境界がゲストOSカーネルを含むために生じる脆弱性である。

TEE内部のコード量に伴い脆弱性が存在する確率も向上するため、VM型においては内部のゲストOSを安全に保つよう注意する必要がある。

## Q4

### Model Specific Registerとは

Intel 80386で実験的に投入され、その後Pentiumで正式に採用されたものである。
`RDMSR`と`WRMSR`により読み書きを行うことが可能であり、`CPUID`によってそのCPUが持っている機能を特定できるようになった。

### 値の読み取り

`msr-tools`に含まれる`rdmsr`を用いた。

```txt
hayao@Hayao-XPS9350 ~> sudo rdmsr -a 0x10A
df9fd6b
df9fd6b
df9fd6b
df9fd6b
df9fd6b
df9fd6b
df9fd6b
df9fd6b
```

全てのプロセッサにおいて同様の値が返された。

### 値の意味

| アドレス | ビット | 説明 |
| - | - | - |
| 10AH | 0 | RDCL_NO: Rogue Data Cache Load (RDCL) の影響を受けない |
| 10AH | 1 | IBRS_ALL: 強化された Indirect Branch Restriction Speculation (IBRS) をサポート |
| 10AH | 2 | RSBA: RSB Alternateをサポート。RSBが空の場合、RET命令で代替分岐予測子が使用されることがある。retpolineを使用するソフトウェアは、この動作の影響を受ける可能性がある |
| 10AH | 3 | SKIP_L1DFL_VMENTRY: 1の値はハイパーバイザーがVMエントリー時にL1Dをフラッシュする必要がないことを示す |
| 10AH | 4 | SSB_NO: Speculative Store Bypass (SSB) の影響を受けない |
| 10AH | 5 | MDS_NO: Microarchitectural Data Sampling (MDS) の影響を受けない |
| 10AH | 6 | IF_PSCHANGE_MC_NO: プロセッサは、TLBを無効にすることなくコード・ページのサイズを変更することによるマシン・チェック・エラーの影響を受けにくい |
| 10AH | 7 | TSX_CTRL: RTM_DISABLE&nbsp;と&nbsp;TSX_CPUID_CLEAR をサポート |
| 10AH | 8 | TAA_NO: プロセッサーはIntel® Transactional Synchronization Extensions (Intel® TSX) Asynchronous Abort (TAA) の影響を受けません |
| 10AH | 10 | MISC_PACKAGE_CTRLS: プロセッサーはIA32_MISC_PACKAGE_CTRLS MSRをサポートしています |
| 10AH | 11 | ENERGY_FILTERING_CTL: プロセッサーはIA32_MISC_PACKAGE_CTLS[0] (ENERGY_FILTERING_ENABLE) ビットの設定と読み取りをサポート |
| 10AH | 12 | DOITM: プロセッサーはデータオペランド独立タイミングモードをサポートしています |
| 10AH | 13 | SBDR_SSDP_NO: プロセッサーはShared Buffers Data Read (SBDR) 脆弱性またはSideband Stale Data Propagator (SSDP) のどちらの影響も受けない |
| 10AH | 14 | FBSDP_NO: プロセッサーはFill Buffer Stale Data Propagator (FBSDP) の影響を受けない |
| 10AH | 15 | PSDP_NO: プロセッサーはPrimary Stale Data Propagator (PSDP) に関連する脆弱性の影響を受けない |
| 10AH | 16 | MCU_Enumeration: 1の場合、プロセッサーはIA32_MCU_ENUMERATIONおよびIA32_MCU_STATUS MSRをサポートしています |
| 10AH | 17 | FB_CLEAR: プロセッサーはVERW命令によるMD_CLEAR操作の一部として、フィルバッファ値を上書きします。これらのプロセッサーでは、L1D_FLUSHはフィルバッファ値を上書きしない |
| 10AH | 18 | FB_CLEAR_CTRL: プロセッサーはIA32_MCU_OPT_CTRL MSR (MSR 123H) およびそのMSR内のFB_CLEAR_DISビット (ビット位置3) の読み書きをサポートしています。 |
| 10AH | 19 | RRSBA |
| 10AH | 20 | BHI_NO |
| 10AH | 21 | XAPIC_DISABLE_STATUS: IA32_XAPIC_DISABLE_STATUS MSRが存在すること、およびビット0がレガシーxAPICが無効化されAPICステータスがx2APICにロックされているかどうかを指定することを示す |
| 10AH | 23 | OVERCLOCKING_STATUS: 設定されている場合、IA32_OVERCLOCKING STATUS MSRが存在する |
| 10AH | 24 | PBRSB_NO: 1の場合、プロセッサーがポストバリアReturn Stack Buffer予測の影響を受けないことを示す |
| 10AH | 25 | GDS_CTRL: IA32_MCU_OPT_CTRL[4] と IA32_MCU_OPT_CTRL[5] の両方のサポートの列挙です。 |
| 10AH | 26 | GDS_NO: Gather Data Samplingに対して脆弱ではない |
| 10AH | 27 | RFDS_NO: Register File Data Samplingに対して脆弱ではない |
| 10AH | 28 | RFDS_CLEAR: プロセッサーはRegister File Data Samplingに対して脆弱であり、VERW命令はRegister File Data Samplingの影響を受けるバッファを上書きする |
| 10AH | 29 | IGN_UMONITOR_SUPPORT: 1の場合、IA32_MCU_OPT_CTRL[6] (IGN_UMONITOR) をサポート |
| 10AH | 30 | MON_UMON_MITG_SUPPORT: 1の場合、IA32_MCU_OPT_CTRL[7] (MON_UMON_MITG) をサポート |
| 10AH | 32 | PBOPT_SUPPORT: 0の場合IA32_PBOPT_CTRLビット0 (PBOPT) はサポートされていない 1の場合IA32_PBOPT_CTRLビット0 (PBOPT) をサポート |
| 10AH | 62 | ITS_NO: 0の場合ハイパーバイザーはシステムがIndirect Target Selectionの影響を受けないことを示す 1の場合ハイパーバイザーはシステムがIndirect Target Selectionの影響を受ける可能性があることを示す |
| 10AH | 63 | MSR_VIRTUAL_ENUMERATION_SUPPORTED: 0の場合MSR_VIRTUAL_ENUMERATIONをサポートしない 1の場合MSR_VIRTUAL_ENUMERATIONをサポート |

私のPCで取得した値をマッピングすると次のようになる。マップには`echo 1101111110011111110101101011 | rev | fold -w 1`を使用した

| ビット |                                   | 値  |
| ------ | --------------------------------- | --- |
| 0      | RDCL_NO                           | 1   |
| 1      | IBRS_ALL                          | 1   |
| 2      | RSBA                              | 0   |
| 3      | SKIP_L1DFL_VMENTRY                | 1   |
| 4      | SSB_NO                            | 0   |
| 5      | MDS_NO                            | 1   |
| 6      | IF_PSCHANGE_MC_NO                 | 1   |
| 7      | TSX_CTRL                          | 0   |
| 8      | TAA_NO                            | 1   |
| 9      |                                   | 0   |
| 10     | MISC_PACKAGE_CTRLS                | 1   |
| 11     | ENERGY_FILTERING_CTL              | 1   |
| 12     | DOITM                             | 1   |
| 13     | SBDR_SSDP_NO                      | 1   |
| 14     | FBSDP_NO                          | 1   |
| 15     | PSDP_NO                           | 1   |
| 16     | MCU_Enumeration                   | 1   |
| 17     | FB_CLEAR                          | 0   |
| 18     | FB_CLEAR_CTRL                     | 0   |
| 19     | RRSBA                             | 1   |
| 20     | BHI_NO                            | 1   |
| 21     | XAPIC_DISABLE_STATUS              | 1   |
| 22     |                                   | 1   |
| 23     | OVERCLOCKING_STATUS               | 1   |
| 24     | PBRSB_NO                          | 1   |
| 25     | GDS_CTRL                          | 0   |
| 26     | GDS_NO                            | 1   |
| 27     | RFDS_NO                           | 1   |
| 28     | RFDS_CLEAR                        | 0   |
| 29     | IGN_UMONITOR_SUPPORT              | 0   |
| 30     | MON_UMON_MITG_SUPPORT             | 0   |
| 31     |                                   | 0   |
| 32     | PBOPT_SUPPORT                     | 0   |
| 62     | ITS_NO                            | 0   |
| 63     | MSR_VIRTUAL_ENUMERATION_SUPPORTED | 0   |

### それぞれのビットの意味の説明

各ビットは投機的実行に起因する脆弱性Spectreや同時期に発見されたMeltdownに対する対応状況を示している。

具体的な脆弱性とそれに対する対応状況を示すために使われているが半分以上のビットは今後のために予約されており、現在は割り当てられていない。

本レポートにおいて、作成期間中に全てのビットについて詳細な調査を行うことができず、一部のビットについてのみ自身が調べた概要を述べる。

#### 22番目のビットについて

Intelの公式ドキュメント上では、22は特別な意味が割り当てられていなかったが私のPC(Dell XPS 9350)では1となっていた。

これは私のPCのCPUが非常に新しい(Intel Core Ultra 7 258V)ことに起因していると推測している。
既に22番目のビットは非常に新しいCPUでなにかの役割を持っている一方で、まだ正式に文書化されていないのではないかと考える。

#### 0. Rogue Data Cache Load (RDCL)

Meltdownの影響を受けるかどうか。投機的実行機能とキャッシュサイドチャネルを悪用して、権限のないユーザーモードプロセスが機密性の高いカーネルメモリの内容が読み取られてしまう危険性のある脆弱性。

#### 1. Indirect Branch Restriction Speculation(IBRS_ALL)

pectre Variant 2(分岐ターゲットインジェクション)に対する緩和策の1つ。低い権限で実行されているコードが、高いレベルのコードの投機的実行予測を制御できないように制限する。顕著なパフォーマンスに対するオーバーヘッドが存在する。

#### 2. RSBA

リターンスタックバッファ（RSB）が空になった状態でRET命令が実行された際に、CPUはリターンターゲットの予測を決定するために、分岐ターゲットバッファ（BTB）などの代替予測器にフォールバックする。このフォールバック先が意図的に操作されやすく、攻撃者の意図しているアドレスにジャンプさせられる危険性がある。

#### 3. SKIP_L1DFL_VMENTRY

Cascade Lake以降に実装された、L1DFに対するハードウェア的な緩和策。

#### 4. SSB

Variant 4としても知られ、メモリディスアンビギュエーションと呼ばれる性能最適化メカニズムに起因する。投機的実行により書き換えが終わる前に古いメモリを読み取ってしまう危険性があり、これにより特権を持った仮想マシンやサンドボックスの値を覗ける危険性がある。

#### 5. MDS

ZombieLoad、RIDL、Falloutとも呼ばれる。投機的実行のためにCPU内部の一時バッファが、仮に破棄されたとしても痕跡を残すことを悪用し、サイドチャネル攻撃によってその一部が読み取られる脆弱性。

#### 6. IF_PSCHANGE_MC_NO

近年のモダンなOSやCPUはより大きなページサイス(スーパーページ)をサポートしている。
特定の状態でそのページサイズを変更すると、MAchine Check Errorが発生することがある。この挙動を悪用することで仮想マシン上でシステムダウンを引き起こす恐れがある。(CVE-2018-12207)
Translation Lookaside Bufferを無効化することで回避できるが、そのかわりにパフォーマンスが悪化する。

#### 7. TSX_CTRL

Intel Transactional Synchronization Extensionsを無効化するための機能が存在しているかどうかを示す。

この機能には脆弱性が報告されている。

#### 8. TAA_NO

Intel Transactional Synchronization Extensionsにおいて、トランザクションが非同期的に終了した際の投機的に読み出したデータがサイドチャネル攻撃によって攻撃者に推定されてしまう脆弱性(CVE-2019-11135)の影響を受けない。

#### 10. MISC_PACKAGE_CTRLS

`ENERGY_FILTERING_ENABLE`のような機能のオンオフをサポートしているかどうかを示す。

#### 11. ENERGY_FILTERING_CTL

Intel TDXにおいて、電源に関するサイドチャネル攻撃に対しての設定をサポートしているかどうか。

### 参考文献

今回の文献の収集の一部にGoogle GeminiのDeepResearchを用いている。

- https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/best-practices/reading-writing-msrs-in-linux.html
- https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/technical-documentation/cpuid-enumeration-and-architectural-msrs.html
- https://lore.kernel.org/lkml/20250529180352.1935517-1-dave.hansen@linux.intel.com/
- セキュリティキャンプ講義資料 – Cliffford Terminal – aos' website
  https://qliphoth.io/seccamp/
- 【技術】TEE（Trusted Execution Environment）とは？
  https://acompany.tech/privacytechlab/trusted-execution-environment
- 【技術】Intel SGXの難しさとジレンマ
  https://acompany.tech/privacytechlab/intelSGX-dilemma
- 【技術】Intel SGX Attestation詳説 - Local Attestation編
  https://acompany.tech/privacytechlab/sgx-local-attestation
- 【技術】Intel SGX Attestation詳説 - EPID Remote Attestation編
  https://acompany.tech/privacytechlab/sgx-remote-attestation
- 【技術】Intel SGX - DCAP-RA解体新書
  https://acompany.tech/privacytechlab/intel-sgx-dcap-ra
- 【技術】Intel SGX - MAA版DCAP-RA移行戦闘記
  https://acompany.tech/privacytechlab/MAA-DCAP-RA
- Intel SGX入門 - SGX基礎知識編 #IntelSGX - Qiita
  https://qiita.com/Cliffford/items/2f155f40a1c3eec288cf
- Intel SGX Explained
  Victor Costan and Srinivas Devadas(2016)
  https://eprint.iacr.org/2016/086.pdf
- SGX.Fail
  https://sgx.fail/
- SoK: SGX.Fail: How Stuff Gets eXposed
  Stephan van Schaik
  https://sgx.fail/files/sgx.fail.pdf
- An Overview of Vulnerabilities and Mitigations of Intel SGX and Intel TDX Applications
  https://cyber.ee/uploads/report_2025_sgx_19b89d79ed.pdf
- HyperEnclave: Enhancing the I/O Security of SGX
  ZILONG NAN
  https://kth.diva-portal.org/smash/get/diva2:1947203/FULLTEXT02.pdf
- Survey on Trusted Execution Environments
  https://www.net.in.tum.de/fileadmin/TUM/NET/NET-2022-07-1/NET-2022-07-1_05.pdf
- intel/linux-sgx: Intel SGX for Linux*
  https://github.com/intel/linux-sgx
- sgx_tseal 1.1.1 - Docs.rs
  https://docs.rs/crate/sgx_tseal/latest
- SGX-Bleed Proof-of-Concept codes
  https://github.com/hello31337/seccamp2023-l5/tree/master/sgx-tmp
- intel/SGXDataCenterAttestationPrimitives
  https://github.com/intel/SGXDataCenterAttestationPrimitives
- Home | SGX 101
  https://sgx101.gitbook.io/sgx101
- Trusty TEE  |  Android Open Source Project
  https://source.android.com/docs/security/features/trusty?hl=ja
- Intel SGX2 / Enclave Dynamic Memory Management Patches Posted for Linux-Phoronix
  https://www.phoronix.com/news/Intel-SGX2-Linux-Patches
- 安全なデータ活用のためのプライバシー強化技術(PETs)の活用
  https://www.ppc.go.jp/files/pdf//241203-1_hearing_material-4.pdf

以下はDeepResearchとNotebookLMを用いて広範囲に調査した際に用いられた資料である。全てのソースについて情報源を確認しているが、量が膨大であることと私の脆弱性に対する知識不足によって情報が適切であり間違いがないかどうかを確実に確認することはできなかった。

- blogs.oracle.com
  https://blogs.oracle.com/linux/post/understanding-spectre-v2-mitigations-on-x86#:~:text=Indirect%20Branch%20Restricted%20Speculation%20(IBRS,branch%20targets%20in%20the%20kernel.
- Indirect Branch Restricted Speculation - Intel
  https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/technical-documentation/indirect-branch-restricted-speculation.html
- spectre.rst - The Linux Kernel Archives
  https://www.kernel.org/doc/Documentation/admin-guide/hw-vuln/spectre.rst
- White Paper | AMD64 TECHNOLOGY INDIRECT BRANCH CONTROL EXTENSION
  https://www.amd.com/content/dam/amd/en/documents/processor-tech-docs/white-papers/111006-architecture-guidelines-update-amd64-technology-indirect-branch-control-extension.pdf
- Red Hat Aiming To Address IBRS Mitigation Still Being Too Costly On Performance
  https://www.phoronix.com/news/Red-Hat-Disable-IBRS-When-Idle
- Spectre-v2 mitigation wreaks havoc on the performance of some Intel
https://www.notebookcheck.net/Spectre-v2-mitigation-wreaks-havoc-on-the-performance-of-some-Intel-CPUs-as-AMD-chips-come-out-largely-unscathed.607925.0.html
- Linux Kernel Default Processor Security Mitigation Changes and
  https://blogs.vmware.com/performance/2022/10/linux-kernel-default-processor-security-mitigation-changes-and-vmware-performance.html
- Is there a microcode or other hardware fix for Meltdown? - Information Security Stack Exchange
  https://security.stackexchange.com/questions/176788/is-there-a-microcode-or-other-hardware-fix-for-meltdown
- What you need to know about the MDS vulnerability and Red Hat Virtualization
  https://www.redhat.com/en/blog/what-you-need-know-about-mds-vulnerability-and-red-hat-virtualization
- Microsoft Rolling Out Retpoline Optimizations Update to Reduce Performance Impact of Spectre 2 Mitigations - PC Perspective,
  https://pcper.com/2019/03/microsoft-rolling-out-retpoline-optimizations-update-to-reduce-performance-impact-of-spectre-2-mitigations/
- A Secret-Free Hypervisor: Rethinking Isolation in the Age of Speculative Vulnerabilities - Microsoft
  https://www.microsoft.com/en-us/research/wp-content/uploads/2022/07/sf-hypervisor.pdf
- Spectre Security Vulnerability | GeeksforGeeks
  https://www.geeksforgeeks.org/spectre-security-vulnerability/
- Spectre Attacks: Exploiting Speculative Execution
  https://www.spectreattack.com/spectre.pdf
- Speculative execution - Wikipedia
  https://en.wikipedia.org/wiki/Speculative_execution
- Meltdown and Spectre: The Risk Manager's Guide - Lumifi Cyber
  https://www.lumificyber.com/blog/meltdown-and-spectre-the-risk-managers-guide/
- The Evolution of Transient-Execution Attacks - Daniel Gruss
  https://gruss.cc/files/transient-attacks.pdf
- Spectre (security vulnerability) - Wikipedia
  https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)
- [Solved] Windows Speculative Execution Configuration Check Vulnerabilities - Fix The Risk
  https://fixtherisk.in/solved-windows-speculative-execution-configuration-check-vulnerabilities/
- 54 Survey of Transient Execution Attacks and Their Mitigations
  https://bearhw.ece.vt.edu/content/dam/bearhw_ece_vt_edu/publications/2021_CSUR_Survey.pdf
- Spectre Side Channels - The Linux Kernel documentation
  https://docs.kernel.org/admin-guide/hw-vuln/spectre.html
- Understanding Spectre v2 Mitigations on x86 - Oracle Blogs
  https://blogs.oracle.com/linux/post/understanding-spectre-v2-mitigations-on-x86
- blogs.vmware.com
  https://blogs.vmware.com/performance/2022/10/linux-kernel-default-processor-security-mitigation-changes-and-vmware-performance.html#:~:text=Researchers%20demonstrated%20that%20the%20Indirect,much%20smaller%20impact%20on%20performance.
- Researchers Uncover New 'Indirector' CPU Vulnerability in Intel Chips - The Cyber Express
  https://thecyberexpress.com/indirector-cpu-vulnerability-intel-chips/
- Linux Inadvertently Has Been Leaving IBRS-Mitigated Systems Without STIBP - Phoronix
  https://www.phoronix.com/news/Linux-IBRS-With-STIBP-Patch
- Re: [PATCH v2 1/2] x86/speculation: Allow enabling STIBP with legacy IBRS - Linux-stable-mirror - lists.linaro.org
  https://lists-ec2.96boards.org/archives/list/linux-stable-mirror@lists.linaro.org/message/XCPEIDNI7HMMX7CZBZXYCNCCDFERVBQE/
- L1TF - Security vulnerabilities - Ubuntu Community Hub
  https://discourse.ubuntu.com/t/l1tf/55875
- CPU Vulnerability Mitigation Options - Ditana GNU/Linux
  https://ditana.org/docs/the-installer/kernel_configuration/mitigation/
- 1930733 – Cluster upgrade fails when using Intel Skylake Client/Server IBRS SSBD MDS Family - Red Hat Bugzilla
  https://bugzilla.redhat.com/show_bug.cgi?id=1930733
- VMware EVC and CPU Compatibility FAQ - Broadcom support portal
  https://knowledge.broadcom.com/external/article/313545/vmware-evc-and-cpu-compatibility-faq.html
- QEMU / KVM CPU model configuration
  https://qemu-project.gitlab.io/qemu/system/qemu-cpu-models.html
- The Reasons for poor performance of Windows when the CPU type is host
  https://forum.proxmox.com/threads/the-reasons-for-poor-performance-of-windows-when-the-cpu-type-is-host.163114/
- This paper is included in the Proceedings of the 2022 USENIX Annual Technical Conference. Hardening Hypervisors with Ombro,
  https://www.usenix.org/system/files/atc22-johnson.pdf
- Transactional Synchronization Extensions - Wikipedia
  https://en.wikipedia.org/wiki/Transactional_Synchronization_Extensions
- TAA - TSX Asynchronous Abort - The Linux Kernel documentation
  https://docs.kernel.org/admin-guide/hw-vuln/tsx_async_abort.html
- Intel® Transactional Synchronization Extensions (Intel® TSX) Overview - Portal NACAD |
  http://portal.nacad.ufrj.br/online/intel/compiler_c/common/core/GUID-FB2F2539-18F5-4D5A-B814-F29FD0C32326.htm
- Transactional Memory Support: The speculative_spin_mutex - Intel
  https://www.intel.com/content/www/us/en/developer/articles/technical/transactional-memory-speculative-spin-mutex-tbb.html
- rtm - Rust
  https://valarauca.github.io/rtm/rtm/index.html
- Exploring Intel® Transactional Synchronization Extensions with Intel® Software Development Emulator
  https://www.intel.com/content/www/us/en/developer/articles/community/exploring-tsx-with-software-development-emulator.html
- Intel® Transactional Synchronization Extensions (Intel® TSX) Memory and Performance Monitoring Update for Intel® Processors
  https://www.intel.com/content/www/us/en/support/articles/000059422/processors.html
- Intel® Transactional Synchronization Extension (Intel® TSX) Disable Update for Selected Processors
  https://cdrdv2-public.intel.com/643557/Intel-TSX-Deprecation-643557-0023-20230608.pdf
- www.kernel.org
  https://www.kernel.org/doc/Documentation/x86/tsx_async_abort.rst
- Intel® Trust Domain Extensions (Intel® TDX) Module Architecture Application Binary Interface (ABI) Reference Specification
  https://cdrdv2-public.intel.com/795475/intel-tdx-module-1.5-abi-spec-348551003.pdf
- Errata Prompts Intel To Disable TSX In Haswell, Early Broadwell CPUs - Slashdot
  https://hardware.slashdot.org/story/14/08/12/182200/errata-prompts-intel-to-disable-tsx-in-haswell-early-broadwell-cpus
- KB4072698: Windows Server and Azure Stack HCI guidance to protect against silicon-based microarchitectural and speculative execution side-channel vulnerabilities - Microsoft Support
  https://support.microsoft.com/en-us/topic/kb4072698-windows-server-and-azure-stack-hci-guidance-to-protect-against-silicon-based-microarchitectural-and-speculative-execution-side-channel-vulnerabilities-2f965763-00e2-8f98-b632-0d96f30c8c8e
- Guidance for disabling Intel® Transactional Synchronization Extensions (Intel® TSX) capability - Microsoft Support
  https://support.microsoft.com/en-us/topic/guidance-for-disabling-intel-transactional-synchronization-extensions-intel-tsx-capability-0e3a560c-ab73-11d2-12a6-ed316377c99c
- CVE-2019-11135 - Red Hat Customer Portal
  https://access.redhat.com/security/cve/cve-2019-11135
- 投機実行のサイドチャネル攻撃 | iSUS
  https://www.isus.jp/security/speculative-execution-side-channel-mitigations/
- TAA - TSX Asynchronous Abort - The Linux Kernel documentation
  https://docs.kernel.org/admin-guide/hw-vuln/tsx_async_abort.html
- Transient execution CPU vulnerability - Wikipedia
  https://en.wikipedia.org/wiki/Transient_execution_CPU_vulnerability
- Intel Side Channel Vulnerabilities: MDS and TAA
  https://www.intel.com/content/www/us/en/architecture-and-technology/mds.html
- CLASS ACTION ALLEGATION COMPLAINT Steve D. Larson, OSB No. 863540 Email
  https://truthinadvertising.org/wp-content/uploads/2020/07/Blue-Peak-Hosting-v-Intel-Corp-complaint.pdf
- (PDF) Adaptive Versioning in Transactional Memory Systems - ResearchGate
  https://www.researchgate.net/publication/352023044_Adaptive_Versioning_in_Transactional_Memory_Systems
- SecurityTeam/KnowledgeBase/TAA_MCEPSC_i915 - Ubuntu Wiki
  https://wiki.ubuntu.com/SecurityTeam/KnowledgeBase/TAA_MCEPSC_i915
- TAA MCEPSC i915 - Security vulnerabilities - Ubuntu Discourse
  https://discourse.ubuntu.com/t/taa-mcepsc-i915/55886
- INTEL-SA-00270
  https://www.intel.com/content/www/us/en/security-center/advisory/intel-sa-00270.html
- Processor MMIO Stale Data Vulnerabilities - 英特尔
  https://www.intel.cn/content/www/cn/zh/developer/articles/technical/software-security-guidance/technical-documentation/processor-mmio-stale-data-vulnerabilities.html
- OLVM: Host CPU Type Is Not Compatible With Cluster Properties - Secure Intel Icelake Server Family - My Oracle Support
  https://support.oracle.com/knowledge/Oracle%20Linux%20and%20Virtualization/2979049_1.html
- SECURITY INFORMATION SUMMARY - Dynabook
  https://aps2.support.emea.dynabook.com/kb0/TSB81036Y0000R01_DBE_SecurityVulnerabilities_092020.pdf
- SECURITY INFORMATION SUMMARY - Dynabook
  https://aps2.support.emea.dynabook.com/kb0/TSB81036Y0000R01_DBE_SecurityVulnerabilities_112021.pdf
- QEMU / KVM CPU model configuration
  https://qemu-project.gitlab.io/qemu/system/qemu-cpu-models.html
- Transactional Synchronization Extensions - Wikipedia
  https://en.wikipedia.org/wiki/Transactional_Synchronization_Extensions
- Chapter 3. Important Changes to External Kernel Parameters | 7.8 Release Notes | Red Hat Enterprise Linux
  https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/7.8_release_notes/kernel_parameters_changes
- 7.8 Release Notes | Red Hat Enterprise Linux | 7
  https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html-single/7.8_release_notes/index
- Cascade Lake - Phoronix
  https://www.phoronix.com/search/Cascade+Lake
- VMSA-2019-0020:VMware ESXi, Workstation, and Fusion patches provide Hypervisor-Specific Mitigations for Speculative-Execution Vulnerabilities - Broadcom support portal
  https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/23565
- Linux Attack Vector Controls Updated To More Easily Controlling CPU Security Mitigations
  https://www.phoronix.com/news/Linux-CPU-Attack-Vector-Control
- The Combined Impact Of Mitigations On Cascade Lake Following ...
  https://www.phoronix.com/review/cascadelake-jcc-taa
- [BUG]: Intel TSX significantly reduces performance on AMD CPU · Issue #100 - GitHub
  https://github.com/meetrevision/playbook/issues/100
- The Firefox + Chrome Web Browser Performance Impact From Intel's JCC Erratum Microcode Update - Phoronix
  https://www.phoronix.com/review/jcc-firefox-chrome
- Microarchitectural Data Sampling - Wikipedia
  https://en.wikipedia.org/wiki/Microarchitectural_Data_Sampling
- MDS - Microarchitectural Data Sampling - CVE-2018-12130, CVE-2018-12126, CVE-2018-12127, and CVE-2019-11091 | Red Hat Customer Portal
  https://access.redhat.com/security/vulnerabilities/mds
- Spectre and Meltdown explained: A comprehensive guide for professionals - TechRepublic
  https://www.techrepublic.com/article/spectre-and-meltdown-explained-a-comprehensive-guide-for-professionals/
- Side Channel Vulnerability, Microarchitectural Data Sampling Advisory, SA-00233 - Intel
  https://www.intel.com/content/www/us/en/support/articles/000033424/processors.html
- Microarchitectural Data Sampling (a.k.a. MDS, ZombieLoad, RIDL & Fallout) | Hewlett Packard Enterprise Critical Product Security Vulnerability Alerts - HPE Support
  https://support.hpe.com/hpesc/public/docDisplay?docId=sd00001284en_us&page=GUID-34DE165A-62FC-4BB1-84C8-A674DBF63BD2.html
- KB4073757: Protect Windows devices against silicon-based microarchitectural and speculative execution side-channel vulnerabilities - Microsoft Support
  https://support.microsoft.com/en-us/topic/kb4073757-protect-windows-devices-against-silicon-based-microarchitectural-and-speculative-execution-side-channel-vulnerabilities-a0b9f66c-f426-d854-fdbb-0e6beaeeee87
- INTEL-SA-00233
  https://www.intel.com/content/www/us/en/security-center/advisory/intel-sa-00233.html
- Bitdefender Researchers Discover New Side-Channel Attack
  https://www.bitdefender.com/en-au/blog/businessinsights/bitdefender-researchers-discover-new-side-channel-attack
- Health-related quality of life and vulnerability among people with myelodysplastic syndromes: a US national study
  https://pmc.ncbi.nlm.nih.gov/articles/PMC10362255/
- Relationship of MDS, Vulnerability, and Health-Related Quality of Life | ASH Clinical News
  https://ashpublications.org/ashclinicalnews/news/7221/relationship-of-mds-vulnerability-and-health
- Connectivity Cisco-MDS: Intel Vulnerabilities | Dell US
  https://www.dell.com/support/kbdoc/en-us/000188896/connectivity-cisco-mds-intel-vulnerabilities
- CROSSTalk - vusec
  https://www.vusec.net/projects/crosstalk/
- DSA-2019-185: RSA Netwitness Logs & Network Security Update for Intel-SA-00233
  https://community.netwitness.com/s/article/DSA-2019-185-RSANetwitnessLogs-and-NetworkSecurityUpdateforIntel-SA-00233
- What are the differences between Meltdown and Spectre? - Stack Overflow
  https://stackoverflow.com/questions/48200753/what-are-the-differences-between-meltdown-and-spectre
  - Speculative Store Bypass - Wikipedia
  https://en.wikipedia.org/wiki/Speculative_Store_Bypass
- New Spectre (Variant 4) CPU Flaw Discovered—Intel, ARM, AMD Affected
  https://thehackernews.com/2018/05/fourth-critical-spectre-cpu-flaw.html
- Analysis and mitigation of speculative store bypass (CVE-2018-3639) | MSRC Blog
  https://msrc.microsoft.com/blog/2018/05/analysis-and-mitigation-of-speculative-store-bypass-cve-2018-3639/
- Kernel Side-Channel Attack using Speculative Store Bypass - CVE-2018-3639 | Red Hat Customer Portal
  https://access.redhat.com/security/vulnerabilities/ssbd
- Speculative Store Bypass explained: what it is, how it works - Red Hat
  https://www.redhat.com/en/blog/speculative-store-bypass-explained-what-it-how-it-works
- Intel and AMD CPUs vulnerable to a new speculative execution attack : r/hardware - Reddit
  https://www.reddit.com/r/hardware/comments/vxf92h/intel_and_amd_cpus_vulnerable_to_a_new/
- Speculative Store ByPass (CVE-2018-3639, CVE-2018-3640) impact on Dell products
  https://www.dell.com/support/kbdoc/en-us/000177778/speculative-store-bypass-cve-2018-3639-cve-2018-3640-impact-on-dell-products
- How to fully patch CVE-2018-3639, Speculative Store Bypass Vulnerability
  https://www.secpod.com/blog/how-to-fully-patch-cve-2018-3639-speculative-store-bypass-vulnerability/
- About Mitigating Speculative Store Bypass (SSB) - CVE-2018-3639 (QID 91462)
  https://qualys.my.site.com/discussions/s/article/000003254
- Benchmarking The Performance Impact Of Speculative Store Bypass Disable For Spectre V4 On Intel Core i7 - Phoronix
  https://www.phoronix.com/review/intel-spectre-ssbd
- Intel Processor Speculative Cross Store Bypass Advisory - Lenovo Support US
  https://support.lenovo.com/us/en/product_security/ps500491-intel-processor-speculative-cross-store-bypass-advisory
- Speculative Code Store Bypass - Intel
  https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/advisory-guidance/speculative-code-store-bypass.html
- Speculative Code Store Bypass (SCSB) and Floating-Point Value Injection (FPVI) Advisory - Lenovo Support MX
  https://support.lenovo.com/mx/en/solutions/ps500420-speculative-code-store-bypass-scsb-and-floating-point-value-injection-fpvi-advisory
- Speculative Code Store Bypass and Floating-Point Value Injection - AMD
  https://www.amd.com/en/resources/product-security/bulletin/amd-sb-1003.html
- Spectre (security vulnerability) - Wikipedia
  https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)
- What are the differences between Meltdown and Spectre? - Stack Overflow
  https://stackoverflow.com/questions/48200753/what-are-the-differences-between-meltdown-and-spectre
- CVE-2023-53024 Detail - NVD
  https://nvd.nist.gov/vuln/detail/CVE-2023-53024
- SSBS: Speculative Store Bypass Safe - Arm A-profile Architecture Registers
  https://developer.arm.com/documentation/ddi0601/latest/AArch64-Registers/SSBS--Speculative-Store-Bypass-Safe
- PSSBB: Physical Speculative Store Bypass Barrier. - Arm A64 Instruction Set Architecture
  https://developer.arm.com/documentation/ddi0596/2020-12/Base-Instructions/PSSBB--Physical-Speculative-Store-Bypass-Barrier-
- Supported CPU Generation Names for Advanced Processor Compatibility - Nutanix Portal
  https://portal.nutanix.com/page/documents/details?targetId=AHV-Admin-Guide-v6_8:ahv-advanced-processor-compatibility-supported-cpu-families-c.html
- Different CPU capabilities - qemu - Stack Overflow
  https://stackoverflow.com/questions/76655836/different-cpu-capabilities
- Ubuntu Server team update - 15 July 2019
  https://discourse.ubuntu.com/t/ubuntu-server-team-update-15-july-2019/11855
- CPUID_7_0_EDX_ARCH_CAPABILITIES is not enabled in VM. - Launchpad Bugs
  https://bugs.launchpad.net/bugs/1828495
- Using WinDbg Over KDNet on QEMU-KVM - OSR
  https://www.osr.com/blog/2021/10/05/using-windbg-over-kdnet-on-qemu-kvm/
- Adaptive Voxel-Weighted Loss Using L1 Norms in Deep Neural Networks for Detection and Segmentation of Prostate Cancer Lesions in PET/CT Images - arXiv
  https://arxiv.org/html/2502.02756v1
- [2502.02756] Adaptive Voxel-Weighted Loss Using L1 Norms in Deep Neural Networks for Detection and Segmentation of Prostate Cancer Lesions in PET/CT Images - arXiv
  https://arxiv.org/abs/2502.02756
- Intel Side Channel Vulnerability L1TF
  https://www.intel.com/content/www/us/en/architecture-and-technology/l1tf.html
- Microsoft Guidance to mitigate L1TF variant - Endpoint Vulnerability | FortiGuard Labs
  https://fortiguard.fortinet.com/encyclopedia/endpoint-vuln/50483
- L1TF - L1 Terminal Fault - The Linux Kernel documentation
  https://docs.kernel.org/admin-guide/hw-vuln/l1tf.html
- L1TF - L1 Terminal Fault - The Linux Kernel Archives
  https://www.kernel.org/doc/Documentation/admin-guide/l1tf.rst
- L1TF - L1 Terminal Fault — The Linux Kernel documentation
  https://www.kernel.org/doc/html/v4.19/admin-guide/l1tf.html
- Cascade Lake - Wikipedia
  https://en.wikipedia.org/wiki/Cascade_Lake
- Cascade Lake: Overview - Intel
  https://www.intel.com/content/www/us/en/products/platforms/details/cascade-lake.html
- Security Vulnerability: "L1 Terminal Fault" (L1TF) – Hypervisor Information (CVE-2018-3620, CVE-2018-3646, XSA-273). | Support | SUSE
  https://www.suse.com/support/kb/doc/?id=000019216
- L1 Terminal Fault Mitigation — Project ACRN™ 3.4-unstable documentation
  https://projectacrn.github.io/latest/developer-guides/l1tf.html
- CPU Vulnerability Mitigation Options - Ditana GNU/Linux
  https://ditana.org/docs/the-installer/kernel_configuration/mitigation/
- L1D Flushing — The Linux Kernel documentation
  https://docs.kernel.org/admin-guide/hw-vuln/l1d_flush.html
- Detailed Specifications of the "Cascade Lake SP" Intel Xeon Processor Scalable Family CPUs - Microway
  https://www.microway.com/knowledge-center-articles/detailed-specifications-of-the-cascade-lake-sp-intel-xeon-processor-scalable-family-cpus/
- Advanced Processor Compatibility in AHV - Nutanix
  https://portal.nutanix.com/docs/AHV-Admin-Guide-v10_0:ahv-advanced-processor-compatibility-c.html
- LibvirtXMLCPUModel - OpenStack Wiki
  https://wiki.openstack.org/wiki/LibvirtXMLCPUModel
- 2107503 – RHEL 8.6 VM with "qemu64" CPU model can't start because "the CPU is incompatible with host CPU - Red Hat Bugzilla
  https://bugzilla.redhat.com/show_bug.cgi?id=2107503
- Passing QEMU command line options through libvirt - VFIO tips and tricks
  http://vfio.blogspot.com/2016/09/passing-qemu-command-line-options.html
- QEMU - Gentoo Wiki
  https://wiki.gentoo.org/wiki/QEMU
- libvirt/domain - Gentoo Wiki
  https://wiki.gentoo.org/wiki/Libvirt/domain
- Red Hat BugID RHEL-10090 - [AMD] CPU flags don't match between QEMU cmdline a... - BugZero
  https://www.findbugzero.com/operational-defect-database/vendors/rh/defects/RHEL-10090
- libvirt cpu-mode='host-model' confuses while mapping cpu models? - Server Fault
  https://serverfault.com/questions/824566/libvirt-cpu-mode-host-model-confuses-while-mapping-cpu-models
- Ape-xCV/Nika-Read-Only - GitHub
  https://github.com/Ape-xCV/Nika-Read-Only
- KVM won't do L1D flush - Stack Overflow
  https://stackoverflow.com/questions/75550493/kvm-wont-do-l1d-flush
- [libvirt] migration: larger->E3: vm failed with "failed to set MSR 0x202 to 0x380000000000"
  https://bugzilla.redhat.com/show_bug.cgi?id=2171860
- LiveMigration fails due to missing CPU features · Issue #12519 - GitHub
  https://github.com/kubevirt/kubevirt/issues/12519
- Live migration fails : r/HyperV - Reddit
  https://www.reddit.com/r/HyperV/comments/1akaexv/live_migration_fails/
- What To Do When Live Migration Fails On Hosts With The Same CPU - Altaro
  https://www.altaro.com/hyper-v/live-migration-fails-same-cpu/
- Guidance for mitigating L1 Terminal Fault in Azure Stack - Microsoft Support
  https://support.microsoft.com/en-au/topic/guidance-for-mitigating-l1-terminal-fault-in-azure-stack-bb87c8cd-fd92-c16e-ab96-98aaf65884bc
- Configure and run a QEMU-based VM outside of libvirt with virt-manager | Red Hat Developer
  https://developers.redhat.com/blog/2020/03/06/configure-and-run-a-qemu-based-vm-outside-of-libvirt
- [edk2-devel] [PATCH v2] Update Architecture MSR to follow latest SDM. - Patchew
  https://patchew.org/EDK2/20230113081904.803-1-william2.wang@intel.com/
- Data Operand Independent Timing Instruction Set Architecture (ISA) Guidance - Intel
  https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/best-practices/data-operand-independent-timing-isa-guidance.html
- Let's DOIT: Using Intel's Extended HW/SW Contract for Secure Compilation of Crypto Code
  https://eprint.iacr.org/2025/759
- Are any instructions affected by IA32_UARCH_MISC_CTL[DOITM] in existing CPUs?
  https://stackoverflow.com/questions/76309278/are-any-instructions-affected-by-ia32-uarch-misc-ctldoitm-in-existing-cpus
- Intel's "DOITM" Security Feature Not Intended For Always-On Use, Linux Patches To Be Revised - Phoronix
  https://www.phoronix.com/news/Intel-DOITM-Not-Always-On
- MCDT Data Operand Independent Timing Instructions - Intel
  https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/resources/mcdt-data-operand-independent-timing-instructions.html
- oss-sec: Data operand dependent timing on Intel and Arm CPUs - Seclists.org
  https://seclists.org/oss-sec/2023/q1/51
- Windows API index - Win32 apps - Learn Microsoft
  https://learn.microsoft.com/en-us/windows/win32/apiindex/windows-api-list
- Intel Raptor Lake DODT Benchmark Performance ...
  https://openbenchmarking.org/result/2301263-PTS-INTELRAP71
- Xeon Platinum 8380 DODT Mitigation Impact Benchmarks - OpenBenchmarking.org
  https://openbenchmarking.org/result/2301271-NE-XEONPLATI60&sgm=1&ppt=D
- Using Intel's Extended HW/SW Contract for Secure Compilation of Crypto Code
  https://eprint.iacr.org/2025/759.pdf
- KVA Shadow: Mitigating Meltdown on Windows | MSRC Blog
  https://msrc.microsoft.com/blog/2018/03/kva-shadow-mitigating-meltdown-on-windows/
- A Clear Guide to Meltdown and Spectre Patches - Alert Logic
  https://www.alertlogic.com/blog/a-clear-guide-to-meltdown-and-spectre-patches/
- Reading privileged memory with a side-channel - Project Zero
  https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html
- About speculative execution vulnerabilities in ARM-based and Intel ...
  https://support.apple.com/en-us/101886
- Meltdown and Spectre Side-Channel Vulnerability Guidance | CISA
  https://www.cisa.gov/news-events/alerts/2018/01/04/meltdown-and-spectre-side-channel-vulnerability-guidance
- VULNERABILITIES AFFECTING MODERN PROCESSORS
  https://www.nsa.gov/portals/75/documents/what-we-do/cybersecurity/professional-resources/csa-vulnerabilities-affecting-modern-processors.pdf
- Meltdown (security vulnerability) - Wikipedia
  https://en.wikipedia.org/wiki/Meltdown_(security_vulnerability)
- Meltdown and Spectre, one year on: Feared CPU slowdown never really materialized | The Daily Swig - PortSwigger
  https://portswigger.net/daily-swig/meltdown-and-spectre-one-year-on-feared-cpu-slowdown-never-really-materialized
- (PDF) Meltdown - ResearchGate
  https://www.researchgate.net/publication/322305793_Meltdown
- Meltdown and Spectre: The Risk Manager's Guide - Lumifi Cyber
  https://www.lumificyber.com/blog/meltdown-and-spectre-the-risk-managers-guide/
- System Performance Implications of Meltdown, Spectre, and L1TF Vulnerabilities
  https://documentation.suse.com/sbp/security/html/SBP-Spectre-Meltdown-L1TF/index.html
- Meltdown Security Vulnerability | GeeksforGeeks
  https://www.geeksforgeeks.org/meltdown-security-vulnerability/
- Meltdown exploit in a can - Go meltdown yourself! - Schutzwerk
  https://www.schutzwerk.com/en/blog/meltdown-in-a-can/
- Modern Hardware Security: A Review of Attacks and Countermeasures - arXiv
  https://arxiv.org/html/2501.04394v1
- List of Intel's processors affected by Spectre and Meltdown. :: Hardware and Operating Systems - Steam Community
  https://steamcommunity.com/discussions/forum/11/1621726179573591787/?l=spanish&ctp=3
- List of Intel's processors affected by Spectre and Meltdown. :: Hardware and Operating Systems - Steam Community
  https://steamcommunity.com/discussions/forum/11/1621726179573591787/
- KB4073119: Windows client guidance for IT Pros to protect against ...
  https://support.microsoft.com/en-us/topic/kb4073119-windows-client-guidance-for-it-pros-to-protect-against-silicon-based-microarchitectural-and-speculative-execution-side-channel-vulnerabilities-35820a8a-ae13-1299-88cc-357f104f5b11
- KB4073757: Protect Windows devices against silicon-based microarchitectural and speculative execution side-channel vulnerabilities - Microsoft Support
  https://support.microsoft.com/en-us/topic/kb4073757-protect-windows-devices-against-silicon-based-microarchitectural-and-speculative-execution-side-channel-vulnerabilities-a0b9f66c-f426-d854-fdbb-0e6beaeeee87
- Arm CPU Security Bulletin: Spectre/Meltdown - Arm Developer
  https://developer.arm.com/documentation/110280/latest/
- Which intel CPUs are affected by spectre/meltdown? - Super User
  https://superuser.com/questions/1282968/which-intel-cpus-are-affected-by-spectre-meltdown
- Meltdown Attack — Latest News, Reports & Analysis | The Hacker News
  https://thehackernews.com/search/label/Meltdown%20Attack
- How do I know whether my computer's processor is vulnerable to Meltdown and Spectre?
  https://askubuntu.com/questions/995159/how-do-i-know-whether-my-computers-processor-is-vulnerable-to-meltdown-and-spec
- Researchers Disclose Meltdown-like Vulnerability for AMD Processors (Updated)
  https://www.tomshardware.com/news/zen2-processor-vulnerability-mitigation
- Kernel page-table isolation - Wikipedia
  https://en.wikipedia.org/wiki/Kernel_page-table_isolation
- Is a Microcode Update Required to Protect a System 10th Gen Intel®
  https://www.intel.com/content/www/us/en/support/articles/000057670/processors/intel-core-processors.html
- Question about Spectre/Meltdown patches in early Core processors - VOGONS
  https://www.vogons.org/viewtopic.php?t=106371
- Controlling the Performance Impact of Microcode and Security Patches for CVE-2017-5754 CVE-2017-5715 and CVE-2017-5753 using Red Hat Enterprise Linux Tunables - Red Hat Customer Portal
  https://access.redhat.com/articles/3311301
- Meltdown and Spectre security vulnerabilities - UPenn ISC | - University of Pennsylvania
  https://www2.isc.upenn.edu/security/meltdown-spectre
- Performance impact of KPTI Meltdown Linux kernel fixes
  https://unix.stackexchange.com/questions/417384/performance-impact-of-kpti-meltdown-linux-kernel-fixes
- First Fully Weaponized Spectre Exploit Discovered Online
  https://therecord.media/first-fully-weaponized-spectre-exploit-discovered-online
- Important Information for Trend Micro Solutions and Microsoft January 2018 Security Updates (Meltdown and Spectre)
  https://success.trendmicro.com/en-US/solution/KA-00081579
