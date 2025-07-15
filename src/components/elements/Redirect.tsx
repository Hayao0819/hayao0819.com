"use client";

import { PropsWithChildren, useEffect } from "react";

const useRedirect = (ms: number, url: string) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = url;
        }, ms);
        return () => clearTimeout(timer);
    }, [ms, url]);
};

export default function RedirectPage(props: PropsWithChildren<{ ms: number; url: string }>) {
    const { ms, url, children } = props;
    useRedirect(ms, url);
    return (
        <div className="flex h-screen items-center justify-center text-center">
            <div>
                <h1 className="text-2xl font-bold">Redirecting...</h1>
                <p className="mt-4">You will be redirected in {ms / 1000} seconds.</p>
                {children}
            </div>
        </div>
    );
}
