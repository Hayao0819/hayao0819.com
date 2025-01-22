import { SiArchlinux, SiNixos } from "react-icons/si";

import Card from "./Card";

export const ArchLinux = () => (
    <Card>
        <Card.Title>
            <Card.Icon>
                <SiArchlinux />
            </Card.Icon>
            <span>ArchLinux</span>
        </Card.Title>
        <Card.Description>シンプルでエレガントな最高のOS</Card.Description>
    </Card>
);

export const NixOS = () => (
    <Card>
        <Card.Title>
            <Card.Icon>
                <SiNixos />
            </Card.Icon>

            <span>NixOS</span>
        </Card.Title>
        <Card.Description>ノートPCで使ってます しっかり勉強してサーバーもNixで管理したい</Card.Description>
    </Card>
);
