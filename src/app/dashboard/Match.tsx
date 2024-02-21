import React, {useState} from "react";
import {Avatar, Chip} from "@nextui-org/react";
import Text from "@/components/Text/Text";
import clsx from "clsx";

export type MatchType = "competition" | "practice"

interface MatchI {
    type: MatchType,
    children?: React.ReactNode
}

export default function Match({type, children}: MatchI) {

    return (
        <div className="w-full shadow-custom-1 flex justify-between items-center p-4 rounded-xl">
            <Avatar size="lg" name="T1"/>
            <div className="flex gap-8 justify-center items-center">
                <Text variant="h6" color="default">Team 1</Text>
                <div className="flex flex-col gap-1 items-center">
                    <div className="bg-danger text-center px-4 py-0.5 rounded-full w-max">
                        <Text variant="subheading2" color="white">13:00</Text>
                    </div>
                    {/*<div className={clsx("text-center px-4 py-0.5 rounded-full w-max", {*/}

                    {/*})}>*/}
                    {/*    */}
                    {/*</div>*/}
                    <div className={clsx("text-center px-4 py-0.5 rounded-full w-max", {
                        "bg-secondary": type === "practice",
                        "bg-warning": type === "competition",
                    })}>
                        {
                            type === "practice" ?
                                <Text variant="subheading2" color="white">Practice</Text> :

                                <Text variant="subheading2" color="white">Competition</Text>

                        }
                    </div>
                </div>
                <Text variant="h6" color="default">Team 2</Text>
            </div>
            <Avatar size="lg" name="T2"/>
        </div>
    )
}