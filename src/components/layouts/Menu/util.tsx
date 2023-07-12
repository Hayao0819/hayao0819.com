import { useRouter } from "next/router";

import { removeHashFlag } from "@/libs/hashflag";

export function useCurrentURL(url: string[]): boolean {
    const router = useRouter();

    //return removeHashFlag(router.asPath) == url;
    //console.log(url);
    for (const u of url){
        if(removeHashFlag(router.asPath) == u){
            return true
        }
    }
    return false

}
