import { SiGin, SiHono, SiNestjs } from "react-icons/si";

import Card from "./Card";

export const NestJS = () => (
    <Card>
        <Card.Title>
            <Card.Icon>
                <SiNestjs />
            </Card.Icon>
            <span>React.js</span>
        </Card.Title>
        <Card.Codes>
            <Card.CodeItem>SpotWORK</Card.CodeItem>
        </Card.Codes>
        <Card.Description>TypeScriptで書くときに使います</Card.Description>
    </Card>
);

export const GoAndGin = () => (
    <Card>
        <Card.Title>
            <Card.Icon>
                <SiGin />
            </Card.Icon>
            <span>Go & Gin</span>
        </Card.Title>
        <Card.Codes></Card.Codes>
        <Card.Description>お手軽に使えるので好きです</Card.Description>
    </Card>
);

export const Hono = () => (
    <Card>
        <Card.Title>
            <Card.Icon>
                <SiHono />
            </Card.Icon>
            <span>Hono</span>
        </Card.Title>
        <Card.Description>各ランタイムのラッパーという感じで好きです</Card.Description>
    </Card>
);
