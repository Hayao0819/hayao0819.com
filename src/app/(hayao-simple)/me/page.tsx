import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/elements/Heading";

const Separator = () => <hr className="my-3 border-t-[1px] border-[#9a9a9a]" />;

export default function Me() {
    return (
        <div className="mx-auto w-fit">
            <div className="text-center child:mx-auto">
                <Heading level={1} className="my-12 block text-3xl font-bold">
                    山田ハヤオのホームページ
                </Heading>
                <div className="flex">
                    <div className=" flex-[1]">
                        <Image alt="アイコン" src="/icons/newicon.jpeg" width={350} height={200} />
                    </div>
                    <div className="mx-2 flex-[2]">
                        <span>★★★ 最新情報 ★★★</span>
                        <Separator />
                        <p className="text-left font-bold">・ブログ</p>
                        <Separator />
                        <p className="text-left font-bold">・Projects</p>
                        <Separator />
                        <div className=" text-balance text-left font-bold child:leading-tight">
                            <p>当サイトの内容、テキスト、画像等はMITライセンスの基で自由に再利用できます。</p>
                            <p>お問い合わせはメールまたはTwitterでご連絡をお願い致します。</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>山田 ハヤオ (やまだ はやお)</p>
                <p>生年月日 2004年8月19日</p>
                <p>血液型 O型</p>
                <Link className="text-blue-400 underline" href="/">
                    プロフィール
                </Link>
            </div>
        </div>
    );
}
