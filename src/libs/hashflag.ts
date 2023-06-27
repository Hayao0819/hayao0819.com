export function getHashFlag(url: string){
    return url.split("#")[1]
}

export function removeHashFlag(url: string){
    return url.split("#")[0]
}
