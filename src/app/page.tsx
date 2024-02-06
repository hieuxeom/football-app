"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import Section from "@/components/Section";
import {Card, CardHeader, Avatar, CardBody, CardFooter, Button} from "@nextui-org/react";

export default function Home() {
    const handleSignOut = async () => {
        localStorage.removeItem("userData")
        localStorage.removeItem("jwtToken")
        return signOut({callbackUrl: "/auth"});
    };

    return (
        (
            <Section className="w-full flex justify-center items-center">
                <Card className="max-w-[340px]">
                    <CardFooter>
                        <Button onClick={handleSignOut} size="sm" color="danger">
                            Sign out
                        </Button>
                    </CardFooter>
                </Card>
            </Section>
        )
    );
}
