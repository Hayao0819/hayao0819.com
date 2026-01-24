"use client";

import { memo } from "react";

import { Link } from "@/components/elements/Link";

const Page = () => (
    <>
        <title>ニコニコRe:仮 非公式検索</title>
        <meta name="description" content="ニコニコ動画の非公式検索サイトです。" />
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-2xl font-bold [writing-mode:vertical-lr]">ニコニコ検索</h1>
                <div className="flex flex-col items-center justify-center p-6">
                    <p>APIの提供が終了したため公開を停止しました。</p>
                    <p className="mt-2">
                        今後は公式様の
                        <Link href="https://nicorekari.nanasi-rasi.net/" className="underline">
                            nicorekari.nanasi-rasi.net
                        </Link>
                        を御覧ください。
                    </p>
                </div>
            </div>
        </div>
    </>
);

export default memo(Page);

// const Header = () => (
//     <>
//         <title>ニコニコRe:仮 非公式検索</title>
//         <meta name="description" content="ニコニコ動画の非公式検索サイトです。" />
//         <div>
//             <p>
//                 動画リストは<Link href="https://x.com/nanasi_rasi">ななしぃ様</Link>
//                 が作成したものを許可のもの使用しています。ニコニコ動画様のサーバ負荷を考慮して、サムネイルは非表示になっています。
//             </p>
//             <p>スペース区切りでAnd検索を行うことが可能です。</p>
//             <p>
//                 このサイトはニコニコ動画及び株式会社ドワンゴ様の公式<b>ではございません。</b>
//                 ソースコードは
//                 <Link href="https://github.com/Hayao0819/hayao0819.com/blob/master/src/app/(hayao)/playground/niconico/page.tsx">
//                     こちら
//                 </Link>
//                 で公開されています。
//             </p>
//         </div>
//     </>
// );

// export function Niconico() {
//     const [search, setSearch] = useSearch();
//     const [musicOnly, setMusicOnly] = useState<boolean>(false);

//     const info = useVideoList();

//     const header = useMemo(() => <Header />, []);

//     return (
//         <CommonSpacer>
//             <Suspense fallback={<>Loading...</>}>
//                 <div>
//                     {header}
//                     <Form className="my-10">
//                         <Input value={search.join(" ")} onChange={(e) => setSearch(e.target.value)} className="w-full" />
//                         <Form.Label title="音楽のみ" className="mx-auto w-fit child:mx-2">
//                             <Checkbox checked={musicOnly} onChange={(e) => setMusicOnly(e.target.checked)} />
//                         </Form.Label>
//                     </Form>
//                 </div>

//                 <ul className="grid grid-cols-2 gap-3">
//                     {info &&
//                         Array.from(info?.values())

//                             .filter((v) => search.every((s) => v.title.includes(s)))
//                             .filter((v) => !musicOnly || v.cT === "music")
//                             .map((v) => {
//                                 return (
//                                     <li key={v.id} className="">
//                                         <a
//                                             href={`https://www.nicovideo.jp/watch_tmp/${v.id}`}
//                                             target="_blank"
//                                             rel="noreferrer"
//                                             className="flex cursor-pointer"
//                                         >
//                                             <span className=" flex items-center p-3 align-middle">{v.title}</span>
//                                         </a>
//                                     </li>
//                                 );
//                             })}
//                 </ul>
//             </Suspense>
//         </CommonSpacer>
//     );
// }
