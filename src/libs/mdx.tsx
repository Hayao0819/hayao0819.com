import { H2, H3 } from "@/components/elements/Headlines";
//import { BlogTitle, H2 } from "@/components/elements/Headlines/H2";
import Link from "@/components/elements/Link";

export default function MarkdownElements(){
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        h2: (props: any) => {
            return <H2 {...props} />;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        h3: (props: any) => {
            return <H3 {...props} />;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        a: (props: any) => {
            return <Link href={props.href}>{props.children}</Link>;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ul: (props: any) => {
            return <ul className="list-disc" {...props} />;
        },
    };
}
