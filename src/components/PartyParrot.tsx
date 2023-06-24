import Image from "next/image";

interface PartyParrotProps {
    className?: string;
}

const defaultProps: PartyParrotProps = { className: "inline" };

export default function PartyParrot(props: PartyParrotProps) {
    props = { ...defaultProps, ...props };
    return <Image src="/emoji/partyparrot.gif" alt="PartyParrot" width={30} height={30} className={props.className} />;
}
