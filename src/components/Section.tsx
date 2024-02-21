import React from "react";

interface SectionProps {
    className?: string;
    children?: React.ReactNode;
}

export default function Section({className, children}: SectionProps) {
    return (
        <div className={`w-full h-max px-8 py-8 ${className}`}>
            {children}
        </div>
    )
}