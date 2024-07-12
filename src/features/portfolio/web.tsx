import { SiMui, SiNextdotjs, SiReact, SiTailwindcss, SiVuedotjs } from "react-icons/si";

import Card from "./Card";

const ReactJS = () => (
    <Card>
        <Card.Title>
            <SiReact />
            <span>React.js</span>
        </Card.Title>
        <Card.Codes>
            <Card.CodeItem>hayao0819.com</Card.CodeItem>
            <Card.CodeItem>Minskey</Card.CodeItem>
        </Card.Codes>
        <Card.Description>複雑化しすぎているように感じますが、JSXが好きなのでよく使います</Card.Description>
    </Card>
);

const NextJS = () => (
    <Card>
        <Card.Title>
            <SiNextdotjs />
            <span>Next.js</span>
        </Card.Title>
        <Card.Codes>
            <Card.CodeItem>hayao0819.com</Card.CodeItem>
            <Card.CodeItem>Minskey</Card.CodeItem>
        </Card.Codes>
        <Card.Description>ファイルベースルーティングが便利です</Card.Description>
    </Card>
);

const VueJS = () => (
    <Card>
        <Card.Title>
            <SiVuedotjs />
            <span>Vue.js</span>
        </Card.Title>
        <Card.Codes>
            <Card.CodeItem>SpotWORK</Card.CodeItem>
        </Card.Codes>
        <Card.Description>Options APIしか触ったことないです</Card.Description>
    </Card>
);

const TailwindCSS = () => (
    <Card>
        <Card.Title>
            <SiTailwindcss />
            <span>TailwindCSS</span>
        </Card.Title>
        <Card.Codes>
            <Card.CodeItem>hayao0819.com</Card.CodeItem>
        </Card.Codes>
        <Card.Description>CSSフレームワークはほぼこれしか触ったことないです</Card.Description>
    </Card>
);

const MaterialUI = () => (
    <Card>
        <Card.Title>
            <SiMui />
            <span>Material UI (MUI)</span>
        </Card.Title>
        <Card.Codes></Card.Codes>
        <Card.Description>かっこいいUIを書けるので好きですが、記述量が多くて癖がある気がします</Card.Description>
    </Card>
);

export { MaterialUI, NextJS, ReactJS, TailwindCSS, VueJS };
