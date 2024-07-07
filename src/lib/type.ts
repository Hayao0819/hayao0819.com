import { ComponentPropsWithoutRef, ElementType } from "react";

export type WithoutClassName<T> = Omit<T, "className">;
export type ComponentPropsWithoutRefAndClassName<T extends ElementType> = WithoutClassName<ComponentPropsWithoutRef<T>>;
