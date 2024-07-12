import { PropsWithChildren } from "react";

import { Heading } from "@/components/elements/Heading";

const Container = ({ children, title }: PropsWithChildren<{ title: string }>) => (
    <div className="my-4">
        <Heading level={3} className="my-8 inline-block border-l-2 border-accent p-2 font-bold text-accent">
            {title}
        </Heading>
        {children ? <div className="flex flex-wrap justify-around gap-2">{children}</div> : <div>現在工事中</div>}
    </div>
);

const Card = ({ children }: PropsWithChildren) => (
    <div className=" flex w-1/6 flex-col  rounded-xl border border-base-200 p-4">{children}</div>
);

const Title = ({ children }: PropsWithChildren) => (
    <div className="flex items-center justify-center text-xl font-bold">{children}</div>
);

const Codes = ({ children }: PropsWithChildren) => (
    <div className="my-2">
        <ul className="mx-auto flex w-fit gap-2">{children}</ul>
    </div>
);

const Description = ({ children }: PropsWithChildren) => <p className=" text-center text-sm">{children}</p>;

const CodeItem = ({ children }: { children: string }) => <li>{children}</li>;

export default Object.assign(Card, { Container, Title, Codes, Description, CodeItem });
