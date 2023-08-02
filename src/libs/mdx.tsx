import { H2, H3 } from "@/components/elements/Headlines";
import { ImageWithoutNextImg } from "@/components/elements/Image";
//import { BlogTitle, H2 } from "@/components/elements/Headlines/H2";
import Link from "@/components/elements/Link";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function MarkdownElements() {
    return {
        
        h2: (props: any) => {
            return <H2 {...props} />;
        },
        
        h3: (props: any) => {
            return <H3 {...props} />;
        },
        
        a: (props: any) => {
            return (
                <Link href={props.href} newtab={true}>
                    {props.children}
                </Link>
            );
        },
        
        ul: (props: any) => {
            return <ul className="list-disc" {...props} />;
        },
        
        table: (props: any) => {
            return (
                <div className="overflow-x-scroll">
                    <table className="daisy-table daisy-table-sm whitespace-nowrap  md:daisy-table-md" {...props} />
                </div>
            );
        },

        img: (props:any) =>{
            return (
                <ImageWithoutNextImg {...props} />
            )
        }
    };
}
