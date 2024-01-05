import { GA_ID } from "@/const/meta";

export const pageview = (path: string) => {
    window.gtag("config", GA_ID, {
        page_path: path,
    });
};
