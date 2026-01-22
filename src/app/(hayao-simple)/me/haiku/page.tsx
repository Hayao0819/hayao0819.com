import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";

export default async function Haiku() {
    return (
        <CommonSpacer>
            <Heading level={2}>俳句や短歌</Heading>
            <p>趣味でたまに詠むんですが恥ずかしいので言及しないでください。</p>
            <p>ページの共有もしないでいただけると助かります。</p>

            <Heading level={3}>俳句</Heading>
            <ul className="list-disc">
                <li>
                    <p>ひいばあちゃん あじさい見てきて 104歳</p>
                    <p>小学生の高学年の頃に詠んだ</p>
                </li>
                <li>
                    <p>備えなし 己を罰す 走り梅雨</p>
                    <p>傘忘れてくそほど濡れた</p>
                </li>
            </ul>
        </CommonSpacer>
    );
}
