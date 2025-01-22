"use client";

import PageTitle from "@/components/elements/PageTitle";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import Card from "@/features/portfolio/Card";
import { ArchLinux, NixOS } from "@/features/portfolio/os";
import { GoAndGin, Hono, NestJS } from "@/features/portfolio/server";
import { MaterialUI, NextJS, ReactJS, TailwindCSS, VueJS } from "@/features/portfolio/web";

const Portfolio = () => (
    <CommonSpacer>
        <PageTitle>SKILL</PageTitle>

        <Card.Container title="Web">
            <NextJS />
            <ReactJS />
            <VueJS />
            <TailwindCSS />
            <MaterialUI />
        </Card.Container>

        <Card.Container title="Server">
            <GoAndGin />
            <NestJS />
            <Hono />
        </Card.Container>

        {/* <Card.Container title="GUI"></Card.Container>

        <Card.Container title="CLI"></Card.Container>

        <Card.Container title="Network"></Card.Container> */}

        <Card.Container title="OS">
            <ArchLinux />
            <NixOS />
        </Card.Container>
    </CommonSpacer>
);

export default Portfolio;
