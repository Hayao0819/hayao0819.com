export function checkCurrentURL(urlString: string): boolean {
    let url: URL;
    try {
        url = new URL(urlString);
    } catch (_) {
        return false;
    }
    return url.protocol == "http:" || url.protocol == "https:";
}

export function formatURL(urlString: string): string {
    if (urlString.startsWith("http")) {
        return urlString;
    }
    return "http://" + urlString;
}
