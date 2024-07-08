"use client";

import classNames from "clsx";
import { useRef, useState } from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

import { Link } from "@/components/elements/Link";

type LinkStatus = {
    status: "default" | WebSites;
};

type WebSites = "twitter" | "instagram" | "github";

export default function Links() {
    const [currentStatus, setCurrentStatus] = useState<LinkStatus>({ status: "default" });

    const refs = {
        twitter: useRef<HTMLAnchorElement>(null),
        instagram: useRef<HTMLAnchorElement>(null),
        github: useRef<HTMLAnchorElement>(null),
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const commonHandler = (site: WebSites) => {
        return {
            onMouseEnter: () => {
                //setCurrentStatus({ status: site });
            },
            onMouseLeave: () => {
                setCurrentStatus({ status: "default" });
            },
        };
    };

    const commonClassName = (site: WebSites) => {
        const isMyDetail = currentStatus.status === site;
        const isDefault = currentStatus.status === "default";
        const isNotMyDetail = !isMyDetail && !isDefault;

        return {
            className: classNames("items-center", {
                hidden: isNotMyDetail,
                flex: isMyDetail,
            }),
        };
    };

    const commonProps = (site: WebSites) => {
        return { ...commonHandler(site), ...commonClassName(site), ref: refs[site] };
    };

    const detailProps = (site: WebSites) => {
        return {
            className: classNames({
                hidden: currentStatus.status !== site,
            }),
        };
    };

    //console.log(currentStatus.status);

    return (
        <>
            <Link href="https://twitter.com/Hayao0819" {...commonProps("twitter")}>
                <FaTwitter className="text-twitter" />
                <div {...detailProps("twitter")}>
                    <p>@Hayao0819</p>
                    <p>@YamadaHayao</p>
                </div>
            </Link>
            <Link href="https://instagram.com/Hayao0819" {...commonProps("instagram")}>
                <FaInstagram className="text-instagram" />
                <div {...detailProps("instagram")}>
                    <p>@Hayao0819</p>
                </div>
            </Link>
            <Link href="https://github.com/Hayao0819" {...commonProps("github")}>
                <FaGithub className="text-github" />
                <div {...detailProps("github")}>
                    <p>@Hayao0819</p>
                </div>
            </Link>
        </>
    );
}
