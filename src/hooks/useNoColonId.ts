import { useId } from "react";

const useNoColonId = () => {
    const id = useId();
    // 先頭と末尾のコロンを削除
    return id.slice(1, -1);
};

export default useNoColonId;
