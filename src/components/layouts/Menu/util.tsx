import { useRouter } from "next/router";

import { removeHashFlag } from "@/libs/hashflag";

export function useCurrentURL(url: string[]): boolean {
    const router = useRouter();

    //return removeHashFlag(router.asPath) == url;
    //console.log(url);
    const currentURL=removeHashFlag(router.asPath)
    for (const u of url) {
        if ( currentURL == u || (currentURL.startsWith(u) && u != "/")) {
            return true;
        }
    }
    return false;
}
