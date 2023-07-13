import Link from "next/link";

import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

export default function DiaryPreview({ diaryPreview }: { diaryPreview: DiaryPreviewType }) {
    return (
        <div className="neumo-sink m-6 grow p-8">
            <Link href={`/diary/${diaryPreview.slug}`}>
                <h2 className="text-2xl font-bold">{diaryPreview.title}</h2>
                <p>{diaryPreview.description}</p>
                <div className="text-right">
                    <button className="neumo-float daisy-btn bg-transparent hover:bg-transparent">Read more...</button>
                </div>
            </Link>
        </div>
    );
}
