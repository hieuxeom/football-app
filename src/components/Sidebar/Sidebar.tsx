"use client"

import React, {useState} from "react";
import Logo from "@/components/Logo";
import LoginAvatar from "@/components/LoginAvatar";
import {TextButton} from "@/components/Button/TextButton";
import {signOut} from "next-auth/react";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import {Button} from "@nextui-org/react";
import clsx from "clsx";

export default function Sidebar({className}: { className: string }) {
    const [isHideSidebar, setIsHideSidebar] = useState<boolean>(false);
    const handleSignOut = async () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        return signOut();
    };

    const handleHideSidebar = () => {
        setIsHideSidebar(!isHideSidebar);
    }

    return <div className={clsx(`transition-all ease-in-out duration-500 relative py-8 px-4 h-screen shadow-custom-1 z-50 ${className}`, {
        "w-0": isHideSidebar
    })}>
        <div className={isHideSidebar ? "hidden" : "flex flex-col items-center gap-4"}>
        <div>
            <Logo/>
        </div>
        <div className="flex justify-center items-center w-full">
            <LoginAvatar/>
        </div>
        </div>
        <div className="absolute right-0 top-1/2 origin-center translate-y-1/2 translate-x-1/2  bg-transparent">
            <Button startContent={<BsChevronCompactRight size="20px"/>}
                    isIconOnly
                    onClick={handleHideSidebar}
            ></Button>
        </div>

    </div>;
}
