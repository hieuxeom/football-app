"use client"

import React, {useContext, useEffect, useState} from "react";
import {AuthContext, IAuthProps} from "@/components/Providers/AuthenticationProviders";
import {Avatar, Button, Skeleton} from "@nextui-org/react";
import {Session} from "next-auth";
import {IoMdSettings} from "react-icons/io";
import Text from "@/components/Text/Text";
import {useRouter} from "next/navigation";
import {IPlayers} from "@/utils/interfaces/players/players";

export default function LoginAvatar() {
    const {authStatus, userData}: IAuthProps = useContext(AuthContext);
    useEffect(() => {
        console.log(authStatus)
    }, [])
    const router = useRouter();
    const handleDirect = () => {
        router.push("/auth")
    };

    return (
        authStatus === "loading" ? <Skeleton className="w-full h-8">
        </Skeleton> : authStatus === "authenticated" ?
            <div className="w-full flex justify-between">
                <div className="w-full flex gap-2 items-center justify-start">
                    <Avatar isBordered size="md" src={(userData as IPlayers).avatar || ""}/>
                    <Text variant="text" color="default">{(userData as IPlayers).fullName || ""}</Text>
                </div>
                <div>
                    <Button
                        variant="flat"
                        startContent={<IoMdSettings size="20px"/>}
                        isIconOnly/>
                </div>
            </div>
            : <div>
                <Button onClick={handleDirect}
                        color="primary"
                >Login</Button>
            </div>
    )
}