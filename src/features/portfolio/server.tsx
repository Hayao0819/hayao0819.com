import { SiGin, SiNestjs } from "react-icons/si";

import Card from "./Card";

export const NestJS = () => (
    <Card>
        <Card.Title>
            <SiNestjs />
            <span>React.js</span>
        </Card.Title>
        <Card.Codes>
            <Card.CodeItem>SpotWORK</Card.CodeItem>
        </Card.Codes>
        <Card.Description>TypeScriptでサーバーサイドを書く利点ってあるんでしょうか</Card.Description>
    </Card>
);

export const GoAndGin = () => (
    <Card>
        <Card.Title>
            <SiGin />
            <span>Go & Gin</span>
        </Card.Title>
        <Card.Codes></Card.Codes>
        <Card.Description>お手軽に使えるので好きです。</Card.Description>
    </Card>
);
