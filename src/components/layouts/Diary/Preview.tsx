import Link from "next/link";

import Btn from "@/components/elements/Btn";
import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

export default function DiaryPreview({ diaryPreview }: { diaryPreview: DiaryPreviewType }) {
    return (
        <div className="neumo-sink m-6 grow p-8">
            <Link href={`/diary/posts/${diaryPreview.slug}`}>
                <h2 className="text-2xl font-bold">{diaryPreview.title}</h2>
                <p>{diaryPreview.description}</p>
                <div className="text-right">
                    <Btn>Read more...</Btn>
                </div>
            </Link>
        </div>
    );
}
