"use client"

import React from "react";
import Logo from "@/components/Logo";
import LoginAvatar from "@/components/LoginAvatar";
import {TextButton} from "@/components/Button/TextButton";
import {signOut} from "next-auth/react";

export default function Sidebar({className}: { className: string }) {

    const handleSignOut = async () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        return signOut();
    };

    return <div className={`py-8 px-4 h-screen shadow-custom-1 z-50 flex flex-col items-center gap-4 ${className}`}>
        <div>
            <Logo/>
        </div>
        <div className="flex justify-center items-center w-full">
            <LoginAvatar/>
        </div>

    </div>;
}
