import { Metadata as NextMetadata } from "next";

import Metadata from "@/const/meta";

export const DEFAULT_META: NextMetadata = {
    metadataBase: new URL("https://www.hayao0819.com"),
    title: Metadata.title,
    description: Metadata.description,
};

export const genMetaData = (meta?: NextMetadata): NextMetadata => {
    return { ...DEFAULT_META, ...meta, title: meta?.title ? `${meta?.title} | ${DEFAULT_META.title}` : DEFAULT_META.title };
};
