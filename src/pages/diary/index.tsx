import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DiaryTop() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/diary/posts");
    });
}
