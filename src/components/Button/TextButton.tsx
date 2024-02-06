"use client"

import {Button, extendVariants} from "@nextui-org/react";

export const TextButton = extendVariants(Button, {
    variants: {
        variant: {
            "no-outline": "bg-transparent p-0 m-0 min-w-0 h-max justify-start",
        },
        color: {
            "primary": "hover:text-primary",
            "secondary": "hover:text-secondary",
            "success": "hover:text-success",
            "warning": "hover:text-warning",
            "danger": "hover:text-danger"
        }
    },
    defaultVariants: {
        variant: "no-outline"
    }
} )