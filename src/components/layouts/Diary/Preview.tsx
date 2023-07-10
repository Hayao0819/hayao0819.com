import Link from "next/link";

import { DiaryPreview as DiaryPreviewType } from "@/types/diaries";

export default function DiaryPreview({ diaryPreview }: { diaryPreview: DiaryPreviewType }) {
    return (
        <div>
            <Link className="p-6" href={`/diary/${diaryPreview.slug}`}>
                <h2 className="text-2xl font-bold">{diaryPreview.title}</h2>
                <p>{diaryPreview.description}</p>
            </Link>
        </div>
    );
}
