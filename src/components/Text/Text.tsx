import React from "react";
import clsx from "clsx";

type TypoVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subheading1" | "subheading2" | "body" | "text"
type TypoColors = "primary" | "secondary" | "default" | "success" | "warning" | "danger" | "white"

interface ITypoProps {
    variant: TypoVariants,
    color: TypoColors,
    children: React.ReactNode,
}

const variantsMapping: Record<TypoVariants, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subheading1: "h6",
    subheading2: "h6",
    body: "p",
    text: "p"
};

const styleMapping: Record<TypoVariants, string> = {
    h1: "text-8xl font-medium",
    h2: "text-6xl font-medium",
    h3: "text-5xl font-medium",
    h4: "text-4xl font-medium",
    h5: "text-2xl font-medium",
    h6: "text-xl font-medium",
    subheading1: "text-base font-medium",
    subheading2: "text-sm",
    body: "text-base",
    text: "text-base",
}

const colorMapping: Record<TypoColors, string> = {
    danger: "text-danger",
    default: "",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    warning: "text-warning",
    white: "text-white"

}
export default function Text({
                                 variant = "text", color = "default", children, ...props
                             }: ITypoProps & React.HTMLProps<HTMLElement>) {

    const ComponentTag = variantsMapping[variant]

    return (
        <ComponentTag  {...props} className={clsx(styleMapping[variant], colorMapping[color])}>
            {children}
        </ComponentTag>
    )
}