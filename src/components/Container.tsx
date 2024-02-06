import React from "react";

interface ContainerProps {
    className?: string;
    children?: React.ReactNode;
}

export default function Container({className, children}: ContainerProps) {
    return (
        <div className={`w-screen ${className}`}>
            {children}
        </div>
    )
}