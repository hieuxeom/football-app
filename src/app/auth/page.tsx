"use client";

import React from "react";
import Section from "@/components/Section";
import {Button, Input} from "@nextui-org/react";

import {signIn} from "next-auth/react";
import {FaGithub, FaGoogle} from "react-icons/fa6";
import {FcGoogle} from "react-icons/fc";

export default function LoginPage() {
    const handleLoginWithGithub = async () => {
        localStorage.setItem("authProvider", "github")
        return signIn("github", {
            callbackUrl: "http://localhost:3000/",
        });
    };

    const handleLoginWithGoogle = async () => {
        localStorage.setItem("authProvider", "google")
        return signIn("google", {
            callbackUrl: "http://localhost:3000/",
        });
    };

    return (
        <Section className="flex justify-center items-center">
            <div className="flex gap-4">
                <Button startContent={<FaGithub/>} onClick={handleLoginWithGithub}>
                    Login with Github
                </Button>
                <Button startContent={<FcGoogle/>} onClick={handleLoginWithGoogle}>
                    Login with Google
                </Button>
            </div>
        </Section>
    );
}
