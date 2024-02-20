"use client"

import React, {useState} from "react";
import Logo from "@/components/Logo";
import LoginAvatar from "@/components/LoginAvatar";
import {TextButton} from "@/components/Button/TextButton";
import {signOut} from "next-auth/react";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import {Button, Divider} from "@nextui-org/react";
import clsx from "clsx";
import {IoAdd, IoCalendar, IoHome, IoNewspaper, IoNotifications, IoPeople} from "react-icons/io5";
import {TbSoccerField} from "react-icons/tb";
import {FaBox} from "react-icons/fa6";

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

    return <div className={clsx(`relative py-8 px-4 h-screen shadow-custom-1 z-50   ${className}`, {
        "w-0": isHideSidebar
    })}>
        <div className={isHideSidebar ? "w-0 overflow-hidden" : "flex flex-col h-full justify-between items-center gap-4"}>
            <div className="flex flex-col gap-10 w-full px-2">
                <div className="">
                    <Logo/>
                </div>
                <div className="flex justify-center">
                    <Button
                        color="secondary"
                        startContent={<IoAdd size="24px"/>}>Create new team
                    </Button>
                </div>

                <div className="flex flex-col gap-2 ">
                    <Button className="justify-start" color="primary" variant="flat" startContent={<IoHome size="20px"/>}>Dashboard</Button>
                    <Button className="justify-start" variant="light" startContent={<IoPeople size="20px"/>}>Teams</Button>
                    <Button className="justify-start" variant="light" startContent={<TbSoccerField size="20px"/>}>Matchs</Button>
                    <Button className="justify-start" variant="light" startContent={<IoCalendar size="20px"/>}>Training schedules</Button>
                    <Divider/>
                    <Button className="justify-start" variant="light" startContent={<FaBox size="20px"/>}>Offers</Button>
                    <Button className="justify-start" variant="light" startContent={<IoNewspaper size="20px"/>}>Billings</Button>
                    <Button className="justify-start" variant="light" startContent={<IoNotifications size="20px"/>}>Notifications</Button>
                </div>
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
