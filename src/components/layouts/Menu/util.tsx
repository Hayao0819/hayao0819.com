import { useRouter } from "next/router";

import { removeHashFlag } from "@/libs/hashflag";

export function useCurrentURL(url: string[]): boolean {
    const router = useRouter();

    const currentURL = removeHashFlag(router.asPath);
    for (const u of url) {
        if (u == "") continue
        if (currentURL == u || (currentURL.startsWith(u) && u != "/")) {
            return true;
        }
    }
    return false;
}
