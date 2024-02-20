"use client";
// import {signIn, signOut} from "next-auth/react";
import DashboardPage from "@/app/dashboard/page";

export default function Home() {
    // const handleSignOut = async () => {
    //     localStorage.removeItem("userData")
    //     localStorage.removeItem("jwtToken")
    //     return signOut({callbackUrl: "/auth"});
    // };

    return (
        <DashboardPage/>
    );
}
