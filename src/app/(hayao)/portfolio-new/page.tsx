"use client";

import { Heading } from "@/components/elements/Heading";
import CommonSpacer from "@/components/layouts/CommonSpacer";
import Card from "@/features/portfolio/Card";
import { GoAndGin, NestJS } from "@/features/portfolio/server";
import { MaterialUI, NextJS, ReactJS, TailwindCSS, VueJS } from "@/features/portfolio/web";

const Portfolio = () => (
    <CommonSpacer>
        <div className="text-center">
            <Heading level={2} className="inline-block border-b border-accent text-3xl text-accent">
                PORTFOLIO
            </Heading>
        </div>

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
        </Card.Container>

        <Card.Container title="GUI"></Card.Container>

        <Card.Container title="CLI"></Card.Container>

        <Card.Container title="Network"></Card.Container>

        <Card.Container title="OS"></Card.Container>
    </CommonSpacer>
);

export default Portfolio;
